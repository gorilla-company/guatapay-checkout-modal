import svgHourglass from '../img/hourglass-icon.svg';
import {createElementWithClass} from '../services/build-html.service'

function createLoading() {
    const step = createElementWithClass('div', 'modal-body-wrapper');
    // step.classList.add('hide');
    step.id = 'step-LOADING';
  
    const title = createElementWithClass('p', 'paragraph');
    title.innerHTML = 'Cargando';
  
    const divLoading = document.createElement('div');
    divLoading.classList.add('svg-icon');
    divLoading.classList.add('rotate');
  
    const imgLoading = document.createElement('img');
    imgLoading.id = 'img-loading-loader';
    imgLoading.src = svgHourglass;
    imgLoading.alt= "loading"
    divLoading.appendChild(imgLoading);
    
    step.appendChild(title);
    step.appendChild(divLoading);
    return step;
  }

  export {
    createLoading
  }