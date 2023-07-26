import copyIcon from '../img/copy-icon.svg'
import currencies from '../utils/currencies'
import bitcoinFlag from '../img/bitcoin-flag.svg'
import qrRefreshImage from '../img/qr-refresh.svg'
import utilsService from '../services/utils.service'

function refreshView() {
  const walletAddressText = document.querySelector('#expired-wallet-address-text')
  walletAddressText.innerHTML = '-'

  const transferAmountText = document.querySelector('#expired-transfer-amount-text')
  transferAmountText.innerHTML = `- ${currencies[window.quotationCurrency].symbol}`

  const transferAmountImage = document.querySelector('#expired-transfer-amount-image')
  transferAmountImage.src = currencies[window.quotationCurrency].flag
}

function createExpired() {
  const expiredDiv = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  expiredDiv.id = 'step-EXPIRED'

  expiredDiv.innerHTML = `
    <p id="scan-expired-title" class="font-bold text-lg">¡Código QR expirado!</p>
    <p id="scan-title" class="text-lg">Actualiza la tasa de cambio para continuar con el pago.</p>
    <img id="qr-refresh-code" src="${qrRefreshImage}" alt="qr" />
    <!--<p class="text-gray-400 text-md my-2">O envía a la siguiente dirección el monto indicado:</p>-->
    <div id="wallet-address">
      <p id="expired-wallet-address-text" class="text-gray-400">-</p>
      <button id="expired-btn-copy-wallet-address">
        <img src="${copyIcon}" alt="copy" />
      </button>
    </div>

    <div id="transfer-amount">
      <div class="transfer-amount-wrapper">
        <p id="expired-transfer-amount-text">- BTC</p>
        <img id="expired-transfer-amount-image" src="${bitcoinFlag}" alt="BTC" />
      </div>
      <button id="expired-btn-copy-transfer-amount">
        <img src="${copyIcon}" alt="copy" />
      </button>
    </div>

    <div style="display: flex; justify-content: space-between;">
      <button class="guatapay-btn-primary mt-32" id="btn-expired-update" style="width: 100%; margin-right: 8px;">Actualizar pago</button>
      <button class="guatapay-btn-primary mt-32" id="btn-scanning-continue" style="width: 100%; margin-left: 8px;">Ya transferí</button>
    </div>
  `

  // Add event listener to qr refresh image
  const qrRefreshImageElement = expiredDiv.querySelector('#qr-refresh-code')
  qrRefreshImageElement.addEventListener('click', async () => {
    window.setModalStatus('SCANNING')
  })

  // Add event listener to update button
  const updateButton = expiredDiv.querySelector('#btn-expired-update')
  updateButton.addEventListener('click', async () => {
    window.setModalStatus('SCANNING')
  })

  // Add event listener to continue button
  const continueButton = expiredDiv.querySelector('#btn-scanning-continue')
  continueButton.addEventListener('click', () => {
    window.setModalStatus('INSERT_TXID')
  })

  return expiredDiv
}

export default {
  createExpired,
  refreshView
}
