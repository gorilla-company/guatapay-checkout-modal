import {createStep1} from '../steps/step1';
import {createStep2} from '../steps/step2';
import {createStep3} from '../steps/step3';
import {createStep4} from '../steps/step4';
import {createStepPaymentError} from '../steps/paymentError';
import {createStepExpired} from '../steps/expired';
import {createHeader} from '../steps/header';
import {createNavBar} from '../steps/navBar';

let refreshQr = {};
let closeModal = {};
let cancelModal = {};

function createElementWithClass(elementName, className) {
  const element = document.createElement(elementName);
  element.className = className;
  return element;
}

function buildHtml(refreshQrFnc, closeModalFnc, cancelModalFnc) {
  refreshQr = refreshQrFnc;
  closeModal = closeModalFnc;
  cancelModal = cancelModalFnc;

  const overlay = createElementWithClass('div', 'modo-overlay');
  overlay.id = 'modo-overlay';

  // Section
  const modalContainer = createElementWithClass('div', 'modal-container');
  modalContainer.id = 'modal-container';
  const section = createElementWithClass('section', 'modal-wrapper');
  section.id = 'main_modal';

  // create header
  const header = createHeader(closeModal);

  // create navbar
  const navBar = createNavBar();

  // create steps containers

  const step1Div = createStep1();
  const step2Div = createStep2();
  const step3Div = createStep3();
  const step4Div = createStep4();

  const stepPaymentError = createStepPaymentError(refreshQrFnc);
  const stepExpired = createStepExpired(closeModalFnc);

  // append items to hierarchy
  section.appendChild(header);
  section.appendChild(navBar);
  section.appendChild(step1Div);
  section.appendChild(step2Div);
  section.appendChild(step3Div);
  section.appendChild(step4Div);

  section.appendChild(stepPaymentError);
  section.appendChild(stepExpired);
  modalContainer.appendChild(section);

  document.body.appendChild(overlay);
  document.body.appendChild(modalContainer);

  // const qrContainer = document.getElementById('imgLogo');
  // qrContainer.onload = () => {
  //   modalContainer.style.visibility = "visible";
  // };
}

function removeSelectedStep(status) {
  let arr = [
    'STARTED',
    'PROCESSING',
    'PAYING',
    'PAYMENT_READY',
    'PAYMENT_DENIED',
    'EXPIRED',
  ];
  arr = arr.filter((item) => item !== status);

  return arr;
}

export default {
  buildHtml,
  removeSelectedStep
};

export {
  createElementWithClass
}
