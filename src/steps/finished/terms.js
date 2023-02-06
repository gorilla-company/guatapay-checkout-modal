import utilsService from '../services/utils.service';

function createTerms() {
  const step1Div = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper'
  );
  step1Div.id = 'step-TERNS';

  step1Div.innerHTML = `
  <div class="terms-wrapper">
    <div class="terms-header">
      <h1>Terminos y Condiciones</h1>
      <p>Ultima actualización: 20 de Julio de 2021</p>
    </div>

    <div class="terms-item">
      <h4>1. Introducción</h4>
      <p>Estos Términos y Condiciones (en adelante, los “Términos y Condiciones”) regulan el uso de la plataforma Guatapay (en adelante, la “Plataforma”) y los servicios que se ofrecen a través de la misma (en adelante, los “Servicios”).</p>
    </div>
    <div class="terms-item">
      <h4>2. Definiciones</h4>
      <p>Para los efectos de estos Términos y Condiciones, se entenderá por:</p>
    </div>

    <div class="terms-header">
      <h1>Política de Privacidad</h1>
      <p>Ultima actualización: 20 de Julio de 2021</p>
    </div>
    <div class="terms-item">
      <h4>1. Introducción</h4>
      <p>Estos Términos y Condiciones (en adelante, los “Términos y Condiciones”) regulan el uso de la plataforma Guatapay (en adelante, la “Plataforma”) y los servicios que se ofrecen a través de la misma (en adelante, los “Servicios”).</p>
    </div>
    <div class="terms-item">
      <h4>2. Definiciones</h4>
      <p>Para los efectos de estos Términos y Condiciones, se entenderá por:</p>
    </div>
  </div>
  `;

  // Accept Button
  const acceptButton = document.createElement('button');
  acceptButton.classList.add('guatapay-btn-primary');
  acceptButton.innerHTML = 'Estoy de acuerdo';
  acceptButton.addEventListener('click', () => {
    alert('Estoy de acuerdo');
  });

  // Cancel Button
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('guatapay-btn-secondary');
  cancelButton.innerHTML = 'Cancelar';
  cancelButton.addEventListener('click', () => {
    alert('Cancelar');
  });

  // Buttons Wrapper (align left)
  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.classList.add('buttons-left-wrapper');
  buttonsWrapper.appendChild(cancelButton);
  buttonsWrapper.appendChild(acceptButton);

  step1Div.appendChild(buttonsWrapper);
  return step1Div;
}

export default {
  createTerms,
};
