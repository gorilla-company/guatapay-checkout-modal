import svgImage from '../img/validating.svg';
import utilsService from '../services/utils.service';

function createValidating() {
  const stepValidating = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  stepValidating.id = 'step-VALIDATING';

  stepValidating.innerHTML = `
      <p class="subtitle font-medium">¡En validación!</p>
    <p class="subtitle">Estamos procesamos tu pago. Realizaremos una validación y te confirmaremos en la brevedad.</p>
    <img src="${svgImage}" alt="logo" class="mb-32" />
   
    <button id="btn-validating-continue" class="guatapay-btn-primary">Resumen de compra</button>
    <button id="btn-validating-finish" class="guatapay-btn-ghost">Finalizar</button>
    `;

  // Add event listener to continue button
  const continueButton = stepValidating.querySelector(
    '#btn-validating-continue'
  );
  continueButton.addEventListener('click', () => {
    window.setModalStatus('SUMMARY');
  });

  // Add event listener to finish button
  const finishButton = stepValidating.querySelector('#btn-validating-finish');
  finishButton.addEventListener('click', () => {
    alert('Finish');
  });

  return stepValidating;
}

export default {
  createValidating,
};
