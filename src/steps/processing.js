import utilsService from '../services/utils.service'
import loadingSpinner from '../img/loading-spinner.png'
import 'regenerator-runtime/runtime'

const GET_STATUS_URL = 'https://api.guatapay.com/payments/payment-status-by-id'
const INTERVAL_TIME = 3000
const currentInvervals = []

const intervalFunction = async (intervalId) => {
  if (window.paymentId && window.status === 'PROCESSING') {
    const response = await fetch(`${GET_STATUS_URL}/${window.paymentId}`)
    const paymentStatus = await response.json()

    console.log('Obtained payment status: ', paymentStatus)

    if (response.status === 404) {
      window.setModalStatus('EXPIRED')
      clearInterval(intervalId)
      return
    }

    switch (paymentStatus.status) {
      case 'expired':
        window.setModalStatus('EXPIRED')
        clearInterval(intervalId)
        break
      case 'completed':
        window.setModalStatus('SUMMARY')
        clearInterval(intervalId)
        break
      default:
        break
    }
  } else {
    clearInterval(intervalId)
  }
}

function refreshView() {
  currentInvervals.forEach((intervalId) => clearInterval(intervalId))
  const startIntervalId = setInterval(() => intervalFunction(startIntervalId), INTERVAL_TIME)
  currentInvervals.push(startIntervalId)
}

function createProcessing() {
  const processingDiv = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  processingDiv.id = 'step-PROCESSING'

  processingDiv.innerHTML = `
    <p class="font-bold text-lg">Procesando...</p>
    <p class="text-lg"> Aguarda un momento por favor.</p>

    <div class="flex-ic-jc mt-32">
      <img src="${loadingSpinner}" alt="loading" id="loading-spinner" />
    </div>
    `

  // Create inverval to check if the payment was completed
  const interval = setInterval(async () => {
    if (window.paymentId && window.status === 'PROCESSING') {
      const response = await fetch(`${GET_STATUS_URL}/${window.paymentId}`)

      if (response.status === 404) {
        window.setModalStatus('EXPIRED')
        return
      }

      const paymentStatus = await response.json()

      switch (paymentStatus.status) {
        case 'expired':
          window.setModalStatus('EXPIRED')
          break
        case 'completed':
          window.setModalStatus('SUMMARY')
          break
        default:
          break
      }
    }
  }, 1000)

  return processingDiv
}

export default {
  createProcessing,
  refreshView
}
