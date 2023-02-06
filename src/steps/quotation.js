import colombiaFlag from '../img/colombia-flag.svg';
import bitcoinFlag from '../img/bitcoin-flag.svg';
import arrowRight from '../img/arrow-right.svg';
import utilsService from '../services/utils.service';

function createQuotation() {
  const quotationDiv = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  quotationDiv.id = 'step-QUOTATION';

  quotationDiv.innerHTML = `
    <p>Pagas 623.23 COP</p>

    <div id="currency-selector">
      <div class="currency-wrapper">
        <div class="currency-img">
        <img src="${colombiaFlag}" alt="COP" />
        </div>
        <div class="currency-name">
          <p>de</p>
          <p>COP</p>
        </div>
      </div>

      <div>
        <img src="${arrowRight}" alt="arrow" />
      </div>

      <div class="currency-wrapper">
        <div class="currency-name">
          <p>de</p>
          <p>COP</p>
        </div>
        <div class="currency-img">
        <img src="${bitcoinFlag}" alt="COP" />
      </div>
      </div>
    </div>
    <div id="currency-amount" class="mb-32">
      <p id="currency-amount-quotation">Cotización 1 COP = 0,00000112 BTC</p>

      <h1 id="currency-amount-to">0,006400 BTC</h1>
      <p id="currency-amount-from">≈ 616.327,99 COP</p>
    </div>
    <button class="guatapay-btn-primary hide" id="btn-quotation-update">Actualizar cambio</button>
    <button class="guatapay-btn-primary" id="btn-quotation-continue">Continuar 00:59</button>
    `;

  // Add event listener to continue button
  const continueButton = quotationDiv.querySelector('#btn-quotation-continue');
  continueButton.addEventListener('click', () => {
    window.setModalStatus('SCANNING');
  });

  // Add event listener to update button
  const updateButton = quotationDiv.querySelector('#btn-quotation-update');

  let timeLeft = 10;
  const intervalId = setInterval(() => {
    timeLeft -= 1;
    const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;

    continueButton.innerHTML = `Continuar 00:${formattedTime}`;
    if (timeLeft < 0) {
      clearInterval(intervalId);
      continueButton.classList.add('hide');
      updateButton.classList.remove('hide');
    }
  }, 1000);

  updateButton.addEventListener('click', () => {
    console.log('Update button clicked');
    continueButton.classList.remove('hide');
    updateButton.classList.add('hide');

    // Reset timer
    timeLeft = 10;

    // Restart timer
    const intervalUpdate = setInterval(() => {
      timeLeft -= 1;
      const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;

      continueButton.innerHTML = `Continuar 00:${formattedTime}`;
      if (timeLeft < 0) {
        clearInterval(intervalUpdate);
        continueButton.classList.add('hide');
        updateButton.classList.remove('hide');
      }
    }, 1000);

    // Set new quotation
    const newQuotation = 0.000042024;
    const newQuotationFrom = 0.0064;
    const newQuotationTo = 26.327;

    const currencyAmountQuotation = quotationDiv.querySelector(
      '#currency-amount-quotation'
    );
    currencyAmountQuotation.innerHTML = `Cotización 1 COP = ${newQuotation} BTC`;

    const currencyAmountFrom = quotationDiv.querySelector(
      '#currency-amount-from'
    );
    currencyAmountFrom.innerHTML = `≈ ${newQuotationFrom} COP`;

    const currencyAmountTo = quotationDiv.querySelector('#currency-amount-to');
    currencyAmountTo.innerHTML = `${newQuotationTo} BTC`;
  });

  return quotationDiv;
}

export default {
  createQuotation,
};
