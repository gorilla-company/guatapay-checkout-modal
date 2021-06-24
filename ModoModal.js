
let initialized = false;
let mockStatus = 'STARTED';
let currentStatus = 'STARTED';
let modalProperties = {};

function buildHtml(qrCode) {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = './styles.css';
  document.head.appendChild(link);

  // Section
  let section = createElementWithClass("section", "modal-wrapper");
  section.id = "main_modal";
  let header = document.createElement("header");
  let divWrapper = createElementWithClass("div", "modal-header-wrapper");
  divWrapper.innerHTML = '<img src="./img/logo.jpg" alt="logo">';
  let closeButton = document.createElement("button");
  closeButton.innerHTML = 'X';
  closeButton.onclick = () => closeModal();
  divWrapper.appendChild(closeButton);

  // create navbar
  let navBar = createElementWithClass("nav");
  let step1Ball = createElementWithClass("div", "modal-nav-ball");
  step1Ball.classList.add("modal-nav-ball-selected");
  step1Ball.id = "selected-step";
  let step2Ball = createElementWithClass("div", "modal-nav-ball");
  let step3Ball = createElementWithClass("div", "modal-nav-ball");
  let step4Ball = createElementWithClass("div", "modal-nav-ball");
  let step5Ball = createElementWithClass("div", "modal-nav-ball");
  navBar.appendChild(step1Ball);
  navBar.appendChild(step2Ball);
  navBar.appendChild(step3Ball);
  navBar.appendChild(step4Ball);
  navBar.appendChild(step5Ball);

  // create steps containers
  
  // STEP 1

  let step1Div = createStep1(qrCode);

  // STEP 2

  let step2Div = createStep2();

  // STEP 3

  let step3Div = createStep3();

  // STEP 4

  let step4Div = createStep4();

  let stepPaymentError = createStepPaymentError();
  let stepError = createStepError();
  let stepExpired = createStepExpired();

  // append items to hierarchy
  header.appendChild(divWrapper);
  section.appendChild(header);
  section.appendChild(navBar);
  section.appendChild(step1Div);
  section.appendChild(step2Div);
  section.appendChild(step3Div);
  section.appendChild(step4Div);

  section.appendChild(stepPaymentError);
  section.appendChild(stepError);
  section.appendChild(stepExpired);


  document.body.appendChild(section);
}

function createStep1(qrCode) {
  let step1Div = createElementWithClass("div", "modal-body-wrapper");
  step1Div.id = "step-STARTED";
  step1Title = document.createElement("p");
  step1Title.innerHTML = "Escanea el c\u00F3digo QR <br> Con la App MODO o desde tu App bancaria preferida";

  let qrContainer = createElementWithClass("div", "modal-body-qr-wrapper");
  qrContainer.innerHTML = '<img src="data:image/png;base64, {qrCode}"></img>'.replace('{qrCode}', qrCode);
  let disclaimerQuestion = document.createElement("p");
  disclaimerQuestion.innerHTML = '\u00BFC\u00F3mo pagar desde App MODO?';
  step1Div.appendChild(step1Title);
  step1Div.appendChild(qrContainer);
  step1Div.appendChild(disclaimerQuestion);
  return step1Div;
}

function createStep2() {
  let step2Div = createElementWithClass("div", "modal-body-wrapper");
  step2Div.classList.add("hide");
  step2Div.id = "step-PROCESSING";

  step2Title = document.createElement("p");
  step2Title.innerHTML = "Estamos esperando confirmaci\u00F3n";

  let divLoading = document.createElement("div");
  divLoading.innerHTML = '<img src="./img/loading.gif" alt="loading">';

  let step2Text = document.createElement("p");
  step2Text.innerHTML = "Eleg\u00ED el medio de pago y confirm\u00E1 la transacci\u00F3n"

  step2Div.appendChild(step2Title);
  step2Div.appendChild(divLoading);
  step2Div.appendChild(step2Text);
  return step2Div;
}

function createStep3() {
  let step3Div = createElementWithClass("div", "modal-body-wrapper");
  step3Div.classList.add("hide");
  step3Div.id = "step-PAYING";

  let step3Text = document.createElement("p");
  step3Text.innerHTML = "Pago en proceso"

  let divLoadingStep3 = document.createElement("div");
  divLoadingStep3.innerHTML = '<img src="./img/loading.gif" alt="loading">';

  let step3TextUpper = document.createElement("p");
  step3TextUpper.innerHTML = "Estamos procesando tu pago,"

  let step3TextLower = document.createElement("p");
  step3TextLower.innerHTML = "te pedimos aguardar, puede demorar unos segundos."

  step3Div.appendChild(step3Text);
  step3Div.appendChild(divLoadingStep3);
  step3Div.appendChild(step3TextUpper);
  step3Div.appendChild(step3TextLower);
  return step3Div;
}

