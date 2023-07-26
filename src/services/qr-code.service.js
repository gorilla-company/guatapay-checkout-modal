import QRCodeStyling from 'qr-code-styling'

const currenciesLogos = {
  btc: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
  usdc: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Circle_USDC_Logo.svg',
  'lightning-btc': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Lightning_Network.svg'
}

function loadQr(qrCode) {
  return qrCode.getRawData('svg').then(() => {
    // eslint-disable-next-line no-underscore-dangle
    const qrCodeImageSrc = qrCode._qr.createDataURL()
    const qrCodeImage = document.querySelector('#qr-code')
    qrCodeImage.src = qrCodeImageSrc
  })
}

function generateQr(qrPaymentData) {
  /* const qrCode = new QRCodeStyling({
    width: 400,
    height: 400,
    type: 'svg',
    data: qrString,
    margin: 0,
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0
    },
    dotsOptions: {
      type: 'rounded',
      color: '#121212',
      gradient: null
    },
    backgroundOptions: {
      color: '#ffffff'
    },
    dotsOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: '#6a1a4c',
        color2: '#6a1a4c',
        rotation: '0'
      }
    },
    cornersSquareOptions: {
      type: 'square',
      color: '#121212'
    },
    cornersSquareOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: '#000000',
        color2: '#000000',
        rotation: '0'
      }
    },
    cornersDotOptions: {
      type: 'square',
      color: '#121212'
    }
  })

  return loadQr(qrCode) */

  const qrCode = new QRCodeStyling({
    width: qrPaymentData.width,
    height: qrPaymentData.height,
    type: 'svg',
    data: qrPaymentData.mainQrCodeUri,
    image: currenciesLogos[window.quotationCurrency],
    dotsOptions: {
      type: 'rounded',
      color: '#121212',
      gradient: null
    },
    backgroundOptions: {
      color: '#ffffff'
    },
    imageOptions: {
      crossOrigin: 'anonymous'
    }
  })

  qrCode.append(document.getElementById('qr-code'))
}

export default {
  generateQr,
  loadQr
}
