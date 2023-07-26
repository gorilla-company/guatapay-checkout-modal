import copyIcon from '../img/copy-icon.svg'
import currencies from '../utils/currencies'
import utilsService from '../services/utils.service'

function refreshView() {
  const { lastQuotation } = window
  const guatapayPaymentData = JSON.parse(window.sessionStorage.getItem('guatapayPaymentData'))
  const totalFiatFloatNumber = Math.ceil(guatapayPaymentData.total)
  const totalTaxesCryptoFloatNumber = (lastQuotation.fullInputAmount * guatapayPaymentData.percentageOfTaxes) / 100
  const totalTaxesFiatFloatNumber = Math.ceil((guatapayPaymentData.total * guatapayPaymentData.percentageOfTaxes) / 100)
  const totalDiscountsCryptoFloatNumber = (lastQuotation.fullInputAmount * guatapayPaymentData.percentageOfDiscounts) / 100
  const totalDiscountsFiatFloatNumber = Math.ceil((guatapayPaymentData.total * guatapayPaymentData.percentageOfDiscounts) / 100)
  const totalSubtotalFiatFloatNumber = Math.ceil(totalFiatFloatNumber - totalTaxesFiatFloatNumber + totalDiscountsFiatFloatNumber)
  const totalSubtotalCryptoFloatNumber = lastQuotation.fullInputAmount - totalTaxesCryptoFloatNumber + totalDiscountsCryptoFloatNumber

  const subtotalFiat = document.querySelector('#subtotal-fiat')
  subtotalFiat.innerHTML = `$${utilsService.numberWithCommas(totalSubtotalFiatFloatNumber)} ${guatapayPaymentData.currency.toUpperCase()}`

  const subtotalCrypto = document.querySelector('#subtotal-crypto')
  const subtotalCryptoNumberToDisplay = window.quotationCurrency === 'usdc' ? Number(totalSubtotalCryptoFloatNumber).toFixed(2) : Number(totalSubtotalCryptoFloatNumber).toFixed(8)
  subtotalCrypto.innerHTML = `${utilsService.numberWithCommas(subtotalCryptoNumberToDisplay)} ${currencies[window.quotationCurrency].symbol}`

  if (Number(totalDiscountsFiatFloatNumber) > 0) {
    const discountsFiat = document.querySelector('#discounts-fiat')
    discountsFiat.innerHTML = `$${utilsService.numberWithCommas(totalDiscountsFiatFloatNumber)} ${guatapayPaymentData.currency.toUpperCase()}`

    const discountsText = document.querySelector('#discounts-text')
    discountsText.innerHTML = `Descuentos ${guatapayPaymentData.percentageOfDiscounts}%:`

    const discountsCrypto = document.querySelector('#discounts-crypto')
    const discountsCryptoNumberToDisplay = window.quotationCurrency === 'usdc' ? Number(totalDiscountsCryptoFloatNumber).toFixed(2) : Number(totalDiscountsCryptoFloatNumber).toFixed(8)
    discountsCrypto.innerHTML = `${utilsService.numberWithCommas(discountsCryptoNumberToDisplay)} ${currencies[window.quotationCurrency].symbol}`
  } else {
    const parentElement = document.querySelector('#details-wrapper')
    parentElement.removeChild(parentElement.querySelector('#discounts-item'))
  }

  if (Number(totalTaxesFiatFloatNumber) > 0) {
    const taxesFiat = document.querySelector('#tax-fiat')
    taxesFiat.innerHTML = `$${utilsService.numberWithCommas(totalTaxesFiatFloatNumber)} ${guatapayPaymentData.currency.toUpperCase()}`

    const taxesText = document.querySelector('#tax-text')
    taxesText.innerHTML = `IVA ${guatapayPaymentData.percentageOfTaxes}%:`

    const taxesCrypto = document.querySelector('#tax-crypto')
    const taxesCryptoNumberToDisplay = window.quotationCurrency === 'usdc' ? Number(totalTaxesCryptoFloatNumber).toFixed(2) : Number(totalTaxesCryptoFloatNumber).toFixed(8)
    taxesCrypto.innerHTML = `${utilsService.numberWithCommas(taxesCryptoNumberToDisplay)} ${currencies[window.quotationCurrency].symbol}`
  } else {
    const parentElement = document.querySelector('#details-wrapper')
    parentElement.removeChild(parentElement.querySelector('#taxes-item'))
  }

  const totalFiat = document.querySelector('#total-fiat')
  totalFiat.innerHTML = `$${utilsService.numberWithCommas(totalFiatFloatNumber)} ${guatapayPaymentData.currency.toUpperCase()}`

  const totalCrypto = document.querySelector('#total-crypto')
  const totalCryptoNumberToDisplay = window.quotationCurrency === 'usdc' ? Number(lastQuotation.fullInputAmount).toFixed(2) : Number(lastQuotation.fullInputAmount).toFixed(8)
  totalCrypto.innerHTML = `${utilsService.numberWithCommas(totalCryptoNumberToDisplay)} ${currencies[window.quotationCurrency].symbol}`

  /* const transactionId = document.querySelector('#transaction-id')
  transactionId.innerHTML = window.paymentId */
}

function createSummary(finalize) {
  const summaryDiv = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  summaryDiv.id = 'step-SUMMARY'

  summaryDiv.innerHTML = `
    <p class="text-lg mb-16">Resumen de tu compra:</p>

    <div class="summary-wrapper mt-16">
      <!--<div id="transaction-id-wrapper">
        <p class="text-gray-200">Id de Transacción</p>
        <div class="flex-ic-jb">
          <p id="transaction-id" class="text-gray-400">123456789</p>
          <button id="btn-copy-transaction-id">
            <img src="${copyIcon}" alt="copy" />
          </button>
        </div>
      </div>-->

      <div id="details-wrapper">
        <div class="details-item mb-12 mt-12">
          <div class="flex-ic-jb">
            <p>Subtotal:</p>
            <p id="subtotal-fiat">$100.000</p>
          </div>
          <p id="subtotal-crypto" class="text-right text-gray-200">0.60 BTC</p>
        </div>
        <div class="details-item mb-12 mt-12" id="discounts-item">
          <div class="flex-ic-jb">
            <p id="discounts-text">Descuentos:</p>
            <p id="discounts-fiat">$100.000</p>
          </div>
          <p id="discounts-crypto" class="text-right text-gray-200">0.60 BTC</p>
        </div>
        <div class="details-item mb-12 mt-12" id="taxes-item">
          <div class="flex-ic-jb">
            <p id="tax-text">IVA 19%</p>
            <p id="tax-fiat">$100.000</p>
          </div>
          <p id="tax-crypto" class="text-right text-gray-200">0.60 BTC</p>
        </div>

        <div class="details-item mb-12 mt-12">
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
  /* const copyButton = summaryDiv.querySelector('#btn-copy-transaction-id')
  copyButton.addEventListener('click', () => {
    utilsService.copyToClipboard(window.paymentId)
  }) */

  return summaryDiv
}

export default {
  createSummary,
  refreshView
}
