import bip21 from 'bip21'
import copyIcon from '../img/copy-icon.svg'
import currencies from '../utils/currencies'
import bitcoinFlag from '../img/bitcoin-flag.svg'
import utilsService from '../services/utils.service'
import qrCodeService from '../services/qr-code.service'
import loadingSpinner from '../img/loading-spinner.png'

const timeIntervals = []
let timeLeft = 59

const intervalFunction = (intervalId) => {
  const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft
  const continueButton = document.querySelector('#btn-scanning-continue')

  if (continueButton) {
    continueButton.innerHTML = `Ya transferí 00:${formattedTime}`

    if (timeLeft < 1) {
      clearInterval(intervalId)
      continueButton.innerHTML = 'Ya transferí 01:00'
      timeLeft = 59
      window.setModalStatus('EXPIRED')
    }

    timeLeft -= 1
  } else {
    clearInterval(intervalId)
  }
}

function showRefreshLoaderElement() {
  const parentElement = document.querySelector('#payment-full-data')
  parentElement.innerHTML = `
    <p class="font-bold text-lg loading-small-text">Procesando pago...</p>
    <p class="font-bold text-lg loading-small-text" style="font-size: 12px; line-height: 150%">Por favor no recargues la página, ni cierres esta ventana, se puede perder la referencia del pago</p>
    <img src="${loadingSpinner}" alt="loading" id="loading-spinner-small" />
  `
}

async function refreshView(guatapayPaymentIntention, socket) {
  timeLeft = 59

  window.lastQuotation = guatapayPaymentIntention
  window.paymentId = guatapayPaymentIntention.paymentId
  window.merchantId = guatapayPaymentIntention.merchantId
  const qrCodeContainer = document.querySelector('#qr-code')
  qrCodeContainer.innerHTML = ''
  const continueButton = document.querySelector('#btn-scanning-continue')
  continueButton.innerHTML = 'Ya transferí 01:00'

  if (window.quotationCurrency === 'lightning-btc') {
    const btcAddress = guatapayPaymentIntention.addressAccount
    const options = {
      label: 'Guatapay Lightning Payment',
      lightning: guatapayPaymentIntention.lightningInvoice,
      amount: Number(guatapayPaymentIntention.fullInputAmount),
      message: `Guatapay payment id: ${guatapayPaymentIntention.addressAccountId}-${guatapayPaymentIntention.merchantId}`
    }

    const uri = bip21.encode(btcAddress, options)
    guatapayPaymentIntention.width = 300
    guatapayPaymentIntention.height = 300
    guatapayPaymentIntention.mainQrCodeUri = uri
  } else if (window.quotationCurrency === 'btc') {
    const btcAddress = guatapayPaymentIntention.addressAccount
    const options = {
      label: 'Guatapay Lightning Payment',
      amount: Number(guatapayPaymentIntention.fullInputAmount),
      message: `Guatapay payment id: ${guatapayPaymentIntention.addressAccountId}-${guatapayPaymentIntention.merchantId}`
    }

    const uri = bip21.encode(btcAddress, options)
    guatapayPaymentIntention.width = 200
    guatapayPaymentIntention.height = 200
    document.getElementById('qr-code').style.width = 200
    document.getElementById('qr-code').style.height = 200
    guatapayPaymentIntention.mainQrCodeUri = uri
  } else if (window.quotationCurrency === 'usdc') {
    const amountToReceive = Number(String(guatapayPaymentIntention.fullInputAmount).split('.').join(''))
    console.log('amountToReceive', amountToReceive)

    const ethAddress = guatapayPaymentIntention.addressAccount
    guatapayPaymentIntention.width = 200
    guatapayPaymentIntention.height = 200
    document.getElementById('qr-code').style.width = 200
    document.getElementById('qr-code').style.height = 200
    guatapayPaymentIntention.mainQrCodeUri = `ethereum:${ethAddress}?value=${amountToReceive}`
  }

  const walletAddressText = document.querySelector('#wallet-address-text')
  walletAddressText.innerHTML = guatapayPaymentIntention.addressAccount

  const transferAmountText = document.querySelector('#transfer-amount-text')
  transferAmountText.innerHTML = `${window.quotationCurrency === 'usdc' ? parseFloat(guatapayPaymentIntention.fullInputAmount).toFixed(6) : parseFloat(guatapayPaymentIntention.fullInputAmount).toFixed(8)} ${
    currencies[window.quotationCurrency].symbol
  }`

  const transferAmountImage = document.querySelector('#transfer-amount-image')
  transferAmountImage.src = currencies[window.quotationCurrency].flag
  qrCodeService.generateQr(guatapayPaymentIntention)

  if (socket) {
    socket.on('connect', () => {
      console.log('Socket connected!', socket.connected)
    })

    socket.emit('connected', { merchantId: guatapayPaymentIntention.merchantId, paymentId: guatapayPaymentIntention.paymentId })

    socket.on('processing-payment', (data) => {
      console.log('processing-payment: ', window.paymentId)
      if (String(window.paymentId) === String(data._id)) {
        timeIntervals.forEach((intervalId) => clearInterval(intervalId))
        window.setModalStatus('PROCESSING')
        // showRefreshLoaderElement()
      }
    })

    socket.on('completed-payment', (data) => {
      console.log('completed-payment: ', window.paymentId)
      if (String(window.paymentId) === String(data._id)) {
        timeIntervals.forEach((intervalId) => clearInterval(intervalId))
        window.setModalStatus('SUCCESS')
      }
    })

    /* socket.on('unconfirmed-payment', (data) => {
      console.log('unconfirmed-payment: ', data)
    }) */
  }

  window.walletAddress = guatapayPaymentIntention.addressAccount
  window.fullInputAmount = guatapayPaymentIntention.fullInputAmount

  timeIntervals.forEach((intervalId) => clearInterval(intervalId))

  const intervalId = setInterval(() => intervalFunction(intervalId), 1000)
  timeIntervals.push(intervalId)
}

