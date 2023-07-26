import svgImage from '../img/step0.svg'
import playStoreImage from '../img/play-store.svg'
import appleStoreImage from '../img/apple-store.svg'
import utilsService from '../services/utils.service'

function createStart() {
  const stepStart = utilsService.createElementWithClass('div', 'modal-body-wrapper')
  stepStart.id = 'step-START'

  stepStart.innerHTML = `
    <!--<img src="${svgImage}" alt="logo" />-->
    <p class="subtitle">¡Gracias por elegir Guatapay! A continuación te guiaremos a través de 3 sencillos pasos para que puedas realizar tu compra usando tus criptomonedas!</p>
    <div class="callout">Recuerda que si devuelves el producto, el reembolso será por el mismo valor de tu compra en tu moneda local</div>
    <div class="guatapay-ad-container">
      <div class="guatapay-ad">
        <div class="guatapay-ad-text">
          Para una experiencia de pago más rápida e intuitiva, utiliza Guatapay wallet.
        </div>
        <div class="guatapay-ad-stores">
          <div style="margin-right: 10px;">
            <img src="${playStoreImage}" alt="play-store" />
          </div>
          <div style="margin-left: 10px;">
            <img src="${appleStoreImage}" alt="apple-store" />
          </div>
        </div>
      </div>
    </div>
    <div class="checkbox-wrapper">
      <input type="checkbox" id="checkbox" name="checkbox" value="checkbox">
      <label for="checkbox">He leído y acepto los <a id="open-terms-n-conditions" href="#">Términos y Condiciones</a> y <a id="open-privacy-policy" href="#">Política de Privacidad</a></label>
    </div>
    <button disabled id="start-continue" class="guatapay-btn-primary">Continuar</button>
  `

  // Add event listener to terms and conditions link
  const termsLink = stepStart.querySelector('#open-terms-n-conditions')
  const privacyPolicyLink = stepStart.querySelector('#open-privacy-policy')
  termsLink.addEventListener('click', () => {
    window.setModalStatus('TERMS')
  })

  privacyPolicyLink.addEventListener('click', () => {
    window.setModalStatus('PRIVACY_POLICY')
  })

  const continueButton = stepStart.querySelector('#start-continue')
  continueButton.addEventListener('click', async () => {
    const checkbox = stepStart.querySelector('#checkbox')
    if (!checkbox.checked) {
      window.setModalStatus('TERMS')
    } else {
      window.setModalStatus('QUOTATION')
    }
  })

  // Add event listener to checkbox to enable continue button or disable continue button
  const checkbox = stepStart.querySelector('#checkbox')
  checkbox.addEventListener('change', () => {
    continueButton.disabled = !checkbox.checked
  })

  return stepStart
}

export default {
  createStart
}
