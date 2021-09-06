import svgCheck from '../img/check.svg';
import utilsService from '../services/utils.service';

function createStep4(finalize) {
  const step = utilsService.createElementWithClass('div', 'modal-body-wrapper');
  step.classList.add('hide');
  step.id = 'step-PAYMENT_READY';

  const stepTitle = utilsService.createElementWithClass('p', 'subtitle');
  stepTitle.innerHTML = '\u00A1Listo!';
  const divImg = utilsService.createElementWithClass('div', 'svg-icon');

  const imgCheck = document.createElement('img');
  imgCheck.id = 'img-check';
  imgCheck.src = svgCheck;
  imgCheck.alt = 'ok';
  divImg.appendChild(imgCheck);

  const continueButton = utilsService.createElementWithClass('button', 'modo-btn-primary');
  continueButton.innerHTML = 'Continuar';
  continueButton.onclick = () => finalize();

  step.appendChild(stepTitle);
  step.appendChild(divImg);
  step.appendChild(continueButton);

  return step;
}

export {
  createStep4,
};
