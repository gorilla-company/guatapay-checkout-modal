import utilsService from '../services/utils.service';

function createNavBar() {
  const navBar = utilsService.createElementWithClass('nav', 'wizard hide');
  navBar.id = 'step-indicator';
  const step1Ball = utilsService.createElementWithClass(
    'div',
    'modal-nav-ball active'
  );
  const step2Ball = utilsService.createElementWithClass(
    'div',
    'modal-nav-ball'
  );
  const step3Ball = utilsService.createElementWithClass(
    'div',
    'modal-nav-ball'
  );
  step1Ball.id = 'step1Ball';
  step2Ball.id = 'step2Ball';
  step3Ball.id = 'step3Ball';

  navBar.appendChild(step1Ball);
  navBar.appendChild(step2Ball);
  navBar.appendChild(step3Ball);

  return navBar;
}

const setStepIndicator = (step) => {
  switch (step) {
    case 'QUOTATION':
      document.getElementById('step1Ball').classList.add('active');
      document.getElementById('step2Ball').classList.remove('active');
      document.getElementById('step3Ball').classList.remove('active');
      break;
    case 'SCANNING':
    case 'EXPIRED':
      document.getElementById('step1Ball').classList.remove('active');
      document.getElementById('step1Ball').classList.add('done');
      document.getElementById('step2Ball').classList.add('active');
      break;
    default:
      break;
  }
};

export default {
  createNavBar,
  setStepIndicator,
};
