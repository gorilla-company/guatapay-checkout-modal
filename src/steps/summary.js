import utilsService from '../services/utils.service';

function createSummary() {
  const summaryDiv = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  summaryDiv.id = 'step-SUMMARY';

  summaryDiv.innerHTML = `
    <p class="font-bold">Resumen de tu compra:</p>
    
    <button class="guatapay-btn-ghost mt-32" id="btn-summary-finish">Finalizar</button>
    `;

  // Add event listener to update button
  const updateButton = summaryDiv.querySelector('#btn-summary-finish');
  updateButton.addEventListener('click', () => {
    console.log('finish button clicked');
  });

  return summaryDiv;
}

export default {
  createSummary,
};
