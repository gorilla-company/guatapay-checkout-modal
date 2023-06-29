import summary from '../steps/summary'
import expired from '../steps/expired'
import scanning from '../steps/scanning'
import quotation from '../steps/quotation'
import processing from '../steps/processing'
import loadingService from './loading.service'
import buildHtmlService from './build-html.service'
import stepIndicatorService from '../steps/stepIndicator'

// Window variables
window.status = 'START'
window.currency = 'COP'
window.total = 0
window.walletAddress = '1JwSSubhmg6iPtRjtyqhUYYH7bZg3Lfy1T'
window.paymentId = ''
window.quotationTotal = 0.00420001
window.quotationCurrency = 'BTC'
window.lastQuotation = {}
window.onQuotation = () => {}
window.onPayment = () => {}
window.closeModal = () => {}

let initialized = false
let modalProperties

function getStatus() {
  return window.status
}

function setStatus(status) {
  window.status = status
}

function setInitializedStatus(status) {
  initialized = status
}

function getInitializedStatus() {
  return initialized
}

function setWalletAddress(walletAddress) {
  window.walletAddress = walletAddress
}

function setQuotationTotal(quotationTotal) {
  window.quotationTotal = quotationTotal
}

function setQuotationCurrency(quotationCurrency) {
  window.quotationCurrency = quotationCurrency
}

function removeModal() {
  const overlay = document.getElementById('guatapay-overlay')
  const modal = document.getElementById('modal-container')
  if (modal) document.body.removeChild(modal)
  if (overlay) document.body.removeChild(overlay)

  initialized = false
}

function closeModal() {
  removeModal()
  if (modalProperties.onClose) {
    modalProperties.onClose()
  }
}

function cancelModal() {
  removeModal()
  if (modalProperties.onCancel) {
    modalProperties.onCancel()
  }
}

function finalize() {
  if (modalProperties.callbackURL) {
    window.location.href = modalProperties.callbackURL
  } else {
    removeModal()
  }
}

function initService(props) {
  modalProperties = props
}

function showModal(modalObject) {
  window.onQuotation = modalObject.onQuotation
  window.onPayment = modalObject.onPayment
  window.total = modalObject.total
  window.currency = modalObject.currency
  window.closeModal = closeModal

  if (!getInitializedStatus()) {
    setStatus('START')
    initService(modalObject)
    buildHtmlService.buildHtml(closeModal, cancelModal, finalize)
    loadingService.initLoading()

    setInitializedStatus(true)
  }
}

function showHeaderAndStepIndicator() {
  const header = document.getElementById('header')
  const stepIndicator = document.getElementById('step-indicator')

  header.classList.remove('hide')
  stepIndicator.classList.remove('hide')
}

function showHeaderHideStepIndicator() {
  const header = document.getElementById('header')
  const stepIndicator = document.getElementById('step-indicator')

  header.classList.remove('hide')
  stepIndicator.classList.add('hide')
}

function hideHeaderAndStepIndicator() {
  const header = document.getElementById('header')
  const stepIndicator = document.getElementById('step-indicator')

  header.classList.add('hide')
  stepIndicator.classList.add('hide')
}

window.setModalStatus = async (status) => {
  if (status === getStatus()) return
  setStatus(status)
  stepIndicatorService.setStepIndicator(status)

  switch (status) {
    case 'START':
    case 'TERMS':
      hideHeaderAndStepIndicator()
      break
    case 'QUOTATION':
      await quotation.refreshView()
      showHeaderAndStepIndicator()

      break
    case 'EXPIRED':
      showHeaderAndStepIndicator()
      expired.refreshView()
      break
    case 'SCANNING':
      await scanning.refreshView()
      showHeaderAndStepIndicator()
      break
    case 'VALIDATING':
      showHeaderHideStepIndicator()
      break
    case 'PROCESSING':
      await processing.refreshView()
      showHeaderHideStepIndicator()
      break
    case 'SUMMARY':
      showHeaderHideStepIndicator()
      summary.refreshView()
      break
    default:
      break
  }
  window.mockStatus = status
  buildHtmlService.handleStatusChange(status)
}

export default {
  finalize,
  showModal,
  getStatus,
  setStatus,
  closeModal,
  initService,
  removeModal,
  cancelModal,
  setWalletAddress,
  setQuotationTotal,
  setInitializedStatus,
  getInitializedStatus,
  setQuotationCurrency
}
