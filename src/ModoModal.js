import './styles.css';
import 'regenerator-runtime/runtime';
import HtmlBuildService from './services/build-html.service';
import restService from './services/rest.service';
import {
  setAsyncInterval,
  clearAsyncInterval,
} from './services/async-interval.service';
import qrCodeService from './services/qr-code.service';
import deeplinkService from './services/deeplink.service';
import loadingService from './services/loading.service';
import modalService from './services/modal.service';

const modoInitPayment = function (props) {
  modalService.setInitializedStatus(false);
  // this.mockStatus = 'STARTED';
  window.mockStatus = 'CREATED'; // <-- this => window
  let modalProperties = props;

  async function refreshQr() {
    // disable refresh button
    const buttons = document.getElementsByClassName('refresh-button');
    for (const item of buttons) {
      item.disabled = true;
    }
    const response = await modalProperties.refreshData();
    if (response) {
      modalProperties.qrCode = response.qrCode;
      modalProperties.deeplink.url = response.deeplink;
    }
    removeModal();
    window.mockStatus = 'CREATED';
    showModal(modalProperties);
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

  function buildStatusUrl() {
    let url = process.env.PAYMENT_STATUS_URL.replace(
      '{checkoutId}',
      modalProperties.checkoutId,
    );
    if (process.env.ENV === 'dev') {
      url = `${url}?mocked_status={status}`
        .replace('{status}', window.mockStatus);
    }
    return url;
  }

  const getStatus = async () => {
    try {
      const response = await restService.getData(
        buildStatusUrl(),
      );

      if (response) {
        window.setModalStatus(response.status);
      }
    } catch {
      window.setModalStatus('REJECTED');
    }
  };

  function showModal(modalObject) {
    if (detectMobile()) {
      deeplinkService.redirectToDeeplink(modalObject);
      return;
    }

    if (!modalService.getInitializedStatus()) {
      modalService.setCurrentStatus('CREATED');
      modalProperties = modalObject;
      modalService.initService(modalProperties)
      modalService.setInitializedStatus(true);
      HtmlBuildService.buildHtml(refreshQr, modalService.closeModal, modalService.cancelModal, modalService.finalize);
      loadingService.initLoading();

      qrCodeService.generateQr(modalObject.qrString);

      setAsyncInterval(getStatus, 3000);
    }
  }

  window.setModalStatus = (status) => {
    let internalStatus = {};
    if (status == modalService.getCurrentStatus()) {
      return;
    }
    modalService.setCurrentStatus(status);
    switch (status) {
      case 'CREATED':
        internalStatus = 'STARTED';
        break;
      case 'SCANNED':
        internalStatus = 'PROCESSING';
        break;
      case 'PROCESSING':
        internalStatus = 'PAYING';
        break;
      case 'ACCEPTED':
        internalStatus = 'PAYMENT_READY';
        if (modalProperties.onSuccess) {
          modalProperties.onSuccess();
        }
        modalService.setCloseModalTimeout();
        clearAsyncInterval();
        break;
      case 'REJECTED':
      case 'CANCELLED':
      case 'ERROR':
        internalStatus = 'PAYMENT_DENIED';
        if (modalProperties.onFailure) {
          modalProperties.onFailure();
        }
        clearAsyncInterval();
        break;
      case 'VOIDED':
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
