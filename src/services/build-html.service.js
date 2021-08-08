import CloseBtn from '../img/close-btn.svg';
import svgLogo from '../img/modo-logo.svg';
import svgQuestion from '../img/question-icon.svg';
import svgHourglass from '../img/hourglass-icon.svg';
import svgSpinner from '../img/spinner.svg';
import svgError from '../img/error.svg';
import svgExpired from '../img/expired.svg';

let refreshQr = {};
let closeModal = {};
let cancelModal = {};

function createElementWithClass(elementName, className) {
  const element = document.createElement(elementName);
  element.className = className;
  return element;
}

function createHeader() {
  const header = document.createElement('header');
  document.createElement('header');
  const headerWrapper = createElementWithClass('div', 'modal-header-wrapper');
  const logoWrapper = createElementWithClass('div', 'modal-logo-wrapper');

  const spanLogo = createElementWithClass('span', 'title-header');
  spanLogo.id = 'title-header';
  spanLogo.innerHTML = 'Pag\u00E1 con ';
  const imgLogo = document.createElement('img');
  imgLogo.id = 'imgLogo';
  imgLogo.src = svgLogo;
  imgLogo.alt = 'logo';

  logoWrapper.appendChild(spanLogo);
  logoWrapper.appendChild(imgLogo);

  const closeButton = document.createElement('button');
  closeButton.onclick = () => closeModal();
  const imgClose = document.createElement('img');
  imgClose.src = CloseBtn;
  imgLogo.alt = 'close';
  closeButton.appendChild(imgClose);

  headerWrapper.appendChild(logoWrapper);
  headerWrapper.appendChild(closeButton);
  header.appendChild(headerWrapper);
  return header;
}

function createNavBar() {
  const navBar = createElementWithClass('nav', 'wizard');
  const step1Ball = createElementWithClass('div', 'modal-nav-ball');
  step1Ball.classList.add('modal-nav-ball-selected');
  step1Ball.id = 'selected-step';
  const step2Ball = createElementWithClass('div', 'modal-nav-ball');
  const step3Ball = createElementWithClass('div', 'modal-nav-ball');
  const step4Ball = createElementWithClass('div', 'modal-nav-ball');
  const step5Ball = createElementWithClass('div', 'modal-nav-ball');
  navBar.appendChild(step1Ball);
  navBar.appendChild(step2Ball);
  navBar.appendChild(step3Ball);
  navBar.appendChild(step4Ball);
  navBar.appendChild(step5Ball);

  return navBar;
}

function createStep1() {
  const step1Div = createElementWithClass('div', 'modal-body-wrapper');
  step1Div.id = 'step-STARTED';
  const step1Title = createElementWithClass('p', 'paragraph');
  step1Title.innerHTML = 'Escanea el código QR <br> Con la App MODO o desde tu App bancaria preferida';

  const qrContainer = createElementWithClass('div', 'modal-body-qr-wrapper');
  qrContainer.innerHTML = '<div id="qrContainer"></div>';

  const questionContainer = createElementWithClass('div', 'question');
  questionContainer.innerHTML = '\u00BFC\u00F3mo pagar desde App <b>MODO</b>';

  const toolTip = createElementWithClass('div', 'tooltip');

  const imgQuestion = document.createElement('img');
  imgQuestion.src = svgQuestion;
  imgQuestion.alt = 'question';

  const toolTipText = createElementWithClass('div', 'tooltiptext');

  const questionUl = document.createElement('ul');
  const questionLi1 = document.createElement('li');
  questionLi1.innerHTML = 'Descarg\u00E1 <span class="bold">MODO</span> en tu celular desde <span class="bold">App Store o Google Play</span>';

  const questionLi2 = document.createElement('li');
  questionLi2.innerHTML = 'Registrate y vincul\u00E1 tus medios de pago';

  const questionLi3 = document.createElement('li');
  questionLi3.innerHTML = 'Seleccion\u00E1 la opci\u00F3n \u201CPagar\u201D desde la secci\u00F3n \u201CInicio\u201D en <span class="bold">MODO</span>.';

  const questionLi4 = document.createElement('li');
  questionLi4.innerHTML = 'Escane\u00E1 el C\u00F3digo QR con tu celular';

  const questionLi5 = document.createElement('li');
  questionLi5.innerHTML = 'Confirm\u00E1 el pago y listo!';

  questionUl.appendChild(questionLi1);
  questionUl.appendChild(questionLi2);
  questionUl.appendChild(questionLi3);
  questionUl.appendChild(questionLi4);
  questionUl.appendChild(questionLi5);

  toolTipText.appendChild(questionUl);
  toolTip.appendChild(imgQuestion);
  toolTip.appendChild(toolTipText);
  questionContainer.appendChild(toolTip);

  step1Div.appendChild(step1Title);
  step1Div.appendChild(qrContainer);
  step1Div.appendChild(questionContainer);
  return step1Div;
}

