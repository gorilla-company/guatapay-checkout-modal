import svgQuestion from '../img/question-icon.svg';
import qrLogo from '../img/qrLogo.png';
import utilsService from '../services/utils.service';

function createStep1() {
  const step1Div = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper'
  );
  step1Div.id = 'step-STARTED';

  return step1Div;
}

export default {
  createStep1,
};
