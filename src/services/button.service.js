import utilsService from '../services/utils.service'
import modalService from '../services/modal.service'

function displayButton() {
  const guatapayPaymentButtonContainer = document.querySelector('#guatapay-payment-button-container')
  guatapayPaymentButtonContainer.innerHTML = `
    <button id="guatapay-payment-button">Pay with BTC | Powered by G</button>
  `

  const guatapayPaymentButton = document.querySelector('#guatapay-payment-button')
  guatapayPaymentButton.addEventListener('click', async () => {
    validateDataToShowModal()
  })
}

function validatePaymentObject(paymentObject) {
  const paymentObjectMissingAttributes = []
  const paymentObjectIncorrectTypesAttributes = []
  const guatapayPaymentDataObjectKeys = Object.keys(paymentObject)

  const checklistOfAttributesIncluded = {
    total: false,
    currency: false,
    productsToPay: false,
    percentageOfTaxes: false,
    percentageOfDiscounts: false
  }

  const checklistOfAttributesCorrectTypes = {
    total: false,
    currency: false,
    productsToPay: false,
    percentageOfTaxes: false,
    percentageOfDiscounts: false
  }

  guatapayPaymentDataObjectKeys.map((keyName) => {
    if (keyName === 'total') {
      checklistOfAttributesIncluded.total = true
    } else if (keyName === 'currency') {
      checklistOfAttributesIncluded.currency = true
    } else if (keyName === 'percentageOfTaxes') {
      checklistOfAttributesIncluded.percentageOfTaxes = true
    } else if (keyName === 'productsToPay') {
      checklistOfAttributesIncluded.productsToPay = true
    } else if (keyName === 'percentageOfDiscounts') {
      checklistOfAttributesIncluded.percentageOfDiscounts = true
    }

    if (keyName === 'total' && typeof paymentObject[keyName] === 'number') {
      checklistOfAttributesCorrectTypes.total = true
    } else if (keyName === 'currency' && typeof paymentObject[keyName] === 'string') {
      checklistOfAttributesCorrectTypes.currency = true
    } else if (keyName === 'percentageOfTaxes' && typeof paymentObject[keyName] === 'number' && paymentObject[keyName] >= 0 && paymentObject[keyName] <= 100) {
      checklistOfAttributesCorrectTypes.percentageOfTaxes = true
    } else if (keyName === 'productsToPay' && typeof paymentObject[keyName] === 'object') {
      checklistOfAttributesCorrectTypes.productsToPay = true
    } else if (keyName === 'percentageOfDiscounts' && typeof paymentObject[keyName] === 'number' && paymentObject[keyName] >= 0 && paymentObject[keyName] <= 100) {
      checklistOfAttributesCorrectTypes.percentageOfDiscounts = true
    }
  })

  for (let i = 0; i < Object.keys(checklistOfAttributesIncluded).length; i++) {
    const keyName = Object.keys(checklistOfAttributesIncluded)[i]
    if (checklistOfAttributesIncluded[keyName] === false) paymentObjectMissingAttributes.push(keyName)
  }

  for (let i = 0; i < Object.keys(checklistOfAttributesCorrectTypes).length; i++) {
    const keyName = Object.keys(checklistOfAttributesCorrectTypes)[i]
    if (checklistOfAttributesCorrectTypes[keyName] === false) paymentObjectIncorrectTypesAttributes.push(keyName)
  }

  return { paymentObjectMissingAttributes, paymentObjectIncorrectTypesAttributes }
}

