import { createStep1 } from '../steps/step1';
import { createStep2 } from '../steps/step2';
import { createStep3 } from '../steps/step3';
import { createStep4 } from '../steps/step4';
import { createStepPaymentError } from '../steps/paymentError';
import { createStepExpired } from '../steps/expired';
import { createHeader } from '../steps/header';
import { createNavBar } from '../steps/navBar';
import { createLoading } from '../steps/loading';
import utilsService from './utils.service';

function buildHtml(refreshQr, closeModal, cancelModal, finalize) {
  const overlay = utilsService.createElementWithClass('div', 'modo-overlay');
  overlay.id = 'modo-overlay';

  // Section
  const modalContainer = utilsService.createElementWithClass('div', 'modal-container');
  modalContainer.id = 'modal-container';
  const section = utilsService.createElementWithClass('section', 'modal-wrapper');
  section.id = 'main_modal';
  section.classList.add('hide');

  // create header
  const header = createHeader(closeModal);

  // create navbar
  const navBar = createNavBar();

  // create steps containers

  const step1Div = createStep1();
  const step2Div = createStep2();
  const step3Div = createStep3();
  const step4Div = createStep4(finalize);

  const stepPaymentError = createStepPaymentError(refreshQr, cancelModal);
  const stepExpired = createStepExpired(refreshQr, cancelModal);

  const loadingOverlay = createLoading();

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
  modalContainer.appendChild(loadingOverlay);
  document.body.appendChild(overlay);
  document.body.appendChild(modalContainer);
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

function setTitleByStatus(status) {
  const spanLogo = document.getElementById('title-header');
  switch (status) {
    case 'STARTED':
      spanLogo.innerHTML = 'Pag\u00E1 con ';
      break;
    case 'PAYMENT_READY':
      spanLogo.innerHTML = 'Pagaste con ';
      break;
    case 'PROCESSING':
    case 'PAYING':
    case 'PAYMENT_DENIED':
    case 'EXPIRED':
      spanLogo.innerHTML = 'Pagando con ';
      break;
    default:
      spanLogo.innerHTML = 'Pagando con ';
      break;
  }
}

function handleStatusChange(status) {
  const newClass = `modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-${status}`;
  document.getElementById('selected-step').className = newClass;

  const stepsToHide = removeSelectedStep(status);
  stepsToHide.forEach((element) => {
    const step = document.getElementById(`step-${element}`);
    step.className = 'modal-body-wrapper hide';
  });
  document.getElementById(`step-${status}`).className = 'modal-body-wrapper show';
  setTitleByStatus(status);
}

export default {
  buildHtml,
  removeSelectedStep,
  setTitleByStatus,
  handleStatusChange,
};
