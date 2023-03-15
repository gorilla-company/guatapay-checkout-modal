import QRCodeStyling from 'qr-code-styling';

function loadQr(qrCode) {
  return qrCode.getRawData('jpg').then(() => {
    // eslint-disable-next-line no-underscore-dangle
    const qrCodeImageSrc = qrCode._qr.createDataURL();
    const qrCodeImage = document.querySelector('#qr-code');
    qrCodeImage.src = qrCodeImageSrc;
  });
}

function generateQr(qrString) {
  const qrCode = new QRCodeStyling({
    width: 400,
    height: 400,
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
  return loadQr(qrCode);
}

export default {
  generateQr,
  loadQr,
};