function validateProductObject(productObject) {
  const productObjectMissingAttributes = []
  const productObjectIncorrectTypesAttributes = []
  const productObjectKeys = Object.keys(productObject)

  const checklistOfAttributesIncluded = {
    tax: false,
    name: false,
    discount: false,
    quantity: false,
    unitPrice: false
  }

  const checklistOfAttributesCorrectTypes = {
    tax: false,
    name: false,
    discount: false,
    quantity: false,
    unitPrice: false
  }

  productObjectKeys.map((keyName) => {
    if (keyName === 'tax') {
      checklistOfAttributesIncluded.tax = true
    } else if (keyName === 'name') {
      checklistOfAttributesIncluded.name = true
    } else if (keyName === 'discount') {
      checklistOfAttributesIncluded.discount = true
    } else if (keyName === 'quantity') {
      checklistOfAttributesIncluded.quantity = true
    } else if (keyName === 'unitPrice') {
      checklistOfAttributesIncluded.unitPrice = true
    }

    if (keyName === 'name' && typeof productObject[keyName] === 'string') {
      checklistOfAttributesCorrectTypes.name = true
    } else if (keyName === 'quantity' && typeof productObject[keyName] === 'number' && productObject[keyName] > 0) {
      checklistOfAttributesCorrectTypes.quantity = true
    } else if (keyName === 'unitPrice' && typeof productObject[keyName] === 'number' && productObject[keyName] > 0) {
      checklistOfAttributesCorrectTypes.unitPrice = true
    } else if (keyName === 'discount' && typeof productObject[keyName] === 'number' && productObject[keyName] >= 0 && productObject[keyName] <= 100) {
      checklistOfAttributesCorrectTypes.discount = true
    } else if (keyName === 'tax' && typeof productObject[keyName] === 'number' && productObject[keyName] >= 0 && productObject[keyName] <= 100) {
      checklistOfAttributesCorrectTypes.tax = true
    }
  })

  for (let i = 0; i < Object.keys(checklistOfAttributesIncluded).length; i++) {
    const keyName = Object.keys(checklistOfAttributesIncluded)[i]
    if (checklistOfAttributesIncluded[keyName] === false) productObjectMissingAttributes.push(keyName)
  }

  for (let i = 0; i < Object.keys(checklistOfAttributesCorrectTypes).length; i++) {
    const keyName = Object.keys(checklistOfAttributesCorrectTypes)[i]
    if (checklistOfAttributesCorrectTypes[keyName] === false) productObjectIncorrectTypesAttributes.push(keyName)
  }

  return { productObjectMissingAttributes, productObjectIncorrectTypesAttributes }
}