function createStep2() {
  const step2Div = createElementWithClass('div', 'modal-body-wrapper');
  step2Div.classList.add('hide');
  step2Div.id = 'step-PROCESSING';

  const step2Title = createElementWithClass('p', 'paragraph');
  step2Title.innerHTML = 'Estamos esperando confirmaci\u00F3n';

  const divLoading = document.createElement('div');
  divLoading.classList.add('svg-icon');
  divLoading.classList.add('rotate');

  divLoading.innerHTML = '<img src={img} alt="loading">'.replace('{img}', svgHourglass);

  const step2Text = document.createElement('p');
  step2Text.innerHTML = 'Eleg\u00ED el medio de pago y confirm\u00E1 la transacci\u00F3n';

  step2Div.appendChild(step2Title);
  step2Div.appendChild(divLoading);
  step2Div.appendChild(step2Text);
  return step2Div;
}

function createStep3() {
  const step3Div = createElementWithClass('div', 'modal-body-wrapper');
  step3Div.classList.add('hide');
  step3Div.id = 'step-PAYING';

  const step3Text = createElementWithClass('p', 'subtitle');
  step3Text.innerHTML = 'Pago en proceso';

  const divLoadingStep3 = document.createElement('div');
  divLoadingStep3.classList.add('svg-icon');
  divLoadingStep3.classList.add('spin');

  divLoadingStep3.innerHTML = '<img src={img} alt="loading">'.replace('{img}', svgSpinner);

  const step3TextUpper = document.createElement('p');
  step3TextUpper.innerHTML = 'Estamos procesando tu pago,';

  const step3TextLower = document.createElement('p');
  step3TextLower.innerHTML = 'te pedimos aguardar, puede demorar unos segundos.';

  step3Div.appendChild(step3Text);
  step3Div.appendChild(divLoadingStep3);
  step3Div.appendChild(step3TextUpper);
  step3Div.appendChild(step3TextLower);
  return step3Div;
}

function createStepPaymentError() {
  const step = createElementWithClass('div', 'modal-body-wrapper');
  step.classList.add('hide');
  step.id = 'step-PAYMENT_DENIED';

  const stepTitle = createElementWithClass('p', 'subtitle');
  stepTitle.innerHTML = 'Pago denegado';

  const stepImg = createElementWithClass('div', 'svg-icon');
  stepImg.innerHTML = '<img src={img} alt="error">'.replace('{img}', svgError);

  const stepTextUpper = document.createElement('p');
  stepTextUpper.innerHTML = '<b>Lo sentimos, tu pago fue denegado</b>';
  const stepTextMiddle = document.createElement('p');
  stepTextMiddle.innerHTML = 'Por favor gener\u00E1 un nuevo QR';
  const stepTextLower = document.createElement('p');
  stepTextLower.innerHTML = 'Para volver a intentar';

  const stepButtonRefresh = document.createElement('button');
  stepButtonRefresh.classList.add('modo-btn-primary');
  stepButtonRefresh.classList.add('mt-55');
  stepButtonRefresh.classList.add('refresh-button');
  stepButtonRefresh.innerHTML = 'Generar nuevo QR';
  stepButtonRefresh.onclick = () => refreshQr();

  const cancelButton = createElementWithClass('button', 'modo-btn-link');
  cancelButton.innerHTML = 'Cancelar';
  cancelButton.onclick = () => cancelModal();

  step.appendChild(stepTitle);
  step.appendChild(stepImg);
  step.appendChild(stepTextUpper);
  step.appendChild(stepTextMiddle);
  step.appendChild(stepTextLower);
  step.appendChild(stepButtonRefresh);
  step.appendChild(cancelButton);

  return step;
}

