import utilsService from '../services/utils.service';
import loadingSpinner from '../img/loading-spinner.png';

function createProcessing() {
  const processingDiv = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  processingDiv.id = 'step-PROCESSING';

  processingDiv.innerHTML = `
    <p class="font-bold text-lg">Procesando...</p>
    <p class="text-lg"> Aguarda un momento por favor.</p>

    <div class="flex-ic-jc mt-32">
      <img src="${loadingSpinner}" alt="loading" id="loading-spinner" />
    </div>
    `;

  return processingDiv;
}

export default {
  createProcessing,
};
