import { clearAsyncInterval, setAsyncInterval } from './async-interval.service';
import deeplinkService from './deeplink.service';
import buildHtmlService from './build-html.service';
import loadingService from './loading.service';
import qrCodeService from './qr-code.service';
import restService from './rest.service';

window.mockStatus = 'CREATED'; // <-- this => window
let currentStatus = 'STARTED';
let initialized = false;
let closeModalTimeout = {};
let modalProperties;

function getCurrentStatus() {
  return currentStatus;
}

function setCurrentStatus(status) {
  currentStatus = status;
}

function getCurrentInternalStatus(status) {
  switch (status) {
    case 'CREATED':
      return 'STARTED';
    case 'SCANNED':
      return 'PROCESSING';
    case 'PROCESSING':
      return 'PAYING';
    case 'ACCEPTED':
      return 'PAYMENT_READY';
    case 'REJECTED':
    case 'CANCELLED':
    case 'ERROR':
      return 'PAYMENT_DENIED';
    case 'VOIDED':
      return 'EXPIRED';
    default:
      return 'ERROR';
  }
}

function setInitializedStatus(status) {
  initialized = status;
}

function getInitializedStatus() {
  return initialized;
}

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
  closeModalTimeout = setTimeout(() => finalize(), 5000);
}

function initService(props) {
  modalProperties = props;
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

async function refreshQr() {
  try {
    loadingService.disableRefreshQrButton();

    const response = await modalProperties.refreshData();

    modalProperties.qrCode = response.qrCode;
    modalProperties.deeplink.url = response.deeplink;

    removeModal();
    window.mockStatus = 'CREATED';
    showModal(modalProperties);
  } catch {
    window.setModalStatus('REJECTED');
  }
}

function buildStatusUrl() {
  let url = process.env.PAYMENT_STATUS_URL.replace(
    '{checkoutId}',
    modalProperties.checkoutId,
  );
  if (process.env.ENV === 'dev') {
    url = `${url}?mocked_status={status}`.replace(
      '{status}',
      window.mockStatus,
    );
  }
  return url;
}

const getStatus = async () => {
  try {
    const response = await restService.getData(buildStatusUrl());
    window.setModalStatus(response.status);
  } catch {
    window.setModalStatus('REJECTED');
  }
};

function showModal(modalObject) {
  if (detectMobile()) {
    deeplinkService.redirectToDeeplink(modalObject);
    return;
  }

  if (!getInitializedStatus()) {
    setCurrentStatus('CREATED');
    window.mockStatus = 'CREATED'; 
    initService(modalObject);
    buildHtmlService.buildHtml(refreshQr, closeModal, cancelModal, finalize);
    loadingService.initLoading();
    qrCodeService.generateQr(modalObject.qrString);

    setAsyncInterval(getStatus, 3000);
    setInitializedStatus(true);
  }
}

window.setModalStatus = (status) => {
  if (status === getCurrentStatus()) {
    return;
  }
  setCurrentStatus(status);
  switch (status) {
    case 'ACCEPTED':
      if (modalProperties.onSuccess) {
        modalProperties.onSuccess();
      }
      setCloseModalTimeout();
      clearAsyncInterval();
      break;
    case 'REJECTED':
    case 'CANCELLED':
    case 'ERROR':
      if (modalProperties.onFailure) {
        modalProperties.onFailure();
      }
      clearAsyncInterval();
      break;
    case 'VOIDED':
      clearAsyncInterval();
      break;
    default:
      break;
  }
  const internalStatus = getCurrentInternalStatus(status);
  window.mockStatus = status;
  buildHtmlService.handleStatusChange(internalStatus);
};

export default {
  getCurrentStatus,
  setCurrentStatus,
  getCurrentInternalStatus,
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
};
