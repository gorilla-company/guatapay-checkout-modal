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
import { async } from "regenerator-runtime/runtime";

const modoInitPayment = function (props) {
  // modalService.setInitializedStatus(false);
  let modalProperties = props;

  modalService.showModal(modalProperties);
};

export { modoInitPayment };
