function createElementWithClass(elementName, className) {
  const element = document.createElement(elementName)
  element.className = className
  return element
}

function createElementWithId(elementName, id) {
  const element = document.createElement(elementName)
  element.id = id
  return element
}

function numberWithCommas(numberToCast) {
  const partsOfNumber = numberToCast.toString().split('.')
  partsOfNumber[0] = partsOfNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return partsOfNumber.join('.')
}

function copyToClipboard(str) {
  const el = document.createElement('textarea') // Create a temporary textarea element
  el.value = str // Set the value of the textarea to the string
  el.setAttribute('readonly', '') // Make the textarea readonly
  el.style.position = 'absolute' // Position the textarea off-screen
  el.style.left = '-9999px'
  document.body.appendChild(el) // Append the textarea to the document body
  el.select() // Select the contents of the textarea
  document.execCommand('copy') // Copy the selected text to the clipboard
  document.body.removeChild(el) // Remove the temporary textarea from the document body
}

function insertChildAtIndex(parent, child, index) {
  if (!index) index = 0
  if (index === 'last') index = parent.children.length
  if (index >= parent.children.length) {
    parent.appendChild(child)
  } else {
    parent.insertBefore(child, parent.children[index])
  }
}

function extractFeesFromQuotation(quotationData) {
  let indexOfCryptoFeeData,
    indexOfFiatFeeData = 0

  quotationData.buyerFees.map((feeData, index) => {
    if (Object.keys(feeData).includes('expressedInFiat')) {
      indexOfFiatFeeData = index
    } else if (Object.keys(feeData).includes('expressedInCrypto')) {
      indexOfCryptoFeeData = index
    }
  })

  const fiatFeeData = quotationData.buyerFees[indexOfFiatFeeData].expressedInFiat
  const cryptoFeeData = quotationData.buyerFees[indexOfCryptoFeeData].expressedInCrypto

  return { fiatFeeData, cryptoFeeData }
}

export default {
  copyToClipboard,
  numberWithCommas,
  insertChildAtIndex,
  createElementWithId,
  createElementWithClass,
  extractFeesFromQuotation
}
