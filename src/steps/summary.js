import utilsService from '../services/utils.service'
import copyIcon from '../img/copy-icon.svg'

function refreshView() {
  const { lastQuotation } = window

  const totalFiat = document.querySelector('#total-fiat')
  totalFiat.innerHTML = `$ ${parseFloat(lastQuotation.fiat.amount + lastQuotation.fiat.fee).toFixed(2)}`

  const totalCrypto = document.querySelector('#total-crypto')
  totalCrypto.innerHTML = `${parseFloat(lastQuotation.crypto.amount + lastQuotation.crypto.fee).toFixed(8)} ${window.quotationCurrency}`

  const totalCryptoFee = document.querySelector('#fee-crypto')
  totalCryptoFee.innerHTML = `${parseFloat(lastQuotation.crypto.fee).toFixed(8)} ${window.quotationCurrency}`

  const totalFiatFee = document.querySelector('#fee-fiat')
  totalFiatFee.innerHTML = `$ ${parseFloat(lastQuotation.fiat.fee).toFixed(2)}`

  const subtotalFiat = document.querySelector('#subtotal-fiat')
  subtotalFiat.innerHTML = `$ ${parseFloat(lastQuotation.fiat.amount).toFixed(2)}`

  const subtotalCrypto = document.querySelector('#subtotal-crypto')
  subtotalCrypto.innerHTML = `${parseFloat(lastQuotation.crypto.amount).toFixed(8)} ${window.quotationCurrency}`

  const transactionId = document.querySelector('#transaction-id')
  transactionId.innerHTML = window.paymentId
}

function createSummary(finalize) {
  const summaryDiv = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  summaryDiv.id = 'step-SUMMARY'

  summaryDiv.innerHTML = `
    <p class="text-lg mb-16">Resumen de tu compra:</p>

    <div class="summary-wrapper mt-16">
      <div id="transaction-id-wrapper">
        <p class="text-gray-200">Id de Transacción</p>
        <div class="flex-ic-jb">
          <p id="transaction-id" class="text-gray-400">123456789</p>
          <button id="btn-copy-transaction-id">
            <img src="${copyIcon}" alt="copy" />
          </button>
        </div>
      </div>

      <div id="details-wrapper" class="mt-16">
        <div class="details-item mb-16">
          <div class="flex-ic-jb">
            <p>Subtotal:</p>
            <p id="subtotal-fiat">$100.000</p>
          </div>
          <p id="subtotal-crypto" class="text-right text-gray-200">0.60 BTC</p>
        </div>
        <div class="details-item mb-16">
          <div class="flex-ic-jb">
            <p>IVA 19%</p>
            <p id="fee-fiat">$100.000</p>
          </div>
          <p id="fee-crypto" class="text-right text-gray-200">0.60 BTC</p>
        </div>

        <div class="details-item mb-16">
          <div class="flex-ic-jb">
            <p class="font-bold">Total</p>
            <p id="total-fiat" class="font-bold">$${window.total}</p>
          </div>
          <p id="total-crypto" class="text-right text-gray-200">0.60 BTC</p>
        </div>
      </div>
    </div>

    <button class="guatapay-btn-ghost mt-32" id="btn-summary-finish">Finalizar</button>
    `

  // Add event listener to update button
  const finishButton = summaryDiv.querySelector('#btn-summary-finish')
  finishButton.addEventListener('click', () => {
    finalize()
  })

  // Add event listener to copy button
  const copyButton = summaryDiv.querySelector('#btn-copy-transaction-id')
  copyButton.addEventListener('click', () => {
    utilsService.copyToClipboard(window.paymentId)
  })

  return summaryDiv
}

export default {
  createSummary,
  refreshView
}
