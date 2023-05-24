import bitcoinFlag from '../img/bitcoin-flag.svg';
import qrRefreshImage from '../img/qr-refresh.svg';

import copyIcon from '../img/copy-icon.svg';

import utilsService from '../services/utils.service';
import { currencies } from './quotation';

function refreshView() {
  const walletAddressText = document.querySelector(
    '#expired-wallet-address-text'
  );
  walletAddressText.innerHTML = window.walletAddress;

  const transferAmountText = document.querySelector(
    '#expired-transfer-amount-text'
  );
  transferAmountText.innerHTML = `${parseFloat(
    window.lastQuotation.crypto.amount + window.lastQuotation.crypto.fee
  ).toFixed(8)} ${window.quotationCurrency}`;

  const transferAmountImage = document.querySelector(
    '#expired-transfer-amount-image'
  );
  transferAmountImage.src = currencies[window.quotationCurrency].flag;
}

function createExpired() {
  const expiredDiv = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  expiredDiv.id = 'step-EXPIRED';

  expiredDiv.innerHTML = `
    <p id="scan-expired-title" class="font-bold text-lg hide">¡Código QR expirado!</p>
    <p id="scan-title" class="text-lg">Actualiza la tasa de cambio para continuar con el pago.</p>

    <img id="qr-refresh-code" src="${qrRefreshImage}" alt="qr" />

    <p class="text-gray-400 text-md my-2">O envía a la siguiente dirección el monto indicado:</p>

    <div id="wallet-address">
      <p id="expired-wallet-address-text" class="text-gray-400">1JwSSubhmg6iPtRjtyqhUYYH7bZg3Lfy1T</p>
      <button id="expired-btn-copy-wallet-address">
        <img src="${copyIcon}" alt="copy" />  
      </button>
    </div>

    <div id="transfer-amount">
      <div class="transfer-amount-wrapper">
        <p id="expired-transfer-amount-text">0,007500 BTC</p>
        <img id="expired-transfer-amount-image" src="${bitcoinFlag}" alt="BTC" />
      </div>
      <button id="expired-btn-copy-transfer-amount">
        <img src="${copyIcon}" alt="copy" />  
      </button>
    </div>

    <button class="guatapay-btn-primary mt-32" id="btn-expired-update">Actualizar cambio</button>
    `;

  // Add event listener to qr refresh image
  const qrRefreshImageElement = expiredDiv.querySelector('#qr-refresh-code');
  qrRefreshImageElement.addEventListener('click', async () => {
    await window.setModalStatus('SCANNING');
  });

  // Add event listener to update button
  const updateButton = expiredDiv.querySelector('#btn-expired-update');
  updateButton.addEventListener('click', async () => {
    await window.setModalStatus('SCANNING');
  });

  // Add event listener to copy wallet address button
  const copyWalletAddressButton = expiredDiv.querySelector(
    '#expired-btn-copy-wallet-address'
  );
  copyWalletAddressButton.addEventListener('click', () => {
    utilsService.copyToClipboard(window.walletAddress);
  });

  // Add event listener to copy transfer amount button
  const copyTransferAmountButton = expiredDiv.querySelector(
    '#expired-btn-copy-transfer-amount'
  );
  copyTransferAmountButton.addEventListener('click', () => {
    console.log('Copy transfer amount button clicked');
    utilsService.copyToClipboard(
      window.lastQuotation.crypto.amount + window.lastQuotation.crypto.fee
    );
  });

  return expiredDiv;
}

export default {
  createExpired,
  refreshView,
};
