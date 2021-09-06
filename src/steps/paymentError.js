import svgError from '../img/error.svg';
import utilsService from '../services/utils.service';

function createStepPaymentError(refreshQrFnc, cancelModal) {
  const step = utilsService.createElementWithClass('div', 'modal-body-wrapper');
  step.classList.add('hide');
  step.id = 'step-PAYMENT_DENIED';

  const stepTitle = utilsService.createElementWithClass('p', 'subtitle');
  stepTitle.innerHTML = 'Pago denegado';

  const stepImg = utilsService.createElementWithClass('div', 'svg-icon');
  const imgError = document.createElement('img');
  imgError.id = 'img-error';
  imgError.src = svgError;
  imgError.alt = 'error';
  stepImg.appendChild(imgError);

  const stepTextUpper = document.createElement('p');
  stepTextUpper.innerHTML = '<b>Lo sentimos, tu pago fue denegado</b>';
  const stepTextMiddle = document.createElement('p');
  stepTextMiddle.innerHTML = 'Por favor gener\u00E1 un nuevo QR';
  const stepTextLower = document.createElement('p');
  stepTextLower.innerHTML = 'Para volver a intentar';

  const stepButtonRefresh = document.createElement('button');
  stepButtonRefresh.classList.add('modo-btn-primary');
  stepButtonRefresh.classList.add('mt-55');
  stepButtonRefresh.classList.add('refresh-button');
  stepButtonRefresh.innerHTML = 'Generar nuevo QR';
  stepButtonRefresh.onclick = () => refreshQrFnc();

  const cancelButton = utilsService.createElementWithClass('button', 'modo-btn-link');
  cancelButton.innerHTML = 'Cancelar';
  cancelButton.onclick = () => cancelModal();

  step.appendChild(stepTitle);
  step.appendChild(stepImg);
  step.appendChild(stepTextUpper);
  step.appendChild(stepTextMiddle);
  step.appendChild(stepTextLower);
  step.appendChild(stepButtonRefresh);
  step.appendChild(cancelButton);

  return step;
}

export {
  createStepPaymentError,
};
