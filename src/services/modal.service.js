import {
  clearAsyncInterval
} from '../services/async-interval.service';
let currentStatus = "STARTED";
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
    case "CREATED":
      return "STARTED";
    case "SCANNED":
      return "PROCESSING";
    case "PROCESSING":
      return "PAYING";
    case "ACCEPTED":
      return "PAYMENT_READY";
    case "REJECTED":
    case "CANCELLED":
    case "ERROR":
      return "PAYMENT_DENIED";
    case "VOIDED":
      return "EXPIRED";
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

function setCloseModalTimeout() {
  closeModalTimeout = setTimeout(() => finalize(), 5000);
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

function initService(props) {
  modalProperties = props;
}

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
  initService
};
