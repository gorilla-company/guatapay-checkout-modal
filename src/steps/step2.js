import svgHourglass from '../img/hourglass-icon.svg';
import {createElementWithClass} from '../services/build-html.service'

function createStep2() {
    const step2Div = createElementWithClass('div', 'modal-body-wrapper');
    step2Div.classList.add('hide');
    step2Div.id = 'step-PROCESSING';
  
    const step2Title = createElementWithClass('p', 'paragraph');
    step2Title.innerHTML = 'Estamos esperando confirmaci\u00F3n';
  
    const divLoading = document.createElement('div');
    divLoading.classList.add('svg-icon');
    divLoading.classList.add('rotate');
  
    const imgLoading = document.createElement('img');
    imgLoading.id = 'img-loading';
    imgLoading.src = svgHourglass;
    imgLoading.alt= "loading"
    divLoading.appendChild(imgLoading);
  
    const step2Text = document.createElement('p');
    step2Text.innerHTML = 'Eleg\u00ED el medio de pago y confirm\u00E1 la transacci\u00F3n';
    step2Div.appendChild(step2Text);
  
    step2Div.appendChild(divLoading);
    step2Div.appendChild(step2Title);

    return step2Div;
  }

  export {
      createStep2
  }