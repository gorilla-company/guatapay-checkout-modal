import successImage from '../img/success-icon.svg'
import utilsService from '../services/utils.service'

function createSuccess() {
  const stepSuccess = utilsService.createElementWithClass('div', 'modal-body-wrapper hide')
  stepSuccess.id = 'step-SUCCESS'

  stepSuccess.innerHTML = `
    <p class="subtitle font-bold">¡Pago exitoso!</p>
    <p class="subtitle">Tu pago ha sido procesado exitosamente ¡Muchas gracias por tu compra!</p>
    <img src="${successImage}" alt="logo" class="mb-32" />
    <button id="btn-success-continue" class="guatapay-btn-primary">Resumen de compra</button>
    <button id="btn-success-finish" class="guatapay-btn-ghost">Finalizar</button>
  `

  // Add event listener to continue button
  const continueButton = stepSuccess.querySelector('#btn-success-continue')
  continueButton.addEventListener('click', () => {
    window.setModalStatus('SUMMARY')
  })

  // Add event listener to finish button
  const finishButton = stepSuccess.querySelector('#btn-success-finish')
  finishButton.addEventListener('click', () => {
    window.closeModal()
  })

  return stepSuccess
}

export default {
  createSuccess
}
