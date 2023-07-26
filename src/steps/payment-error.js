import copyIcon from '../img/copy-icon.svg'
import currencies from '../utils/currencies'
import bitcoinFlag from '../img/bitcoin-flag.svg'
import utilsService from '../services/utils.service'
import qrRefreshImageError from '../img/qr-refresh-error.svg'

function refreshView() {
  const walletAddressText = document.querySelector('#payment-error-wallet-address-text')
  walletAddressText.innerHTML = '-'

  const transferAmountText = document.querySelector('#payment-error-transfer-amount-text')
  transferAmountText.innerHTML = `- ${currencies[window.quotationCurrency].symbol}`

  const transferAmountImage = document.querySelector('#payment-error-transfer-amount-image')
  transferAmountImage.src = currencies[window.quotationCurrency].flag
}

function createPaymentError() {
  const paymentErrorDiv = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  paymentErrorDiv.id = 'step-PAYMENT_ERROR'

  paymentErrorDiv.innerHTML = `
    <p id="scan-payment-error-title" class="font-bold text-lg error-color">¡Ups, ha ocurrido un error!</p>
    <p id="scan-title" class="text-lg error-color">No se pudo crear la intención de pago. Por favor, intenta nuevamente.</p>
    <img id="qr-refresh-code" src="${qrRefreshImageError}" alt="qr" />
    <!--<p class="text-gray-400 text-md my-2">O envía a la siguiente dirección el monto indicado:</p>-->
    <div id="wallet-address">
      <p id="payment-error-wallet-address-text" class="text-gray-400 error-color">-</p>
      <button id="payment-error-btn-copy-wallet-address">
        <img src="${copyIcon}" alt="copy" />
      </button>
    </div>
    <div id="transfer-amount">
      <div class="transfer-amount-wrapper">
        <p id="payment-error-transfer-amount-text" class="error-color">- BTC</p>
        <img id="payment-error-transfer-amount-image" src="${bitcoinFlag}" alt="BTC" />
      </div>
      <button id="payment-error-btn-copy-transfer-amount">
        <img src="${copyIcon}" alt="copy" />
      </button>
    </div>

    <div style="display: flex; justify-content: center;">
      <button class="guatapay-btn-primary mt-32" id="btn-payment-error-update" style="width: 50%;">Intentar nuevamente</button>
    </div>
  `

  // Add event listener to qr refresh image
  const qrRefreshImageElement = paymentErrorDiv.querySelector('#qr-refresh-code')
  qrRefreshImageElement.addEventListener('click', async () => {
    await window.setModalStatus('SCANNING')
  })

  // Add event listener to update button
  const updateButton = paymentErrorDiv.querySelector('#btn-payment-error-update')
  updateButton.addEventListener('click', async () => {
    await window.setModalStatus('SCANNING')
  })

  return paymentErrorDiv
}

export default {
  createPaymentError,
  refreshView
}
