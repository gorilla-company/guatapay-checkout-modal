import svgImage from '../img/step0.svg';
import utilsService from '../services/utils.service';

function createStart() {
  const stepStart = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper'
  );
  stepStart.id = 'step-START';

  stepStart.innerHTML = `
    <img src="${svgImage}" alt="logo" />
    <p class="subtitle">¡Gracias por elegir Guatapay! A continuación te guiaremos a través de 3 sencillos pasos para que puedas realizar tu compra usando tus criptomonedas!</p>
    <div class="checkbox-wrapper">
      <input type="checkbox" id="checkbox" name="checkbox" value="checkbox">
      <label for="checkbox">He leído y acepto los <a href="#">Términos y Condiciones</a> y <a href="#">Política de Privacidad</a></label>
    </div>
    <div class="callout">Recuerda que si devuelves el producto, el reembolso será por el mismo valor de tu compra en tu moneda local</div>
    <button disabled id="start-continue" class="guatapay-btn-primary">Continuar</button>
  `;

  // Add event listener to terms and conditions link
  const termsLink = stepStart.querySelectorAll('a[href="#"]');
  termsLink.forEach((link) => {
    link.addEventListener('click', () => {
      window.setModalStatus('TERMS');
    });
  });

  const continueButton = stepStart.querySelector('#start-continue');
  continueButton.addEventListener('click', async () => {
    const checkbox = stepStart.querySelector('#checkbox');
    if (!checkbox.checked) {
      window.setModalStatus('TERMS');
    } else {
      await window.setModalStatus('QUOTATION');
    }
  });

  // Add event listener to checkbox to enable continue button or disable continue button
  const checkbox = stepStart.querySelector('#checkbox');
  checkbox.addEventListener('change', () => {
    continueButton.disabled = !checkbox.checked;
  });

  return stepStart;
}

export default {
  createStart,
};
