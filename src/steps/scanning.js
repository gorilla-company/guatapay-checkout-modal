import bitcoinFlag from '../img/bitcoin-flag.svg';
import copyIcon from '../img/copy-icon.svg';

import utilsService from '../services/utils.service';
import qrCodeService from '../services/qr-code.service';
import { currencies } from './quotation';

window.scanningTimeLeft = 59;

function copyToClipboard(str) {
  const el = document.createElement('textarea'); // Create a temporary textarea element
  el.value = str; // Set the value of the textarea to the string
  el.setAttribute('readonly', ''); // Make the textarea readonly
  el.style.position = 'absolute'; // Position the textarea off-screen
  el.style.left = '-9999px';
  document.body.appendChild(el); // Append the textarea to the document body
  el.select(); // Select the contents of the textarea
  document.execCommand('copy'); // Copy the selected text to the clipboard
  document.body.removeChild(el); // Remove the temporary textarea from the document body
}

const intervalFunction = (intervalId) => {
  const formattedTime =
    window.scanningTimeLeft < 10
      ? `0${window.scanningTimeLeft}`
      : window.scanningTimeLeft;

  const continueButton = document.querySelector('#btn-scanning-continue');

  continueButton.innerHTML = `Ya transferí 00:${formattedTime}`;
  if (window.scanningTimeLeft < 1) {
    clearInterval(intervalId);
    continueButton.innerHTML = 'Ya transferí 01:00';
    window.scanningTimeLeft = 59;
    window.setModalStatus('EXPIRED');
  }
  window.scanningTimeLeft -= 1;
};

function refreshView() {
  const walletAddressText = document.querySelector('#wallet-address-text');
  walletAddressText.innerHTML = window.walletAddress;

  const transferAmountText = document.querySelector('#transfer-amount-text');
  transferAmountText.innerHTML = `${window.quotationTotal} ${window.quotationCurrency}`;

  const transferAmountImage = document.querySelector('#transfer-amount-image');
  transferAmountImage.src = currencies[window.quotationCurrency].flag;

  qrCodeService.generateQr(window.walletAddress);

  if (window.scanningTimeLeft > 1 && window.scanningTimeLeft !== 59) return;

  const intervalId = setInterval(() => intervalFunction(intervalId), 1000);
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
    copyToClipboard(window.walletAddress);
  });

  // Add event listener to copy transfer amount button
  const copyTransferAmountButton = scanningDiv.querySelector(
    '#btn-copy-transfer-amount'
  );

  copyTransferAmountButton.addEventListener('click', () => {
    copyToClipboard(window.quotationTotal);
  });

  return scanningDiv;
}

export default {
  createScanning,
  refreshView,
};