// remove
function createStepError() {
  const step = createElementWithClass('div', 'modal-body-wrapper');
  step.classList.add('hide');
  step.id = 'step-ERROR';

  const stepTitle = createElementWithClass('p', 'subtitle');
  stepTitle.innerHTML = 'Error en el pago';

  const stepImg = createElementWithClass('div', 'svg-icon');
  stepImg.innerHTML = '<img src={img} alt="error">'.replace('{img}', svgError);

  const stepTextUpper = document.createElement('p');
  stepTextUpper.innerHTML = '<b>No pudimos procesar tu pago</b>';
  const stepTextMiddle = document.createElement('p');
  stepTextMiddle.innerHTML = 'Por favor gener\u00E1 un nuevo QR';
  const stepTextLower = document.createElement('p');
  stepTextLower.innerHTML = 'Para volver a intentar';

  const stepButtonRefresh = document.createElement('button');
  stepButtonRefresh.classList.add('modo-btn-primary');
  stepButtonRefresh.classList.add('mt-55');
  stepButtonRefresh.classList.add('refresh-button');
  stepButtonRefresh.innerHTML = 'Generar nuevo QR';
  stepButtonRefresh.onclick = () => refreshQr();
  const cancelButton = createElementWithClass('button', 'modo-btn-link');
  cancelButton.innerHTML = 'Cancelar';
  cancelButton.onclick = () => cancelModal();

  step.appendChild(stepTitle);
  step.appendChild(stepImg);
  step.appendChild(stepTextUpper);
  step.appendChild(stepTextMiddle);
  step.appendChild(stepTextLower);
  step.appendChild(stepButtonRefresh);
  step.appendChild(cancelButton);

  return step;
}

function createStepExpired() {
  const step = createElementWithClass('div', 'modal-body-wrapper');
  step.classList.add('hide');
  step.id = 'step-EXPIRED';
  const stepTitle = createElementWithClass('p', 'subtitle');
  stepTitle.innerHTML = 'C\u00F3digo QR Expirado';

  const stepImg = createElementWithClass('div', 'svg-icon');
  stepImg.innerHTML = '<img src={img} alt="expired">'.replace('{img}', svgExpired);

  const stepTextUpper = document.createElement('p');
  stepTextUpper.innerHTML = 'Por favor gener\u00E1 un nuevo QR';
  const stepTextLower = document.createElement('p');
  stepTextLower.innerHTML = 'para poder pagar';

  const stepButton = document.createElement('button');
  stepButton.classList.add('modo-btn-primary');
  stepButton.classList.add('mt-75');
  stepButton.classList.add('refresh-button');
  stepButton.innerHTML = 'Generar nuevo QR';
  stepButton.onclick = () => refreshQr();

  const cancelButton = createElementWithClass('button', 'modo-btn-link');
  cancelButton.innerHTML = 'Cancelar';
  cancelButton.onclick = () => cancelModal();

  step.appendChild(stepTitle);
  step.appendChild(stepImg);
  step.appendChild(stepTextUpper);
  step.appendChild(stepTextLower);
  step.appendChild(stepButton);
  step.appendChild(cancelButton);

  return step;
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
  const header = createHeader();

  // create navbar
  const navBar = createNavBar();

  // create steps containers

  // STEP 1

  const step1Div = createStep1();

  // STEP 2

  const step2Div = createStep2();

  // STEP 3

  const step3Div = createStep3();

  // STEP 4

  const stepPaymentError = createStepPaymentError();
  const stepError = createStepError();
  const stepExpired = createStepExpired();

  // append items to hierarchy
  section.appendChild(header);
  section.appendChild(navBar);
  section.appendChild(step1Div);
  section.appendChild(step2Div);
  section.appendChild(step3Div);

  section.appendChild(stepPaymentError);
  section.appendChild(stepError);
  section.appendChild(stepExpired);
  modalContainer.appendChild(section);

  document.body.appendChild(overlay);
  document.body.appendChild(modalContainer);

  // const qrContainer = document.getElementById('imgLogo');
  // qrContainer.onload = () => {
  //   modalContainer.style.visibility = "visible";
  // };
}

export default {
  buildHtml,
};
