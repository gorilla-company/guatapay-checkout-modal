import start from '../steps/start'
import terms from '../steps/terms'
import header from '../steps/header'
import expired from '../steps/expired'
import summary from '../steps/summary'
import loading from '../steps/loading'
import scanning from '../steps/scanning'
import quotation from '../steps/quotation'
import utilsService from './utils.service'
import validating from '../steps/validating'
import processing from '../steps/processing'
import stepIndicator from '../steps/stepIndicator'

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
  const quotationDiv = quotation.createQuotation()
  const scanningDiv = scanning.createScanning()
  const expiredDiv = expired.createExpired()
  const validatingDiv = validating.createValidating()
  const processingDiv = processing.createProcessing()
  const summaryDiv = summary.createSummary(finalize)

  const stepIndicatorSection = stepIndicator.createNavBar()

  const loadingOverlay = loading.createLoading()

  const loadHeader = true
  if (loadHeader) {
    section.appendChild(headerSection)
  }

  window.quotationCurrency = 'BTC'
  section.appendChild(startDiv)
  section.appendChild(termsDiv)
  section.appendChild(quotationDiv)
  section.appendChild(scanningDiv)
  section.appendChild(expiredDiv)
  section.appendChild(validatingDiv)
  section.appendChild(summaryDiv)
  section.appendChild(processingDiv)

  if (loadHeader) {
    section.appendChild(stepIndicatorSection)
  }

  modalContainer.appendChild(section)
  modalContainer.appendChild(loadingOverlay)
  document.body.appendChild(overlay)
  document.body.appendChild(modalContainer)
}

function removeSelectedStep(status) {
  let arr = ['START', 'TERMS', 'QUOTATION', 'SCANNING', 'EXPIRED', 'VALIDATING', 'SUMMARY', 'PROCESSING']
  arr = arr.filter((item) => item !== status)

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
  document.getElementById(`step-${status}`).className = 'modal-body-wrapper show'
}

export default {
  buildHtml,
  removeSelectedStep,
  handleStatusChange
}
