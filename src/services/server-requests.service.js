import axios from 'axios'
import utilsService from '../services/utils.service'
import loadingSpinner from '../img/loading-spinner.png'
import { API_URL, CHECKOUT_PUBLIC_KEY } from '../utils/environment'

function showLoaderElement() {
  const headerElement = document.getElementById('header')
  headerElement.classList.remove('hide')
  const parentElement = document.querySelector('#main_modal')
  const childElement = utilsService.createElementWithClass('div', 'modal-body-loader show')
  childElement.id = 'step-LOADING'

  childElement.innerHTML = `
    <p class="font-bold text-lg">Procesando...</p>
    <p class="text-lg"> Aguarda un momento por favor.</p>
    <div class="flex-ic-jc mt-32">
      <img src="${loadingSpinner}" alt="loading" id="loading-spinner" />
    </div>
  `

  utilsService.insertChildAtIndex(parentElement, childElement, 1)
}

function hideLoaderElement() {
  const parentElement = document.querySelector('#main_modal')
  if (parentElement) parentElement.removeChild(document.querySelector('.modal-body-loader'))
}

async function generateQuotation(loaderElement, currency) {
  const currencyToRequest = currency || 'btc'
  const guatapayPaymentData = JSON.parse(window.sessionStorage.getItem('guatapayPaymentData'))
  const amountToRequest = guatapayPaymentData.total

  if (loaderElement) showLoaderElement()

  try {
    const guatapayMarketQuote = await axios
      .post(
        `${API_URL}/trades/market-quote`,
        {
          currency: currencyToRequest,
          amount: amountToRequest
        },
        { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
      )
      .then((res) => res.data)

    if (loaderElement) hideLoaderElement()

    return guatapayMarketQuote
  } catch (error) {
    console.log('Error market-quote: ', error)
    if (loaderElement) hideLoaderElement()

    return { error: true }
  }
}

async function generatePaymentIntention(loaderElement) {
  if (loaderElement) showLoaderElement()

  try {
    const guatapayPaymentIntention = await axios
      .post(
        `${API_URL}/payments/create-checkout-intent`,
        {
          amount: window.total,
          currency: window.quotationCurrency
        },
        { headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'C-API-KEY': CHECKOUT_PUBLIC_KEY } }
      )
      .then((res) => res.data)

    if (loaderElement) hideLoaderElement()

    return guatapayPaymentIntention
  } catch (error) {
    console.log('Error payment-intention: ', error)
    if (loaderElement) hideLoaderElement()

    return { error: true }
  }
}

async function checkTransactionId(transactionId) {
  try {
    const guatapayCheckTransactionId = await axios
      .post(
        `${API_URL}/payments/check-transaction-id`,
        {
          transactionId,
          paymentId: window.paymentId,
          currency: window.quotationCurrency
        },
        { headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'C-API-KEY': CHECKOUT_PUBLIC_KEY } }
      )
      .then((res) => res.data)

    return guatapayCheckTransactionId
  } catch (error) {
    console.log('Error payment-intention: ', error)
    return { error: true }
  }
}

export default {
  generateQuotation,
  checkTransactionId,
  generatePaymentIntention
}
