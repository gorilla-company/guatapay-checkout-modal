import playStoreImage from '../img/play-store.svg'
import pasteIcon from '../img/input-paste-icon.svg'
import appleStoreImage from '../img/apple-store.svg'
import utilsService from '../services/utils.service'
import cancelIcon from '../img/input-cancel-icon.svg'
import loadingSpinner from '../img/loading-spinner.png'
import serverRequestsService from '../services/server-requests.service'

function handlePasteTxIdText() {
  navigator.clipboard.readText().then(
    (cliptext) => {
      document.getElementById('guatapay-input-txid').value = cliptext
      const pasteTxIdButton = document.querySelector('#btn-paste-tx-id')
      const parentElement = document.querySelector('#guatapay-input-container')
      pasteTxIdButton.removeEventListener('click', handlePasteTxIdText)
      parentElement.removeChild(parentElement.querySelector('#btn-paste-tx-id'))

      const childElement = utilsService.createElementWithId('button', 'btn-cancel-tx-id')
      childElement.innerHTML = `<img src="${cancelIcon}" alt="cancel" />`
      childElement.addEventListener('click', handleCancelTxIdText)

      utilsService.insertChildAtIndex(parentElement, childElement, 1)
    },
    (err) => console.log(err)
  )
}

function handleCancelTxIdText() {
  document.getElementById('guatapay-input-txid').value = ''

  const parentElement = document.querySelector('#guatapay-input-container')
  const cancelTxIdButton = document.querySelector('#btn-cancel-tx-id')
  cancelTxIdButton.removeEventListener('click', handleCancelTxIdText)
  parentElement.removeChild(parentElement.querySelector('#btn-cancel-tx-id'))

  const childElement = utilsService.createElementWithId('button', 'btn-paste-tx-id')
  childElement.innerHTML = `<img src="${pasteIcon}" alt="paste" />`
  childElement.addEventListener('click', handlePasteTxIdText)

  utilsService.insertChildAtIndex(parentElement, childElement, 1)
}

async function handleCheckTransactionId() {
  const transactionDataById = await serverRequestsService.checkTransactionId(document.getElementById('guatapay-input-txid').value)

  if (transactionDataById.error) {
    handleDisplayRequestError()
    return
  }

  if (transactionDataById.txStatus === 'pending' || transactionDataById.txStatus === 'validating') {
    window.setModalStatus('VALIDATING')
  }

  if (transactionDataById.txStatus === 'confirmed') {
    window.setModalStatus('SUCCESS')
  }
}

function handleDisplayRequestError() {
  const firstParentElement = document.querySelector('#step-INSERT_TXID')
  firstParentElement.removeChild(firstParentElement.querySelector('#guatapay-loader-container'))

  const secondParentElement = document.querySelector('#guatapay-input-container')
  const firstChildElement = utilsService.createElementWithId('button', 'btn-cancel-tx-id')
  firstChildElement.innerHTML = `<img src="${cancelIcon}" alt="cancel" />`
  firstChildElement.addEventListener('click', handleCancelTxIdText)

  utilsService.insertChildAtIndex(secondParentElement, firstChildElement, 1)

  document.getElementById('guatapay-input-txid').classList.add('guatapay-input-error')
  const thirdParentElement = document.querySelector('#guatapay-full-input-container')
  const secondChildElement = utilsService.createElementWithId('div', 'guatapay-input-error-container')
  secondChildElement.innerHTML = 'El ID ingresado es incorrecto. Por favor verifica y vuelve a intentar.'

  utilsService.insertChildAtIndex(thirdParentElement, secondChildElement, 1)

  const createFirstChildElement = utilsService.createElementWithClass('div', 'guatapay-ad-container')
  createFirstChildElement.id = 'insert-taxid-ad-container'
  createFirstChildElement.innerHTML = `
    <div class="guatapay-ad">
      <div class="guatapay-ad-text">
        Evita este paso la próxima vez utilizando Guatapay wallet.
      </div>
      <div class="guatapay-ad-stores">
        <div style="margin-right: 10px;">
          <img src="${playStoreImage}" alt="play-store" />
        </div>
        <div style="margin-left: 10px;">
          <img src="${appleStoreImage}" alt="apple-store" />
        </div>
      </div>
    </div>
  `

  utilsService.insertChildAtIndex(firstParentElement, createFirstChildElement, 3)

  const createButtonChildElement = utilsService.createElementWithClass('button', 'guatapay-btn-primary')
  createButtonChildElement.id = 'btn-insert-txid-review'
  createButtonChildElement.innerHTML = 'Hecho'

  utilsService.insertChildAtIndex(firstParentElement, createButtonChildElement, 4)
  const reviewTxIdButton = document.querySelector('#btn-insert-txid-review')
  reviewTxIdButton.addEventListener('click', showRefreshLoaderElement)

  const txIdInputButton = document.querySelector('#guatapay-input-txid')
  txIdInputButton.disabled = false
}

