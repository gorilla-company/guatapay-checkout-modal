import "./styles.css";
import "regenerator-runtime/runtime";
import HtmlBuildService from "./services/build-html.service";
import restService from "./services/rest.service";
import {
  setAsyncInterval,
  clearAsyncInterval,
} from "./services/async-interval.service";
import qrCodeService from "./services/qr-code.service";
import deeplinkService from "./services/deeplink.service";

const modoInitPayment = function (props) {
  let initialized = false;
  // this.mockStatus = 'STARTED';
  window.mockStatus = "CREATED"; // <-- this => window
  let currentStatus = "CREATED";
  let modalProperties = props;
  let closeModalTimeout = {};

  function removeModal() {
    clearAsyncInterval();
    const overlay = document.getElementById("modo-overlay");
    const modal = document.getElementById("modal-container");
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
      window.location.replace(modalProperties.callbackURL);
    } else {
      removeModal();
    }
  }

  async function refreshQr() {
    // disable refresh button
    const buttons = document.getElementsByClassName("refresh-button");
    for (const item of buttons) {
      item.disabled = true;
    }
    const response = await modalProperties.refreshData();
    if (response) {
      modalProperties.qrCode = response.qrCode;
      modalProperties.deeplink.url = response.deeplink;
    }
    removeModal();
    window.mockStatus = "CREATED";
    showModal(modalProperties);
  }

  function detectMobile() {
    const isMobile =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i);
    return isMobile;
  }

  function showModal(modalObject) {
    if (detectMobile()) {
      deeplinkService.redirectToDeeplink(modalObject);
      return;
    }

    if (!initialized) {
      currentStatus = "CREATED";
      modalProperties = modalObject;
      initialized = true;

      const qrCode = qrCodeService.generateQr(modalObject.qrString);
      HtmlBuildService.buildHtml(refreshQr, closeModal, cancelModal, finalize);
      qrCode.append(document.getElementById("qrContainer"));

      setAsyncInterval(getStatus, 3000);
    }
  }

  const getStatus = async () => {
    try {
      const response = await restService.getData(
        process.env.PAYMENT_STATUS_URL.replace(
          "{checkoutId}",
          modalProperties.checkoutId
        ).replace("{status}", mockStatus)
      );
      if (response) {
        setModalStatus(response.status);
      }
    } catch {
      setModalStatus("REJECTED");
    }
  };
  
  window.setModalStatus = (status) => {
    let internalStatus = {};
    if (status == currentStatus) {
      return;
    }
    currentStatus = status;
    switch (status) {
      case "CREATED":
        internalStatus = 'STARTED';
        break;
      case "SCANNED":
        internalStatus = 'PROCESSING';
        break;
      case "PROCESSING":
        internalStatus = 'PAYING';
        break;
      case "ACCEPTED":
        internalStatus = 'PAYMENT_READY';
        if (modalProperties.onSuccess) {
          modalProperties.onSuccess();
        }
        closeModalTimeout = setTimeout(() => finalize(), 5000);
        clearAsyncInterval();
        break;
      case "REJECTED":
      case "CANCELLED":
      case "ERROR":
        internalStatus = 'PAYMENT_DENIED';
        if (modalProperties.onFailure) {
          modalProperties.onFailure();
        }
        clearAsyncInterval();
        break;
      case "VOIDED":
        internalStatus = 'EXPIRED';
        clearAsyncInterval();
        break;
    }
    window.mockStatus = status;
    HtmlBuildService.handleStatusChange(internalStatus);
  };
  showModal(modalProperties);
};

export { modoInitPayment };
