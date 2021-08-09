import {createElementWithClass} from '../services/build-html.service'

function createNavBar() {
    const navBar = createElementWithClass('nav', 'wizard');
    const step1Ball = createElementWithClass('div', 'modal-nav-ball');
    step1Ball.classList.add('modal-nav-ball-selected');
    step1Ball.id = 'selected-step';
    const step2Ball = createElementWithClass('div', 'modal-nav-ball');
    const step3Ball = createElementWithClass('div', 'modal-nav-ball');
    const step4Ball = createElementWithClass('div', 'modal-nav-ball');
    const step5Ball = createElementWithClass('div', 'modal-nav-ball');
    navBar.appendChild(step1Ball);
    navBar.appendChild(step2Ball);
    navBar.appendChild(step3Ball);
    navBar.appendChild(step4Ball);
    navBar.appendChild(step5Ball);
  
    return navBar;
  }

  export {
      createNavBar
  }