import usdtFlag from '../img/usdt-flag.svg'
import currencies from '../utils/currencies'
import arrowRight from '../img/arrow-right.svg'
import chevronDown from '../img/chevron-down.svg'
import bitcoinFlag from '../img/bitcoin-flag.svg'
import colombiaFlag from '../img/colombia-flag.svg'
import utilsService from '../services/utils.service'
import modalService from '../services/modal.service'
import loadingSpinner from '../img/loading-spinner.png'
import lightningFlag from '../img/bitcoin-lightning-flag.svg'
import serverRequestsService from '../services/server-requests.service'

const INITIAL_TIME = 59

const timeIntervals = []
let timeLeft

async function timerIntervalFunction(intervalId) {
  const continueButton = document.querySelector('#btn-quotation-continue')
  const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft

  if (continueButton) {
    continueButton.innerHTML = `Continuar 00:${formattedTime}`

    if (timeLeft < 1) {
      clearInterval(intervalId)
      showRefreshLoaderElement()
      const guatapayMarketQuote = await serverRequestsService.generateQuotation(false, window.quotationCurrency)
      hideRefreshLoaderElement()
      refreshView(guatapayMarketQuote)
    }

    timeLeft -= 1
  } else {
    clearInterval(intervalId)
  }
}

function showRefreshLoaderElement() {
  const parentElement = document.querySelector('#currency-amount')
  parentElement.innerHTML = `
    <p class="font-bold text-lg loading-small-text">Actualizando cotización...</p>
    <img src="${loadingSpinner}" alt="loading" id="loading-spinner-small" />
  `
}

function hideRefreshLoaderElement() {
  const parentElement = document.querySelector('#currency-amount')
  parentElement.innerHTML = `
    <p id="currency-amount-quotation">Cotización 1 COP = 0,0000062  ${window.quotationCurrency}</p>
    <h1 id="currency-amount-to">$${window.quotationTotal} ${window.quotationCurrency}</h1>
    <p id="currency-amount-from">≈ 616.327,99 COP</p>
  `
}

async function refreshView(guatapayMarketQuote) {
  const guatapayPaymentCurrency = window.quotationCurrency
  const continueButton = document.querySelector('#btn-quotation-continue')

  if (guatapayMarketQuote.error) {
    const totalBriefQuotation = document.querySelector('#total-brief')
    totalBriefQuotation.innerHTML = 'Pagas $ ----- ---'

    const currencyAmountQuotation = document.querySelector('#currency-amount-quotation')
    currencyAmountQuotation.innerHTML = 'Cotización ----'

    const parentElement = document.querySelector('#currency-amount')
    parentElement.removeChild(document.querySelector('#currency-amount-to'))
    parentElement.removeChild(document.querySelector('#currency-amount-from'))

    const childElement = utilsService.createElementWithId('div', 'quotation-error-message')
    childElement.innerHTML = '<p>Disculpa las molestias. El servicio no se encuentra disponible en este momento. Intenta nuevamente más tarde.</p>'
    utilsService.insertChildAtIndex(parentElement, childElement, 1)

    const doneButton = document.querySelector('#btn-quotation-done')
    continueButton.classList.add('hide')
    doneButton.classList.remove('hide')
    doneButton.addEventListener('click', async () => {
      modalService.closeModal()
    })

    const currencySelectorDropdownButton = document.querySelector('#to-currency-wrapper')
    currencySelectorDropdownButton.removeEventListener('click', handleShowDropDownOptions)

    return
  }

  timeLeft = INITIAL_TIME
  const { cryptoFeeData } = utilsService.extractFeesFromQuotation(guatapayMarketQuote)
  const fullInputAmount = guatapayMarketQuote.fiat.amountToTradeWithFees / guatapayMarketQuote.currentFiatPriceByCryptoUnit

  window.lastQuotation = { ...guatapayMarketQuote, fullInputAmount }
  window.quotationTotal = guatapayMarketQuote.crypto.amount
  window.totalWithFees = guatapayMarketQuote.fiat.amountToTradeWithFees

  const currencyAmountTo = document.querySelector('#currency-amount-to')
  const currencyAmountToValue = window.totalWithFees / guatapayMarketQuote.currentFiatPriceByCryptoUnit
  const currencyAmountToValueDecimals = guatapayPaymentCurrency === 'btc' || guatapayPaymentCurrency === 'lightning-btc' ? parseFloat(currencyAmountToValue).toFixed(8) : parseFloat(currencyAmountToValue).toFixed(6)
  currencyAmountTo.innerHTML = `${currencyAmountToValueDecimals} ${currencies[guatapayPaymentCurrency].symbol}`

  const currencyAmountFrom = document.querySelector('#currency-amount-from')
  currencyAmountFrom.innerHTML = `≈ $${utilsService.numberWithCommas(Number(window.total))} ${window.currency}`
  const currencyAmountQuotation = document.querySelector('#currency-amount-quotation')
  currencyAmountQuotation.innerHTML = `Cotización 1 ${window.currency} = ${parseFloat((guatapayMarketQuote.crypto.amount + cryptoFeeData) / window.total).toFixed(8)} ${currencies[guatapayPaymentCurrency].symbol}`
  const totalBriefQuotation = document.querySelector('#total-brief')
  totalBriefQuotation.innerHTML = `Pagas $${utilsService.numberWithCommas(Number(window.total))} ${window.currency}`

  continueButton.innerHTML = 'Continuar 01:00'
  continueButton.classList.remove('hide')

  // Start timer
  timeIntervals.forEach((intervalId) => clearInterval(intervalId))
  const startIntervalId = setInterval(() => timerIntervalFunction(startIntervalId), 1000)
  timeIntervals.push(startIntervalId)
}

