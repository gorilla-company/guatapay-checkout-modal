import { io } from 'socket.io-client'
import summary from '../steps/summary'
import expired from '../steps/expired'
import scanning from '../steps/scanning'
import quotation from '../steps/quotation'
import processing from '../steps/processing'
import loadingService from './loading.service'
import paymentError from '../steps/payment-error'
import buildHtmlService from './build-html.service'
import stepIndicatorService from '../steps/stepIndicator'
import serverRequestsService from './server-requests.service'

// Window variables
window.total = 0
window.paymentId = ''
window.merchantId = ''
window.status = 'START'
window.currency = 'COP'
window.lastQuotation = {}
window.onPayment = () => {}
window.closeModal = () => {}
window.onQuotation = () => {}
window.quotationCurrency = 'BTC'
window.quotationTotal = 0.00420001
window.walletAddress = '1JwSSubhmg6iPtRjtyqhUYYH7bZg3Lfy1T'

let initialized = false
let modalProperties, socket, guatapayMarketQuote, guatapayPaymentIntention

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
  if (socket && window.merchantId && window.paymentId) {
    socket.emit('disconnected', { merchantId: window.merchantId, paymentId: window.paymentId })
  }

  removeModal()
  window.sessionStorage.removeItem('guatapayPaymentData')
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

function showModal(guatapayPaymentData) {
  /* window.onQuotation = modalObject.onQuotation
  window.onPayment = modalObject.onPayment */
  window.total = guatapayPaymentData.total
  window.currency = guatapayPaymentData.currency
  window.closeModal = closeModal

  if (!getInitializedStatus()) {
    setStatus('START')
    initService(guatapayPaymentData)
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
      buildHtmlService.handleStatusChange()
      guatapayMarketQuote = await serverRequestsService.generateQuotation(true)
      await quotation.refreshView(guatapayMarketQuote)
      showHeaderAndStepIndicator()
      break
    case 'SCANNING':
      buildHtmlService.handleStatusChange()
      socket = io('http://localhost:81')
      guatapayPaymentIntention = await serverRequestsService.generatePaymentIntention(true)

      if (guatapayPaymentIntention.error) {
        buildHtmlService.handleStatusChange()
        window.setModalStatus('PAYMENT_ERROR')
        return
      }

      await scanning.refreshView(guatapayPaymentIntention, socket)
      showHeaderAndStepIndicator()
      break
    case 'EXPIRED':
      expired.refreshView(guatapayPaymentIntention, socket)
      showHeaderAndStepIndicator()
      break
    case 'PAYMENT_ERROR':
      paymentError.refreshView()
      showHeaderAndStepIndicator()
      break
    case 'VALIDATING':
      showHeaderHideStepIndicator()
      break
    case 'SUCCESS':
      showHeaderHideStepIndicator()
      break
    case 'PROCESSING':
      // await processing.refreshView()
      showHeaderHideStepIndicator()
      break
    case 'INSERT_TXID':
      showHeaderHideStepIndicator()
      break
    case 'SUMMARY':
      summary.refreshView()
      showHeaderHideStepIndicator()
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