function showRefreshLoaderElement() {
  if (document.getElementById('guatapay-input-txid').value === '') {
    document.getElementById('guatapay-input-txid').classList.add('guatapay-input-error')

    const parentElement = document.querySelector('#guatapay-full-input-container')
    if (document.getElementById('guatapay-input-error-container')) parentElement.removeChild(parentElement.querySelector('#guatapay-input-error-container'))
    const childElement = utilsService.createElementWithId('div', 'guatapay-input-error-container')
    childElement.innerHTML = 'Por favor ingresa el ID de la transacción.'

    utilsService.insertChildAtIndex(parentElement, childElement, 1)
    return
  } else {
    const firstParentElement = document.querySelector('#guatapay-full-input-container')
    if (document.getElementById('guatapay-input-error-container')) firstParentElement.removeChild(firstParentElement.querySelector('#guatapay-input-error-container'))

    const secondParentElement = document.querySelector('#guatapay-input-container')
    if (document.getElementById('btn-paste-tx-id')) secondParentElement.removeChild(secondParentElement.querySelector('#btn-paste-tx-id'))
    if (document.getElementById('btn-cancel-tx-id')) secondParentElement.removeChild(secondParentElement.querySelector('#btn-cancel-tx-id'))

    document.getElementById('guatapay-input-txid').classList.remove('guatapay-input-error')
  }

  const reviewTxIdButton = document.querySelector('#btn-insert-txid-review')
  reviewTxIdButton.removeEventListener('click', showRefreshLoaderElement)

  const parentElement = document.querySelector('#step-INSERT_TXID')
  parentElement.removeChild(parentElement.querySelector('#insert-taxid-ad-container'))
  parentElement.removeChild(parentElement.querySelector('#btn-insert-txid-review'))

  const childElement = utilsService.createElementWithId('div', 'guatapay-loader-container')
  childElement.innerHTML = `
    <p class="font-bold text-lg loading-small-text">Revisando ID de la transacción...</p>
    <img src="${loadingSpinner}" alt="loading" id="loading-spinner-small" />
  `

  utilsService.insertChildAtIndex(parentElement, childElement, 3)
  const txIdInputButton = document.querySelector('#guatapay-input-txid')
  txIdInputButton.disabled = true
  handleCheckTransactionId()
}

function createInsertTxid() {
  const stepInsertTxid = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  stepInsertTxid.id = 'step-INSERT_TXID'

  stepInsertTxid.innerHTML = `
    <p class="subtitle font-bold">Ingresa el ID de transacción</p>
    <p class="subtitle">Para que podamos validar tu pago, por favor ingresa el ID de la transacción: <br /> <span style="font-size: 12px">(En caso de ser un pago con Lightning Network, ingresa el hash de la factura):<span></p>
    <div class="guatapay-full-input-container" id="guatapay-full-input-container">
      <div class="guatapay-input-container" id="guatapay-input-container">
        <input placeholder="ID de transacción" id="guatapay-input-txid" class="guatapay-input" type="text" />
        <button id="btn-paste-tx-id">
          <img src="${pasteIcon}" alt="paste" />
        </button>
      </div>
    </div>
    <div class="guatapay-ad-container" id="insert-taxid-ad-container">
      <div class="guatapay-ad">
        <div class="guatapay-ad-text">
          Evita este paso la próxima vez utilizando Guatapay wallet.
        </div>
        <div class="guatapay-ad-stores">
          <div style="margin-right: 10px;">
            <img src="${playStoreImage}" alt="play-store" />
          </div>
          <div style="margin-left: 10px;">
            <img src="${appleStoreImage}" alt="apple-store" />
          </div>
        </div>
      </div>
    </div>
    <button id="btn-insert-txid-review" class="guatapay-btn-primary">Hecho</button>
  `

  // Add event listener to continue button
  const reviewTxIdButton = stepInsertTxid.querySelector('#btn-insert-txid-review')
  reviewTxIdButton.addEventListener('click', showRefreshLoaderElement)

  const pasteTxIdButton = stepInsertTxid.querySelector('#btn-paste-tx-id')
  pasteTxIdButton.addEventListener('click', handlePasteTxIdText)

  const guatapayTxidInput = stepInsertTxid.querySelector('#guatapay-input-txid')
  guatapayTxidInput.addEventListener('input', (event) => {
    if (event.target.value !== '' && document.getElementById('btn-paste-tx-id')) {
      const parentElement = document.querySelector('#guatapay-input-container')
      pasteTxIdButton.removeEventListener('click', handlePasteTxIdText)
      parentElement.removeChild(parentElement.querySelector('#btn-paste-tx-id'))

      const childElement = utilsService.createElementWithId('button', 'btn-cancel-tx-id')
      childElement.innerHTML = `<img src="${cancelIcon}" alt="cancel" />`
      childElement.addEventListener('click', handleCancelTxIdText)

      utilsService.insertChildAtIndex(parentElement, childElement, 1)
    }

    if (event.target.value === '' && document.getElementById('btn-cancel-tx-id')) {
      const parentElement = document.querySelector('#guatapay-input-container')
      const cancelTxIdButton = stepInsertTxid.querySelector('#btn-cancel-tx-id')
      cancelTxIdButton.removeEventListener('click', handleCancelTxIdText)
      parentElement.removeChild(parentElement.querySelector('#btn-cancel-tx-id'))

      const childElement = utilsService.createElementWithId('button', 'btn-paste-tx-id')
      childElement.innerHTML = `<img src="${pasteIcon}" alt="paste" />`
      childElement.addEventListener('click', handlePasteTxIdText)

      utilsService.insertChildAtIndex(parentElement, childElement, 1)
    }
  })

  return stepInsertTxid
}

export default {
  createInsertTxid
}
