import utilsService from '../services/utils.service';
import copyIcon from '../img/copy-icon.svg';

function createSummary(finalize) {
  const summaryDiv = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  summaryDiv.id = 'step-SUMMARY';

  summaryDiv.innerHTML = `
    <p class="text-lg mb-16">Resumen de tu compra:</p>

    <div class="summary-wrapper mt-16">
      <div id="transaction-id-wrapper">
        <p class="text-gray-200">Id de Transacción</p>
        <div class="flex-ic-jb">
          <p class="text-gray-400">123456789</p>
          <img src="${copyIcon}" alt="copy" />  
        </div>
      </div>

      <div id="details-wrapper" class="mt-16">
        <div class="details-item mb-16">
          <div class="flex-ic-jb">
            <p>Subtotal:</p>
            <p>$100.000</p>
          </div>
          <p class="text-right text-gray-200">0.60 BTC</p>
        </div>
        <div class="details-item mb-16">
          <div class="flex-ic-jb">
            <p>IVA 19%</p>
            <p>$100.000</p>
          </div>
          <p class="text-right text-gray-200">0.60 BTC</p>
        </div>
        
        <div class="details-item mb-16">
          <div class="flex-ic-jb">
            <p class="font-bold">Total</p>
            <p class="font-bold">$100.000</p>
          </div>
          <p class="text-right text-gray-200">0.60 BTC</p>
        </div>        
      </div>
    </div>

    <button class="guatapay-btn-ghost mt-32" id="btn-summary-finish">Finalizar</button>
    `;

  // Add event listener to update button
  const finishButton = summaryDiv.querySelector('#btn-summary-finish');
  finishButton.addEventListener('click', () => {
    finalize();
  });

  return summaryDiv;
}

export default {
  createSummary,
};
