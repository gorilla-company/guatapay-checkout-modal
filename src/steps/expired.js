import svgExpired from '../img/expired.svg';
import utilsService from '../services/utils.service';

function createStepExpired(refreshQr, cancelModal) {
  const step = utilsService.createElementWithClass('div', 'modal-body-wrapper');
  step.classList.add('hide');
  step.id = 'step-EXPIRED';
  const stepTitle = utilsService.createElementWithClass('p', 'subtitle');
  stepTitle.innerHTML = 'C\u00F3digo QR Expirado';

  const stepImg = utilsService.createElementWithClass('div', 'svg-icon');

  const imgExpired = document.createElement('img');
  imgExpired.id = 'img-expired';
  imgExpired.src = svgExpired;
  imgExpired.alt = 'expired';
  stepImg.appendChild(imgExpired);

  const stepTextUpper = document.createElement('p');
  stepTextUpper.innerHTML = 'Por favor gener\u00E1 un nuevo QR';
  const stepTextLower = document.createElement('p');
  stepTextLower.innerHTML = 'para poder pagar.';

  const stepButton = document.createElement('button');
  stepButton.classList.add('modo-btn-primary');
  stepButton.classList.add('mt-75');
  stepButton.classList.add('refresh-button');
  stepButton.innerHTML = 'Generar nuevo QR';
  stepButton.onclick = () => refreshQr();

  const cancelButton = utilsService.createElementWithClass('button', 'modo-btn-link');
  cancelButton.innerHTML = 'Cancelar';
  cancelButton.onclick = () => cancelModal();

  step.appendChild(stepTitle);
  step.appendChild(stepImg);
  step.appendChild(stepTextUpper);
  step.appendChild(stepTextLower);
  step.appendChild(stepButton);
  step.appendChild(cancelButton);

  return step;
}

export {
  createStepExpired,
};
