import bitcoinFlag from '../img/bitcoin-flag.svg';
import qrRefreshImage from '../img/qr-refresh.svg';

import copyIcon from '../img/copy-icon.svg';

import utilsService from '../services/utils.service';

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

    <p class="text-gray-400">O envía a la siguiente dirección el monto indicado:</p>

    <div id="wallet-address">
      <p class="text-gray-400">1JwSSubhmg6iPtRjtyqhUYYH7bZg3Lfy1T</p>
      <button>
        <img src="${copyIcon}" alt="copy" />  
      </button>
    </div>

    <div id="transfer-amount">
      <div class="transfer-amount-wrapper">
        <p>0,007500 BTC</p>
        <img src="${bitcoinFlag}" alt="BTC" />
      </div>
      <button>
        <img src="${copyIcon}" alt="copy" />  
      </button>
    </div>

    <button class="guatapay-btn-primary mt-32" id="btn-expired-update">Actualizar cambio</button>
    `;

  // Add event listener to qr refresh image
  const qrRefreshImageElement = expiredDiv.querySelector('#qr-refresh-code');
  qrRefreshImageElement.addEventListener('click', () => {
    console.log('QR refresh image clicked');
    window.setModalStatus('SCANNING');
  });

  // Add event listener to update button
  const updateButton = expiredDiv.querySelector('#btn-expired-update');
  updateButton.addEventListener('click', () => {
    console.log('Update button clicked');
    window.setModalStatus('SCANNING');
  });

  return expiredDiv;
}

export default {
  createExpired,
};
