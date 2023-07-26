import start from '../steps/start'
import terms from '../steps/terms'
import footer from '../steps/footer'
import header from '../steps/header'
import expired from '../steps/expired'
import summary from '../steps/summary'
import loading from '../steps/loading'
import success from '../steps/success'
import scanning from '../steps/scanning'
import quotation from '../steps/quotation'
import utilsService from './utils.service'
import validating from '../steps/validating'
import processing from '../steps/processing'
import insertTxid from '../steps/insert-txid'
import paymentError from '../steps/payment-error'
import stepIndicator from '../steps/stepIndicator'
import privacyPolicy from '../steps/privacy-policy'

import 'regenerator-runtime/runtime'

function buildHtml(closeModal, cancelModal, finalize) {
  const overlay = utilsService.createElementWithClass('div', 'guatapay-overlay')
  overlay.id = 'guatapay-overlay'

  const modalContainer = utilsService.createElementWithClass('div', 'modal-container')
  modalContainer.id = 'modal-container'
  const section = utilsService.createElementWithClass('section', 'modal-wrapper')
  section.id = 'main_modal'
  section.classList.add('hide')

  const headerSection = header.createHeader(closeModal)

  const startDiv = start.createStart()
  const termsDiv = terms.createTerms()
  const expiredDiv = expired.createExpired()
  const successDiv = success.createSuccess()
  const scanningDiv = scanning.createScanning()
  const quotationDiv = quotation.createQuotation()
  const validatingDiv = validating.createValidating()
  const processingDiv = processing.createProcessing()
  const insertTxidDiv = insertTxid.createInsertTxid()
  const paymentErrorDiv = paymentError.createPaymentError()
  const privacyPolicyDiv = privacyPolicy.createPrivacyPolicy()
  const summaryDiv = summary.createSummary(finalize)

  const stepIndicatorSection = stepIndicator.createNavBar()
  const footerSection = footer.createFooter(closeModal)
  const loadingOverlay = loading.createLoading()

  const loadHeader = true
  if (loadHeader) {
    section.appendChild(headerSection)
  }

  window.quotationCurrency = 'btc'
  section.appendChild(startDiv)
  section.appendChild(termsDiv)
  section.appendChild(privacyPolicyDiv)
  section.appendChild(quotationDiv)
  section.appendChild(scanningDiv)
  section.appendChild(expiredDiv)
  section.appendChild(paymentErrorDiv)
  section.appendChild(insertTxidDiv)
  section.appendChild(validatingDiv)
  section.appendChild(successDiv)
  section.appendChild(summaryDiv)
  section.appendChild(processingDiv)

  if (loadHeader) {
    section.appendChild(stepIndicatorSection)
    section.appendChild(footerSection)
  }

  modalContainer.appendChild(section)
  modalContainer.appendChild(loadingOverlay)
  document.body.appendChild(overlay)
  document.body.appendChild(modalContainer)
}

function removeSelectedStep(status) {
  let arr = ['START', 'TERMS', 'PRIVACY_POLICY', 'PAYMENT_ERROR', 'INSERT_TXID', 'QUOTATION', 'SCANNING', 'EXPIRED', 'VALIDATING', 'SUCCESS', 'SUMMARY', 'PROCESSING']

  if (status) arr = arr.filter((item) => item !== status)

  return arr
}

function handleStatusChange(status) {
  const stepsToHide = removeSelectedStep(status)
  stepsToHide.forEach((element) => {
    const step = document.getElementById(`step-${element}`)
    if (step) {
      step.className = 'modal-body-wrapper hide'
    } else {
      console.log('step not found', element)
    }
  })

  if (status && status !== 'SCANNING' && status !== 'EXPIRED' && status !== 'PAYMENT_ERROR') {
    document.getElementById(`step-${status}`).className = 'modal-body-wrapper show'
  } else if (status && (status === 'SCANNING' || status === 'EXPIRED' || status === 'PAYMENT_ERROR')) {
    document.getElementById(`step-${status}`).className = 'modal-body-wrapper-block show-block'
  }
}

export default {
  buildHtml,
  removeSelectedStep,
  handleStatusChange
}
