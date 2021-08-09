
import svgSpinner from '../img/spinner.svg';
import {createElementWithClass} from '../services/build-html.service'

function createStep3() {
    const step3Div = createElementWithClass('div', 'modal-body-wrapper');
    step3Div.classList.add('hide');
    step3Div.id = 'step-PAYING';
  
    const step3Text = createElementWithClass('p', 'subtitle');
    step3Text.innerHTML = 'Pago en proceso';
  
    const divLoadingStep3 = document.createElement('div');
    divLoadingStep3.classList.add('svg-icon');
    divLoadingStep3.classList.add('spin');
  
    divLoadingStep3.innerHTML = '<img src={img} alt="loading">'.replace('{img}', svgSpinner);
  
    const step3TextUpper = document.createElement('p');
    step3TextUpper.innerHTML = 'Estamos procesando tu pago,';
  
    const step3TextLower = document.createElement('p');
    step3TextLower.innerHTML = 'te pedimos aguardar, puede demorar unos segundos.';
  
    step3Div.appendChild(step3Text);
    step3Div.appendChild(divLoadingStep3);
    step3Div.appendChild(step3TextUpper);
    step3Div.appendChild(step3TextLower);
    return step3Div;
  }

  export {
      createStep3
  }