function validateDataToShowModal() {
  const parentElement = document.querySelector('#guatapay-payment-button-container')
  if (parentElement.getElementsByClassName('form-error-message').length > 0) parentElement.removeChild(document.querySelector('.form-error-message'))

  if (typeof guatapayPaymentData !== 'object') {
    const childElement = utilsService.createElementWithClass('div', 'form-error-message')
    childElement.innerHTML = 'Por favor crear los datos del pago como se indica en la documentación.'

    utilsService.insertChildAtIndex(parentElement, childElement, 'last')
    return
  }

  const { paymentObjectMissingAttributes, paymentObjectIncorrectTypesAttributes } = validatePaymentObject(guatapayPaymentData)

  if (paymentObjectMissingAttributes.length > 0) {
    const childElement = utilsService.createElementWithClass('div', 'form-error-message')
    childElement.innerHTML = `En el objeto del pago enviado hacen falta los siguientes atributos: "${paymentObjectMissingAttributes.join('", "')}". Por favor revisa la documentación.`

    utilsService.insertChildAtIndex(parentElement, childElement, 'last')
    return
  }

  if (paymentObjectIncorrectTypesAttributes.length > 0) {
    const childElement = utilsService.createElementWithClass('div', 'form-error-message')
    childElement.innerHTML = `Los siguientes atributos del pago no tienen el tipo de dato requerido: "${paymentObjectIncorrectTypesAttributes.join('", "')}". Por favor revisa la documentación.`

    utilsService.insertChildAtIndex(parentElement, childElement, 'last')
    return
  }

  if (guatapayPaymentData.productsToPay.length > 0) {
    let calculatedTotalAmount = 0
    let allProductsDataValid = true

    for (let i = 0; i < guatapayPaymentData.productsToPay.length; i++) {
      const productDataToValidate = guatapayPaymentData.productsToPay[i]

      if (typeof productDataToValidate !== 'object') {
        const childElement = utilsService.createElementWithClass('div', 'form-error-message')
        childElement.innerHTML = `Los datos del producto No. ${i + 1} no están bien enviados. Por favor revisa la documentación.`
        utilsService.insertChildAtIndex(parentElement, childElement, 'last')

        allProductsDataValid = false
        break
      }

      const { productObjectMissingAttributes, productObjectIncorrectTypesAttributes } = validateProductObject(productDataToValidate)

      if (productObjectMissingAttributes.length > 0) {
        const childElement = utilsService.createElementWithClass('div', 'form-error-message')
        childElement.innerHTML = `Al producto No. ${i + 1} le hacen falta los siguientes atributos: "${productObjectMissingAttributes.join('", "')}". Por favor revisa la documentación.`

        utilsService.insertChildAtIndex(parentElement, childElement, 'last')
        allProductsDataValid = false
        break
      }

      if (productObjectIncorrectTypesAttributes.length > 0) {
        const childElement = utilsService.createElementWithClass('div', 'form-error-message')
        childElement.innerHTML = `Los atributos: "${productObjectIncorrectTypesAttributes.join('", "')}" del producto No. ${i + 1} no tienen el tipo de dato requerido. Por favor revisa la documentación.`

        utilsService.insertChildAtIndex(parentElement, childElement, 'last')
        allProductsDataValid = false
        break
      }

      const totalGrossAmountByProduct = productDataToValidate.quantity * productDataToValidate.unitPrice
      const totalAmountByProductWithDiscount = totalGrossAmountByProduct - (totalGrossAmountByProduct * productDataToValidate.discount) / 100
      const totalAmountByProductWithTaxes = totalAmountByProductWithDiscount + (totalAmountByProductWithDiscount * productDataToValidate.tax) / 100
      calculatedTotalAmount += totalAmountByProductWithTaxes
    }

    if (allProductsDataValid === false) return

    if (Number(Math.ceil(guatapayPaymentData.total)) !== Number(Math.ceil(calculatedTotalAmount))) {
      const childElement = utilsService.createElementWithClass('div', 'form-error-message')
      childElement.innerHTML = `La suma del valor total de los productos ($${utilsService.numberWithCommas(
        Number(calculatedTotalAmount)
      )}) no coincide con el valor de la compra total enviada ($${utilsService.numberWithCommas(Number(guatapayPaymentData.total))}). Por favor revisa los datos enviados.`

      utilsService.insertChildAtIndex(parentElement, childElement, 'last')
      return
    }
  }

  if (Number(Math.ceil(guatapayPaymentData.total)) < 10000) {
    const childElement = utilsService.createElementWithClass('div', 'form-error-message')
    childElement.innerHTML = 'El valor mínimo de transacción COP-BTC es de $ 10,000 COP. Por favor revisa la documentación.'

    utilsService.insertChildAtIndex(parentElement, childElement, 'last')
    return
  }

  window.sessionStorage.setItem('guatapayPaymentData', JSON.stringify(guatapayPaymentData))
  modalService.showModal(guatapayPaymentData)

  /* const modalObject = {
    total: modalData.total,
    currency: modalData.currency,
    onSuccess() {
      console.log('onSuccess');
    },
    onFailure() {
      console.log('onFailure');
    },
    onCancel() {
      console.log('onCancel');
    },
    onQuotation: async (currency) => {
      console.log('currency', currency)
      const quotation = await generateQuotation(currency, modalData.total);
      console.log('quotation', quotation.buyerFees)
      const { crypto, fiat } = quotation;
      const feeExpressedInFiat = quotation.buyerFees.filter((feeData) => feeData.currency === modalData.currency.toLowerCase())
      const feeExpressedInCrypto = quotation.buyerFees.filter((feeData) => feeData.currency === currency.toLowerCase())

      return {
        crypto: {
          amount: crypto.amount,
          // fee: crypto.fee,
          fee: feeExpressedInCrypto
        },
        fiat: {
          amount: fiat.amount,
          // fee: fiat.fee,
          fee: feeExpressedInFiat
        },
      };
    },
    onPayment: async (payment) => {
      console.log('Payment', payment);
      const quotation = await generateQuotation(currency);

      return {
        qrString: 'bitcoin:1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2?amount=0.0001',
        paymentId: '642d6d8c47b735aad4170b2e',
        ...quotation,
      };
    },
  };

  console.log('guatapayPaymentData', guatapayPaymentData) */
}

export default {
  displayButton
}
