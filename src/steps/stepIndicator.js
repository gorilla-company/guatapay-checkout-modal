import utilsService from '../services/utils.service';

function createNavBar() {
  const navBar = utilsService.createElementWithClass('nav', 'wizard');
  const step1Ball = utilsService.createElementWithClass('div', 'modal-nav-ball');
  const step2Ball = utilsService.createElementWithClass('div', 'modal-nav-ball');
  const step3Ball = utilsService.createElementWithClass('div', 'modal-nav-ball');
  const step4Ball = utilsService.createElementWithClass('div', 'modal-nav-ball');
  const step5Ball = utilsService.createElementWithClass('div', 'modal-nav-ball');
  step1Ball.id = 'step1Ball';
  step2Ball.id = 'step2Ball';
  step3Ball.id = 'step3Ball';
  step4Ball.id = 'step4Ball';
  step5Ball.id = 'step5Ball';

  navBar.appendChild(step1Ball);
  navBar.appendChild(step2Ball);
  navBar.appendChild(step3Ball);
  navBar.appendChild(step4Ball);
  navBar.appendChild(step5Ball);

  return navBar;
}

export default {
  createNavBar,
};