function createStep4() {
  let step4Div = createElementWithClass("div", "modal-body-wrapper");
  step4Div.classList.add("hide");
  step4Div.id = "step-PAYMENT_READY";

  let step4Title = document.createElement("p");
  step4Title.innerHTML = "\u00A1Listo!"
  let divImgStep4 = document.createElement("div");
  divImgStep4.innerHTML = '<img class="modal-ok-img" src="./img/ok.png" alt="ok">';

  step4Div.appendChild(step4Title);
  step4Div.appendChild(divImgStep4);
  return step4Div;
}

function createStepPaymentError() {
  let step = createElementWithClass("div", "modal-body-wrapper");
  step.classList.add("hide");
  step.id = "step-PAYMENT_DENIED";
  return step;
}

function createStepError() {
  let step = createElementWithClass("div", "modal-body-wrapper");
  step.classList.add("hide");
  step.id = "step-ERROR";
  return step;
}

function createStepExpired() {
  let step = createElementWithClass("div", "modal-body-wrapper");
  step.classList.add("hide");
  step.id = "step-EXPIRED";
  let stepTitle = document.createElement("p");
  stepTitle.innerHTML = "C\u00F3digo QR Expirado"

  let stepTextUpper = document.createElement("p");
  stepTextUpper.classList.add('bold');
  stepTextUpper.innerHTML = "Por favor gener\u00E1 un nuevo QR"
  let stepTextLower = document.createElement("p");
  stepTextLower.innerHTML = "para poder pagar"

  let stepImg = document.createElement('div')
  stepImg.innerHTML = '<img src="./img/expired_qr.png" alt="qr">';

  let stepButton = document.createElement('button');
  stepButton.innerHTML = 'Generar nuevo QR';
  stepButton.onclick = () => refreshQr();

  step.appendChild(stepTitle);
  step.appendChild(stepImg);
  step.appendChild(stepTextUpper);
  step.appendChild(stepTextLower);
  step.appendChild(stepButton);

  return step;
}


function createElementWithClass(elementName, className) {
  let element = document.createElement(elementName);
  element.className = className;
  return element;
}

function removeSelectedStep(status) {
  let arr = ['STARTED', 'PROCESSING', 'PAYING', 'PAYMENT_READY', 'PAYMENT_DENIED', 'ERROR', 'EXPIRED'];
  arr = arr.filter(function (item) {
    return item !== status
  });

  return arr;
}

function handleStatusChange(status) {
  const newClass = "modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-" + status;
  document.getElementById("selected-step").className = newClass;


  const stepsToHide = removeSelectedStep(status);
  stepsToHide.forEach(element => document.getElementById("step-" + element).className = "modal-body-wrapper hide");
  document.getElementById("step-" + status).className = "modal-body-wrapper show";
}

function closeModal() {
  clearAsyncInterval();
  let modal = document.getElementById('main_modal');
  document.body.removeChild(modal);
  initialized = false;
  modalProperties?.onClose();
}

function refreshQr() {
  closeModal();
  openModal(modalProperties);
}


let openModal = function (modalObject) {
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
    modalProperties = modalObject;
    initialized = true;
    buildHtml(modalObject.QRBase64);
    // setAsyncInterval(getStatus, 3000);
  }
}

async function getData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

const asyncIntervals = [];

const runAsyncInterval = async (cb, interval, intervalIndex) => {
  await cb();
  if (asyncIntervals[intervalIndex]) {
    setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval);
  }
};

const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === "function") {
    const intervalIndex = asyncIntervals.length;
    asyncIntervals.push(true);
    runAsyncInterval(cb, interval, intervalIndex);
    return intervalIndex;
  } else {
    throw new Error('Callback must be a function');
  }
};

const clearAsyncInterval = () => {
  if (asyncIntervals.length > 0) {
    asyncIntervals.forEach((item, index) => {
      if (asyncIntervals[index]) {
        asyncIntervals[index] = false;
      }
    })
  }
};

const getStatus = async () => {
  let response = await getData('https://api.develop.playdigital.com.ar/ecommerce/payment-intention/c529ce02-3b55-4e1b-b63b-55b5f94169a6?mocked_status={status}'
    .replace('{status}', mockStatus));
    setModalStatus(response.status);
}

const setModalStatus = (status) => {
  if(status == currentStatus) {
    return;
  }
  currentStatus = status;
  switch (status) {
    case 'STARTED':
      handleStatusChange(1);
      break;
    case 'PROCESSING':
      handleStatusChange(2);
      break;
    case 'PAYING':
      handleStatusChange(3);
      break;
    case 'PAYMENT_READY':
      handleStatusChange(4);
      break;
    case 'PAYMENT_DENIED':

      break;
    case 'ERROR':

      break;
    case 'EXPIRED':

      break;
    default:
      break;
  }
}