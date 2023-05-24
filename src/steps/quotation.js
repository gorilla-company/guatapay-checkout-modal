import colombiaFlag from '../img/colombia-flag.svg';
import bitcoinFlag from '../img/bitcoin-flag.svg';
import usdtFlag from '../img/usdt-flag.svg';
import lightningFlag from '../img/bitcoin-lightning-flag.svg';
import arrowRight from '../img/arrow-right.svg';
import chevronDown from '../img/chevron-down.svg';
import utilsService from '../services/utils.service';

const INITIAL_TIME = 59;

export const currencies = {
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    flag: usdtFlag,
  },
  LN: {
    symbol: 'LN',
    name: 'BTC Lightning',
    flag: lightningFlag,
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    flag: bitcoinFlag,
  },
};

const timeIntervals = [];
let timeLeft;

const timerIntervalFunction = (intervalId) => {
  const continueButton = document.querySelector('#btn-quotation-continue');
  const updateButton = document.querySelector('#btn-quotation-update');

  const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;

  continueButton.innerHTML = `Continuar 00:${formattedTime}`;
  if (timeLeft < 1) {
    clearInterval(intervalId);
    continueButton.classList.add('hide');
    updateButton.classList.remove('hide');
  }
  timeLeft -= 1;
};

async function refreshView() {
  const continueButton = document.querySelector('#btn-quotation-continue');
  const updateButton = document.querySelector('#btn-quotation-update');
  timeLeft = INITIAL_TIME;

  const newQuotation = await window.onQuotation('btc');
  window.lastQuotation = newQuotation;
  window.quotationTotal = newQuotation.crypto.amount;
  const currencyAmountTo = document.querySelector('#currency-amount-to');
  currencyAmountTo.innerHTML = `${parseFloat(
    newQuotation.crypto.amount + newQuotation.crypto.fee
  ).toFixed(8)} ${window.quotationCurrency}`;

  const currencyAmountFrom = document.querySelector('#currency-amount-from');
  currencyAmountFrom.innerHTML = `≈  ${newQuotation.fiat.fee + window.total} ${
    window.currency
  }`;

  const currencyAmountQuotation = document.querySelector(
    '#currency-amount-quotation'
  );
  currencyAmountQuotation.innerHTML = `Cotización 1 ${
    window.currency
  } = ${parseFloat(
    (newQuotation.crypto.amount + newQuotation.crypto.fee) / window.total
  ).toFixed(8)} ${window.quotationCurrency}`;

  continueButton.innerHTML = 'Continuar 01:00';
  continueButton.classList.remove('hide');
  updateButton.classList.add('hide');

  // Start timer
  timeIntervals.forEach((intervalId) => clearInterval(intervalId));
  const startIntervalId = setInterval(
    () => timerIntervalFunction(startIntervalId),
    1000
  );
  timeIntervals.push(startIntervalId);
}

async function setActiveCurrency(symbol) {
  const currencyName = document.querySelector('#currency-name');
  const currencyImage = document.querySelector('#currency-image');

  currencyName.innerHTML = currencies[symbol].name;
  currencyImage.src = currencies[symbol].flag;
  window.quotationCurrency = symbol;

  await refreshView();
}

function createQuotation() {
  const quotationDiv = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  quotationDiv.id = 'step-QUOTATION';

  //  <p id="payment-amount-text">Pagas 623.23 COP</p>;
  quotationDiv.innerHTML = `
    <div id="currency-selector">
      <div class="currency-wrapper">
        <div class="currency-img">
        <img src="${colombiaFlag}" alt="COP" />
        </div>
        <div class="currency-name">
          <p>DE</p>
          <p>COP</p>
        </div>
      </div>

      <div>
        <img src="${arrowRight}" alt="arrow" />
      </div>

      <div class="currency-wrapper" id="to-currency-wrapper">
        <div class="currency-name">
          <p class="text-right" style="margin-left: 20px;">A</p>
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
        <div class="currency-selector-dropdown-item" id="LN">
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
      <p id="currency-amount-quotation">Cotización 1 COP = 0,0000062  ${window.quotationCurrency}</p>

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
    '#to-currency-wrapper'
  );

  currencySelectorDropdownButton.addEventListener('click', () => {
    currencySelectorDropdown.classList.toggle('non-visible');
    currencySelector.classList.toggle('selector-active');
  });

  // Add event listener to continue button
  const continueButton = quotationDiv.querySelector('#btn-quotation-continue');
  continueButton.addEventListener('click', async () => {
    await window.setModalStatus('SCANNING');
  });

  // Add event listener to update button
  const updateButton = quotationDiv.querySelector('#btn-quotation-update');

  updateButton.addEventListener('click', () => {
    refreshView();
  });

  // Dropdown item clicks
  const dropdownItems = quotationDiv.querySelectorAll(
    '.currency-selector-dropdown-item'
  );

  dropdownItems.forEach((item) => {
    item.addEventListener('click', async () => {
      const currencySymbol = item.id;
      currencySelectorDropdown.classList.toggle('non-visible');
      currencySelector.classList.toggle('selector-active');
      await setActiveCurrency(currencySymbol);
    });
  });

  // Add event listener to document
  document.addEventListener('click', (event) => {
    // Check if target element is outside currency-selector-dropdown
    if (
      !currencySelectorDropdown.contains(event.target) &&
      !currencySelectorDropdownButton.contains(event.target)
    ) {
      currencySelectorDropdown.classList.add('non-visible');
    }
  });

  return quotationDiv;
}

export default {
  createQuotation,
  refreshView,
};
