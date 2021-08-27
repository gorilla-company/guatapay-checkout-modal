import svgHourglass from '../img/hourglass-icon.svg';
import {createElementWithClass} from '../services/build-html.service'

function createLoading() {
    const step = createElementWithClass('div', 'modal-body-wrapper');
    // step.classList.add('hide');
    const section = createElementWithClass("section", "modal-wrapper");
    section.id = 'loading-section';

    step.id = 'step-LOADING';
  
    const title = createElementWithClass('p', 'paragraph');
    const titleInvisible = createElementWithClass('p', 'paragraph');
    // title.style = 'font-family: Arial';
    title.classList.add('loading-paragraph');
    title.innerHTML = 'Cargando';
    titleInvisible.innerHTML = '.';    
    titleInvisible.style = 'visibility: hidden';

    step.appendChild(title);
    step.appendChild(titleInvisible);
    section.appendChild(step);
    return section;
  }

  export {
    createLoading
  }