import svgImage from '../img/step0.svg';
import utilsService from '../services/utils.service';

function createStep1() {
  const step1Div = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper'
  );
  step1Div.id = 'step-STARTED';

  // Title
  const step1Title = utilsService.createElementWithClass('p', 'subtitle');
  step1Title.innerHTML =
    '¡Gracias por elegir Guatapay! A continuación te guiaremos a través de 3 sencillos pasos para que puedas realizar tu compra usando tus criptomonedas!';

  // Image
  const svgIllustration = document.createElement('img');
  svgIllustration.id = 'img-step1';
  svgIllustration.src = svgImage;
  svgIllustration.alt = 'logo';

  // Callout
  const callout = utilsService.createElementWithClass('div', 'callout');
  callout.innerHTML =
    'Recuerda que si devuelves el producto, el reembolso será por el valor del mismo en moneda local.';

  // Checkbox with right label
  const checkbox = utilsService.createElementWithClass('div', 'checkbox-wrapper');
  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';
  checkboxInput.id = 'checkbox';
  checkboxInput.name = 'checkbox';
  checkboxInput.value = 'checkbox';
  const checkboxLabel = document.createElement('label');
  checkboxLabel.htmlFor = 'checkbox';
  checkboxLabel.innerHTML =
    'He leido y acepto los <a href="#">Términos y Condiciones</a> y <a href="#">Política de Privacidad</a>';
  checkbox.appendChild(checkboxInput);
  checkbox.appendChild(checkboxLabel);

  // Button
  const button = document.createElement('button');
  button.classList.add('guatapay-btn-primary');
  button.innerHTML = 'Continuar';
  button.addEventListener('click', () => {
    alert('Continuar');
  });

  // Append elements
  step1Div.appendChild(svgIllustration);
  step1Div.appendChild(step1Title);
  step1Div.appendChild(checkbox);
  step1Div.appendChild(callout);
  step1Div.appendChild(button);

  return step1Div;
}

export default {
  createStep1,
};
