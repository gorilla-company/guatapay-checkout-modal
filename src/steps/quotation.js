import colombiaFlag from '../img/colombia-flag.svg';
import bitcoinFlag from '../img/bitcoin-flag.svg';
import usdtFlag from '../img/usdt-flag.svg';
import lightningFlag from '../img/bitcoin-lightning-flag.svg';
import arrowRight from '../img/arrow-right.svg';
import chevronDown from '../img/chevron-down.svg';
import utilsService from '../services/utils.service';

export const currencies = {
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    flag: usdtFlag,
  },
  LTC: {
    symbol: 'LTC',
    name: 'BTC Lightning',
    flag: lightningFlag,
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    flag: bitcoinFlag,
  },
};

function setActiveCurrency(symbol) {
  const currencyName = document.querySelector('#currency-name');
  const currencyImage = document.querySelector('#currency-image');

  currencyName.innerHTML = currencies[symbol].name;
  currencyImage.src = currencies[symbol].flag;
  window.quotationCurrency = symbol;

  const currencyAmountTo = document.querySelector('#currency-amount-to');
  currencyAmountTo.innerHTML = `${window.quotationTotal} ${window.quotationCurrency}`;
}

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
          <p class="text-right mr-32">A</p>
          <div id="currency-name-dropdown-button"> 
            <p  id="currency-name">Bitcoin</p>
            <img  src="${chevronDown}" alt="arrow" />
          </div>
        </div>
        <div class="currency-img">
          <img id="currency-image" src="${bitcoinFlag}" alt="COP" />
        </div>
      </div>

      <div id="currency-selector-dropdown" class="non-visible">
        <div class="currency-selector-dropdown-item" id="USDC">
          <p class="font-bold">USDC (USD Coin)</p>
          <img src="${usdtFlag}" alt="COP" class="currency-selector-dropdown-img" />
        </div>
        <div class="currency-selector-dropdown-item" id="LTC">
          <span>Más rápido y menor comisión</span>
          <p class="font-bold">BTC Lightning</p>
          <img src="${lightningFlag}" alt="COP" class="currency-selector-dropdown-img" />
        </div>
        <div class="currency-selector-dropdown-item" id="BTC">
          <p class="font-bold">BTC (Bitcoin)</p>
          <img src="${bitcoinFlag}" alt="COP" class="currency-selector-dropdown-img" />
        </div>
      </div>
    </div>

    <div id="currency-amount" class="mb-32">
      <p id="currency-amount-quotation">Cotización 1 COP = 0,00000592  ${window.quotationCurrency}</p>

      <h1 id="currency-amount-to">${window.quotationTotal} ${window.quotationCurrency}</h1>
      <p id="currency-amount-from">≈ 616.327,99 COP</p>
    </div>
    <button class="guatapay-btn-primary hide" id="btn-quotation-update">Actualizar cambio</button>
    <button class="guatapay-btn-primary" id="btn-quotation-continue">Continuar 01:00</button>
    `;

  const currencySelector = quotationDiv.querySelector('#currency-selector');

  // Add event listener to currency selector dropdown
  const currencySelectorDropdown = quotationDiv.querySelector(
    '#currency-selector-dropdown'
  );
  const currencySelectorDropdownButton = quotationDiv.querySelector(
    '#currency-name-dropdown-button'
  );

  currencySelectorDropdownButton.addEventListener('click', () => {
    currencySelectorDropdown.classList.toggle('non-visible');
    currencySelector.classList.toggle('selector-active');
  });

  // Add event listener to continue button
  const continueButton = quotationDiv.querySelector('#btn-quotation-continue');
  continueButton.addEventListener('click', () => {
    window.setModalStatus('SCANNING');
  });

  // Add event listener to update button
  const updateButton = quotationDiv.querySelector('#btn-quotation-update');

  // Start timer
  let timeLeft = 59;
  const intervalId = setInterval(() => {
    const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;

    continueButton.innerHTML = `Continuar 00:${formattedTime}`;
    if (timeLeft < 1) {
      clearInterval(intervalId);
      continueButton.classList.add('hide');
      updateButton.classList.remove('hide');
    }
    timeLeft -= 1;
  }, 1000);

  updateButton.addEventListener('click', () => {
    // Reset timer
    timeLeft = 59;

    const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
    continueButton.innerHTML = `Continuar 00:${formattedTime}`;
    continueButton.classList.remove('hide');
    updateButton.classList.add('hide');

    // Restart timer
    const intervalIdRestart = setInterval(() => {
      const formattedTimeRestart = timeLeft < 10 ? `0${timeLeft}` : timeLeft;

      continueButton.innerHTML = `Continuar 00:${formattedTimeRestart}`;
      if (timeLeft < 1) {
        clearInterval(intervalIdRestart);
        continueButton.classList.add('hide');
        updateButton.classList.remove('hide');
      }
      timeLeft -= 1;
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

  // Dropdown item clicks
  const dropdownItems = quotationDiv.querySelectorAll(
    '.currency-selector-dropdown-item'
  );

  dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
      const currencySymbol = item.id;
      setActiveCurrency(currencySymbol);
      currencySelectorDropdown.classList.toggle('non-visible');
      currencySelector.classList.toggle('selector-active');
    });
  });

  return quotationDiv;
}

export default {
  createQuotation,
};
