import bitcoinFlag from '../img/bitcoin-flag.svg';
import copyIcon from '../img/copy-icon.svg';

import utilsService from '../services/utils.service';
import qrCodeService from '../services/qr-code.service';
import { currencies } from './quotation';

const timeIntervals = [];
let timeLeft = 59;

const intervalFunction = (intervalId) => {
  const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;

  const continueButton = document.querySelector('#btn-scanning-continue');

  continueButton.innerHTML = `Ya transferí 00:${formattedTime}`;
  if (timeLeft < 1) {
    clearInterval(intervalId);
    continueButton.innerHTML = 'Ya transferí 01:00';
    timeLeft = 59;
    window.setModalStatus('EXPIRED');
  }
  timeLeft -= 1;
};

function refreshView() {
  timeLeft = 59;

  const continueButton = document.querySelector('#btn-scanning-continue');
  continueButton.innerHTML = 'Ya transferí 01:00';

  const paymentIntention = window.onPayment(window.quotationCurrency, window.total);
  window.walletAddress = paymentIntention.address;

  const walletAddressText = document.querySelector('#wallet-address-text');
  walletAddressText.innerHTML = window.walletAddress;

  const transferAmountText = document.querySelector('#transfer-amount-text');
  transferAmountText.innerHTML = `${parseFloat(
    window.lastQuotation.crypto.amount + window.lastQuotation.crypto.fee
  ).toFixed(8)} ${window.quotationCurrency}`;

  const transferAmountImage = document.querySelector('#transfer-amount-image');
  transferAmountImage.src = currencies[window.quotationCurrency].flag;

  qrCodeService.generateQr(window.walletAddress);

  timeIntervals.forEach((intervalId) => clearInterval(intervalId));

  const intervalId = setInterval(() => intervalFunction(intervalId), 1000);
  timeIntervals.push(intervalId);
}

function createScanning() {
  const scanningDiv = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  scanningDiv.id = 'step-SCANNING';

  scanningDiv.innerHTML = `
    <p id="scan-title" class="text-lg">Elige tu billetera de preferencia y escanea el código QR con tu dispositivo móvil para pagar.</p>

    <img id="qr-code" src="" alt="qr" />

    <p class="text-gray-400">O envía a la siguiente dirección el monto indicado:</p>

    <div id="wallet-address">
      <p id="wallet-address-text" class="text-gray-400">${window.walletAddress}</p>
      <button id="btn-copy-wallet-address">
        <img src="${copyIcon}" alt="copy" />  
      </button>
    </div>

    <div id="transfer-amount">
      <div class="transfer-amount-wrapper">
        <p id="transfer-amount-text">${window.quotationTotal} ${window.quotationCurrency}</p>
        <img id="transfer-amount-image" src="${bitcoinFlag}" alt="BTC" />
      </div>
      <button id="btn-copy-transfer-amount">
        <img src="${copyIcon}" alt="copy" />  
      </button>
    </div>

    <button class="guatapay-btn-primary mt-32" id="btn-scanning-continue">Ya transferí 01:00</button>
    `;

  // Add event listener to continue button
  const continueButton = scanningDiv.querySelector('#btn-scanning-continue');
  continueButton.addEventListener('click', () => {
    window.setModalStatus('VALIDATING');
  });

  // Add event listener to copy wallet address button
  const copyWalletAddressButton = scanningDiv.querySelector(
    '#btn-copy-wallet-address'
  );
  copyWalletAddressButton.addEventListener('click', () => {
    utilsService.copyToClipboard(window.walletAddress);
  });

  // Add event listener to copy transfer amount button
  const copyTransferAmountButton = scanningDiv.querySelector(
    '#btn-copy-transfer-amount'
  );

  copyTransferAmountButton.addEventListener('click', () => {
    utilsService.copyToClipboard(
      window.lastQuotation.crypto.amount + window.lastQuotation.crypto.fee
    );
  });

  return scanningDiv;
}

export default {
  createScanning,
  refreshView,
};