function createScanning() {
  const scanningDiv = utilsService.createElementWithClass('div', 'modal-body-wrapper-block hide')
  scanningDiv.id = 'step-SCANNING'

  scanningDiv.innerHTML = `
    <p id="scan-title" class="text-lg">Elige tu billetera de preferencia y escanea el código QR con tu dispositivo móvil para pagar.</p>

    <div id="qr-code" src="" alt="qr"></div>

    <div id="payment-full-data">
      <p class="text-gray-400 text-md my-2">O envía a la siguiente dirección el monto indicado:</p>

      <div id="wallet-address" data-tooltip="Copiar?">
        <p id="wallet-address-text" class="text-gray-400">${window.walletAddress}</p>
        <button id="btn-copy-wallet-address">
          <img src="${copyIcon}" alt="copy" />
        </button>
      </div>

      <div id="transfer-amount" data-tooltip="Copiar?">
        <div class="transfer-amount-wrapper">
          <p id="transfer-amount-text">${window.quotationTotal} ${window.quotationCurrency}</p>
          <img id="transfer-amount-image" src="${bitcoinFlag}" alt="BTC" />
        </div>
        <button id="btn-copy-transfer-amount">
          <img src="${copyIcon}" alt="copy" />
        </button>
      </div>

      <button class="guatapay-btn-primary mt-32" id="btn-scanning-continue">Ya transferí 01:00</button>

      <p id="click-warning" style="font-size: 12px; line-height: 150%; margin-top: 15px; color: #EF4444; text-align: center; font-weight: bold">
        RECOMENDACIÓN: Antes de oprimir este botón espera unos segundos, puede que se demore un poco en recibir la notificación del procesamiento de la transacción.
      </p>
    </div>
  `

  // Add event listener to continue button
  const continueButton = scanningDiv.querySelector('#btn-scanning-continue')
  continueButton.addEventListener('click', () => {
    timeIntervals.forEach((intervalId) => clearInterval(intervalId))
    window.setModalStatus('INSERT_TXID')
  })

  // Add event listener to copy wallet address button
  // const copyWalletAddressButton = scanningDiv.querySelector('#btn-copy-wallet-address')
  const copyWalletAddressButton = scanningDiv.querySelector('#wallet-address')
  copyWalletAddressButton.addEventListener('click', () => {
    utilsService.copyToClipboard(window.walletAddress)
    responseTextChange(copyWalletAddressButton)

    copyWalletAddressButton.addEventListener('mouseleave', () => {
      setTimeout(function () {
        responseTextReset(copyWalletAddressButton)
      }, 200)
    })
  })

  // Add event listener to copy transfer amount button
  // const copyTransferAmountButton = scanningDiv.querySelector('#btn-copy-transfer-amount')
  const copyTransferAmountButton = scanningDiv.querySelector('#transfer-amount')
  copyTransferAmountButton.addEventListener('click', () => {
    utilsService.copyToClipboard(window.fullInputAmount)
    responseTextChange(copyTransferAmountButton)

    copyTransferAmountButton.addEventListener('mouseleave', () => {
      setTimeout(function () {
        responseTextReset(copyTransferAmountButton)
      }, 200)
    })
  })

  return scanningDiv
}

function responseTextChange(element) {
  element.getAttributeNode('data-tooltip').value = 'Copiado!'
}

function responseTextReset(element) {
  element.getAttributeNode('data-tooltip').value = 'Copiar?'
}

export default {
  createScanning,
  refreshView
}
