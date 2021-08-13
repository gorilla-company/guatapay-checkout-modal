import './styles.css';
import QRCodeStyling from 'qr-code-styling';
import HtmlBuildService from './services/build-html.service';
import restService from './services/rest.service';
import { setAsyncInterval, clearAsyncInterval } from './services/async-interval.service';
import qrLogo from './img/qrLogo.png';

const modoInitPayment = function (props) {
  let initialized = false;
  // this.mockStatus = 'STARTED';
  window.mockStatus = 'STARTED'; // <-- this => window
  let currentStatus = 'STARTED';
  let modalProperties = props;
  let checkoutId;
  let closeModalTimeout = {};

  function removeModal() {
    clearAsyncInterval();
    const overlay = document.getElementById('modo-overlay');
    const modal = document.getElementById('modal-container');
    if (modal) document.body.removeChild(modal);
    if (overlay) document.body.removeChild(overlay);

    initialized = false;
  }

  function closeModal() {
    removeModal();
    if (modalProperties.onClose) {
      modalProperties.onClose();
    }
  }

  function cancelModal() {
    removeModal();
    if (modalProperties.onCancel) {
      modalProperties.onCancel();
    }
  }

  function handleStatusChange(status) {
    const newClass = `modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-${
      status}`;
    document.getElementById('selected-step').className = newClass;

    const stepsToHide = HtmlBuildService.removeSelectedStep(status);
    stepsToHide.forEach(
      (element) => {
        const step = document.getElementById(`step-${element}`);
        step.className = 'modal-body-wrapper hide';
      },
    );
    document.getElementById(`step-${status}`).className = 'modal-body-wrapper show';
  }

  function generateQr(qrString) {
    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      data: '0002010102125017001330-62017749-7512600220000068000000002222956520458125303032540410.05802AR5914PRUEBA QR DIMO6012VILLA GESELL610507165627001130000-000000000708396675605003APS51031.0520105312210112160106540210802139667560161046726626984021281807EuAu4cruerlUilEVOAtnrHoJD8eiSgLEb8gV1dwmOVOvuVyLz3YbVM4H/47xacol6QSj9fCc+VKb+0T8280o3Q/QZqwpayHN4b2wSolPTOOa/F+MmYQ//oFFBktruEWCLz2QsRYH3a60QQF9fcOhYXG068lCH2yUnl/83123xM+sVtCFYs=6304cc42',
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
    return qrCode;
  }

  function detectMobile() {
    const isMobile = navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i);
    return isMobile;
  }

  function clearCloseModalTimeout() {
    clearTimeout(closeModalTimeout);
  }

  function finalize() {
    clearCloseModalTimeout();
    if (modalProperties.callbackURL) {
      window.location.replace(modalProperties.callbackURL);
    } else {
      removeModal();
    }
  }

  const getStatus = async () => {
    try {
      const response = await restService.getData(
        process.env.PAYMENT_STATUS_URL
          .replace('{checkoutId}', checkoutId)
          .replace('{status}', window.mockStatus),
      );
      if (response) {
        window.setModalStatus(response.status);
      }
    } catch {
      window.setModalStatus('ERROR');
    }
  };

  function showModal(modalObject) {
    if (detectMobile()) {
      // console.log(`redirect to ${modalObject.deeplink}`);
      return;
    }

    //   The modal object must have the following properties
    //   checkoutId
    //   QRBase64
    //   deeplink
    //   onSuccess
    //   onFailure
    //   onClose
    //   onCancel
    //   callbackURL
    if (!initialized) {
      currentStatus = 'STARTED';
      modalProperties = modalObject;
      checkoutId = modalObject.checkoutId;
      initialized = true;

      const qrCode = generateQr(modalObject.qrString);
      HtmlBuildService.buildHtml(refreshQr, closeModal, cancelModal, finalize);
      qrCode.append(document.getElementById('qrContainer'));

      setAsyncInterval(getStatus, 3000);
    }
  }

  async function refreshQr() {
    // disable refresh button
    const buttons = document.getElementsByClassName('refresh-button');

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].disabled = true;
    }

    // assign refreshed response data to the modal
    const response = await modalProperties.refreshData();
    // if(response) {
    //   modalProperties.qrCode = response.qrCode;
    //   modalProperties.deeplink = response.deeplink;
    // }
    removeModal();
    window.mockStatus = 'STARTED';
    showModal(modalProperties);
  }

  // window.setModalStatus = (status) => { //<-- this => window
  window.setModalStatus = (status) => {
    if (status === currentStatus) {
      return;
    }
    currentStatus = status;
    const spanLogo = document.getElementById('title-header');
    switch (status) {
      case 'STARTED':
        window.mockStatus = 'STARTED';
        spanLogo.innerHTML = 'Pag\u00E1 con ';
        handleStatusChange('STARTED');
        break;
      case 'PROCESSING':
        window.mockStatus = 'PROCESSING';
        spanLogo.innerHTML = 'Pagando con ';
        handleStatusChange('PROCESSING');
        break;
      case 'PAYING':
        window.mockStatus = 'PAYING';
        spanLogo.innerHTML = 'Pagando con ';
        handleStatusChange('PAYING');
        break;
      case 'PAYMENT_READY':
        window.mockStatus = 'PAYMENT_READY';
        if (modalProperties.onSuccess) {
          modalProperties.onSuccess();
        }
        closeModalTimeout = setTimeout(() => finalize(), 5000);
        spanLogo.innerHTML = 'Pagaste con ';
        clearAsyncInterval();
        handleStatusChange('PAYMENT_READY');
        break;
      case 'PAYMENT_DENIED':
        window.mockStatus = 'PAYMENT_DENIED';
        if (modalProperties.onFailure) {
          modalProperties.onFailure();
        }
        spanLogo.innerHTML = 'Pagando con ';
        clearAsyncInterval();
        handleStatusChange('PAYMENT_DENIED');
        break;
      case 'EXPIRED':
        window.mockStatus = 'EXPIRED';
        spanLogo.innerHTML = 'Pagando con ';
        clearAsyncInterval();
        handleStatusChange('EXPIRED');
        break;
      default:
        break;
    }
  };
  showModal(modalProperties);
};
// modoModal();

export {
  modoInitPayment,
};

// export modoModal;
