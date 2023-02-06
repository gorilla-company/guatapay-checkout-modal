import bitcoinFlag from '../img/bitcoin-flag.svg';
import qrImage from '../img/qr.svg';

import copyIcon from '../img/copy-icon.svg';

import utilsService from '../services/utils.service';

function createScanning() {
  const scanningDiv = utilsService.createElementWithClass(
    'div',
    'modal-body-wrapper hide'
  );
  scanningDiv.id = 'step-SCANNING';

  scanningDiv.innerHTML = `
    <p id="scan-title" class="text-lg">Elige tu billetera de preferencia y escanea el código QR con tu dispositivo móvil para pagar.</p>

    <img id="qr-code" src="${qrImage}" alt="qr" />

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

    <button class="guatapay-btn-primary mt-32" id="btn-scanning-continue">Ya transferí 00:59</button>
    `;

  // Add event listener to continue button
  const continueButton = scanningDiv.querySelector('#btn-scanning-continue');
  continueButton.addEventListener('click', () => {
    console.log('Continue button clicked');
    window.setModalStatus('VALIDATING');
  });

  let timeLeft = 10;
  const intervalId = setInterval(() => {
    const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;

    continueButton.innerHTML = `Continuar 00:${formattedTime}`;
    timeLeft -= 1;
    if (timeLeft < 0) {
      clearInterval(intervalId);
      window.setModalStatus('EXPIRED');
    }
  }, 1000);

  return scanningDiv;
}

export default {
  createScanning,
};
