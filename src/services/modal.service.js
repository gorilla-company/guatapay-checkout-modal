import { clearAsyncInterval, setAsyncInterval } from './async-interval.service';
import deeplinkService from './deeplink.service';
import buildHtmlService from './build-html.service';
import loadingService from './loading.service';
import qrCodeService from './qr-code.service';
import restService from './rest.service';
import constants from '../utils/constants';

window.status = 'START';
let initialized = false;
let closeModalTimeout = {};
let modalProperties;

function getStatus() {
  return window.status;
}

function setStatus(status) {
  window.status = status;
}

function setInitializedStatus(status) {
  initialized = status;
}

function getInitializedStatus() {
  return initialized;
}

function removeModal() {
  clearAsyncInterval();
  const overlay = document.getElementById('guatapay-overlay');
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

function clearCloseModalTimeout() {
  clearTimeout(closeModalTimeout);
}

function finalize() {
  clearCloseModalTimeout();
  if (modalProperties.callbackURL) {
    window.location.href = modalProperties.callbackURL;
  } else {
    removeModal();
  }
}

function setCloseModalTimeout() {
  closeModalTimeout = setTimeout(
    () => finalize(),
    constants.closeModalAfterSuccessTime
  );
}

function initService(props) {
  modalProperties = props;
}

function detectMobile() {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
}

function buildStatusUrl() {
  let url = process.env.PAYMENT_STATUS_URL.replace(
    '{checkoutId}',
    modalProperties.checkoutId
  );
  if (process.env.ENV === 'dev') {
    url = `${url}?mocked_status={status}`.replace('{status}', window.status);
  }
  return url;
}

function showModal(modalObject) {
  // console.log(deeplinkService.buildDeepLink(modalObject));
  if (detectMobile()) {
    deeplinkService.redirectToDeeplink(modalObject);
    return;
  }

  if (!getInitializedStatus()) {
    setStatus('START');
    initService(modalObject);
    buildHtmlService.buildHtml(
      refreshQr, // eslint-disable-line no-use-before-define
      closeModal,
      cancelModal,
      finalize
    );
    loadingService.initLoading();
    qrCodeService.generateQr(modalObject.qrString);

    setAsyncInterval(getStatus, constants.callIntervalTime);
    setInitializedStatus(true);
  }
}

async function refreshQr() {
  try {
    loadingService.disableRefreshQrButton();

    if (modalProperties.refreshData) {
      const response = await modalProperties.refreshData();
      modalProperties.qrString = response.qrString;
      modalProperties.deeplink = response.deeplink;
      modalProperties.checkoutId = response.checkoutId;
    }

    removeModal();
    window.mockStatus = 'START';
    showModal(modalProperties);
  } catch {
    window.setModalStatus('REJECTED');
  }
}

window.setModalStatus = (status) => {
  if (status === getStatus()) return;

  setStatus(status);

  const header = document.getElementById('header');
  const stepIndicator = document.getElementById('step-indicator');
  switch (status) {
    case 'START':
    case 'TERMS':
      header.classList.add('hide');
      stepIndicator.classList.add('hide');
      break;
    case 'QUOTATION':
    case 'SCANNING':
    case 'EXPIRED':
      header.classList.remove('hide');
      stepIndicator.classList.remove('hide');
      break;
    case 'VALIDATING':
    case 'SUMMARY':
    case 'PROCESSING':
      header.classList.remove('hide');
      stepIndicator.classList.add('hide');
      break;
    default:
      break;
  }
  window.mockStatus = status;
  buildHtmlService.handleStatusChange(status);
};

export default {
  closeModal,
  cancelModal,
  finalize,
  setInitializedStatus,
  getInitializedStatus,
  setCloseModalTimeout,
  initService,
  removeModal,
  detectMobile,
  showModal,
  buildStatusUrl,
  refreshQr,
  getStatus,
  setStatus,
};
