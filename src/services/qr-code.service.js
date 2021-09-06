import QRCodeStyling from 'qr-code-styling';
import qrLogo from '../img/qrLogo.png';
import loadingService from './loading.service';

function loadQr(qrCode) {
  qrCode.getRawData('jpg').then(() => {
    qrCode.append(document.getElementById('qrContainer'));
    loadingService.onQrLoaded();
  });
}

function generateQr(qrString) {
  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: qrString,
    margin: 0,
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
    },
    dotsOptions: {
      type: 'rounded',
      color: '#121212',
      gradient: null,
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    image: qrLogo,
    dotsOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: '#6a1a4c',
        color2: '#6a1a4c',
        rotation: '0',
      },
    },
    cornersSquareOptions: {
      type: 'square',
      color: '#121212',
    },
    cornersSquareOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: '#000000',
        color2: '#000000',
        rotation: '0',
      },
    },
    cornersDotOptions: {
      type: 'square',
      color: '#121212',
    },
  });
  loadQr(qrCode);
}

export default {
  generateQr,
  loadQr,
};