async function setActiveCurrency(symbol) {
  showRefreshLoaderElement()
  const guatapayMarketQuote = await serverRequestsService.generateQuotation(false, symbol)
  hideRefreshLoaderElement()

  await refreshView(guatapayMarketQuote)

  const currencyName = document.querySelector('#currency-name')
  const currencyImage = document.querySelector('#currency-image')

  currencyName.innerHTML = currencies[symbol].name
  currencyImage.src = currencies[symbol].flag
}

function handleShowDropDownOptions() {
  const currencySelectorDropdown = document.querySelector('#currency-selector-dropdown')
  const currencySelector = document.querySelector('#currency-selector')

  currencySelectorDropdown.classList.toggle('non-visible')
  currencySelector.classList.toggle('selector-active')
}

function createQuotation() {
  const quotationDiv = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  quotationDiv.id = 'step-QUOTATION'

  //  <p id="payment-amount-text">Pagas 623.23 COP</p>;
  quotationDiv.innerHTML = `
    <div id="total-brief">Pagas 628.600 COP</div>
    <div id="currency-selector">
      <div class="currency-wrapper">
        <div class="currency-img">
        <img src="${colombiaFlag}" alt="COP" />
        </div>
        <div class="currency-name">
          <p>DE</p>
          <p>COP</p>
        </div>
      </div>
      <div>
        <img src="${arrowRight}" alt="arrow" />
      </div>
      <div class="currency-wrapper" id="to-currency-wrapper">
        <div class="currency-name">
          <p class="text-right" style="margin-left: 20px;">A</p>
          <div id="currency-name-dropdown-button">
            <p  id="currency-name">Bitcoin</p>
            <img  src="${chevronDown}" alt="arrow" />
          </div>
        </div>
        <div class="currency-img">
          <img id="currency-image" src="${bitcoinFlag}" alt="COP" />
        </div>
      </div>

      <div id="currency-selector-dropdown" class="non-visible">
        <div class="currency-selector-dropdown-item" id="usdc">
          <p class="font-bold">USDC (USD Coin)</p>
          <img src="${usdtFlag}" alt="COP" class="currency-selector-dropdown-img" />
        </div>
        <div class="currency-selector-dropdown-item" id="lightning-btc">
          <span>Más rápido y menor comisión</span>
          <p class="font-bold">BTC Lightning</p>
          <img src="${lightningFlag}" alt="COP" class="currency-selector-dropdown-img" />
        </div>
        <div class="currency-selector-dropdown-item" id="btc">
          <p class="font-bold">BTC (Bitcoin)</p>
          <img src="${bitcoinFlag}" alt="COP" class="currency-selector-dropdown-img" />
        </div>
      </div>
    </div>
    <div id="currency-amount" class="mb-32">
      <p id="currency-amount-quotation">Cotización 1 COP = 0,0000062  ${window.quotationCurrency}</p>
      <h1 id="currency-amount-to">$${window.quotationTotal} ${window.quotationCurrency}</h1>
      <p id="currency-amount-from">≈ 616.327,99 COP</p>
    </div>
    <button class="guatapay-btn-primary hide" id="btn-quotation-done">Hecho</button>
    <button class="guatapay-btn-primary" id="btn-quotation-continue">Continuar 01:00</button>
  `

  const currencySelector = quotationDiv.querySelector('#currency-selector')

  // Add event listener to currency selector dropdown
  const currencySelectorDropdown = quotationDiv.querySelector('#currency-selector-dropdown')
  const currencySelectorDropdownButton = quotationDiv.querySelector('#to-currency-wrapper')
  currencySelectorDropdownButton.addEventListener('click', handleShowDropDownOptions)

  // Add event listener to continue button
  const continueButton = quotationDiv.querySelector('#btn-quotation-continue')
  continueButton.addEventListener('click', () => {
    timeIntervals.forEach((intervalId) => clearInterval(intervalId))
    window.setModalStatus('SCANNING')
    // window.setModalStatus('SUMMARY')
  })

  // Dropdown item clicks
  const dropdownItems = quotationDiv.querySelectorAll('.currency-selector-dropdown-item')

  dropdownItems.forEach((item) => {
    item.addEventListener('click', async () => {
      currencySelectorDropdown.classList.toggle('non-visible')
      currencySelector.classList.toggle('selector-active')
      const currencySymbol = item.id
      window.quotationCurrency = currencySymbol
      await setActiveCurrency(currencySymbol)
    })
  })

  // Add event listener to document
  document.addEventListener('click', (event) => {
    // Check if target element is outside currency-selector-dropdown
    if (!currencySelectorDropdown.contains(event.target) && !currencySelectorDropdownButton.contains(event.target)) {
      currencySelectorDropdown.classList.add('non-visible')
    }
  })

  return quotationDiv
}

export default {
  createQuotation,
  refreshView
}
