
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

  let step4Div = createStep4('can & can', 1.650, 1);

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

function createStep4(businessName, price, paymentNumber) {
  let step = createElementWithClass("div", "modal-body-wrapper");
  step.classList.add("hide");
  step.id = "step-PAYMENT_READY";

  let stepTitle = document.createElement("p");
  stepTitle.innerHTML = "\u00A1Listo!"
  let divImg = document.createElement("div");
  divImg.innerHTML = '<img class="modal-ok-img" src="./img/ok.png" alt="ok">';

  let paidTo = document.createElement("p");
  paidTo.innerHTML = "Pagaste a"

  let paidToName = document.createElement("p");
  paidToName.innerHTML = "{name}".replace('{name}', businessName);

  let paidPrice = document.createElement("p");
  paidPrice.innerHTML = "$ {price}".replace('{price}', price);

  let paymentNumberDiv = document.createElement("p");
  paymentNumberDiv.innerHTML = "En {paymentNumber} cuota".replace('{paymentNumber}', paymentNumber);

  step.appendChild(stepTitle);
  step.appendChild(divImg);
  step.appendChild(paidTo);
  step.appendChild(paidToName);
  step.appendChild(paidPrice);
  step.appendChild(paymentNumberDiv);

  return step;
}

function createStepPaymentError() {
  let step = createElementWithClass("div", "modal-body-wrapper");
  step.classList.add("hide");
  step.id = "step-PAYMENT_DENIED";

  let stepTitle = document.createElement("p");
  stepTitle.innerHTML = "Pago denegado"

  let stepImg = document.createElement('div')
  stepImg.innerHTML = '<img src="./img/error.png" alt="qr">';

  let stepTextUpper = document.createElement("p");
  stepTextUpper.innerHTML = "Lo sentimos, tu pago fue denegado"
  let stepTextMiddle = document.createElement("p");
  stepTextMiddle.innerHTML = "Por favor gener\u00E1 un nuevo QR"
  let stepTextLower = document.createElement("p");
  stepTextLower.innerHTML = "Para volver a intentar"

  let stepButtonRefresh = document.createElement('button');
  stepButtonRefresh.innerHTML = 'Generar nuevo QR';
  stepButtonRefresh.onclick = () => refreshQr();

  let stepButtonCancel = document.createElement('button');
  stepButtonCancel.innerHTML = 'cancelar';
  stepButtonCancel.onclick = () => closeModal();

  step.appendChild(stepTitle);
  step.appendChild(stepImg);
  step.appendChild(stepTextUpper);
  step.appendChild(stepTextMiddle);
  step.appendChild(stepTextLower);
  step.appendChild(stepButtonRefresh);
  step.appendChild(stepButtonCancel);

  return step;
}

function createStepError() {
  let step = createElementWithClass("div", "modal-body-wrapper");
  step.classList.add("hide");
  step.id = "step-ERROR";

  let stepTitle = document.createElement("p");
  stepTitle.innerHTML = "Error en el pago"

  let stepImg = document.createElement('div')
  stepImg.innerHTML = '<img src="./img/error.png" alt="qr">';

  let stepTextUpper = document.createElement("p");
  stepTextUpper.innerHTML = "No pudimos procesar tu pago"
  let stepTextMiddle = document.createElement("p");
  stepTextMiddle.innerHTML = "Por favor gener\u00E1 un nuevo QR"
  let stepTextLower = document.createElement("p");
  stepTextLower.innerHTML = "Para volver a intentar"

  let stepButtonRefresh = document.createElement('button');
  stepButtonRefresh.innerHTML = 'Generar nuevo QR';
  stepButtonRefresh.onclick = () => refreshQr();

  let stepButtonCancel = document.createElement('button');
  stepButtonCancel.innerHTML = 'cancelar';
  stepButtonCancel.onclick = () => closeModal();

  step.appendChild(stepTitle);
  step.appendChild(stepImg);
  step.appendChild(stepTextUpper);
  step.appendChild(stepTextMiddle);
  step.appendChild(stepTextLower);
  step.appendChild(stepButtonRefresh);
  step.appendChild(stepButtonCancel);

  return step;
}

function createStepExpired() {
  let step = createElementWithClass("div", "modal-body-wrapper");
  step.classList.add("hide");
  step.id = "step-EXPIRED";
  let stepTitle = document.createElement("p");
  stepTitle.innerHTML = "C\u00F3digo QR Expirado"

  let stepTextUpper = document.createElement("p");
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
  currentStatus = 'STARTED';
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
    setAsyncInterval(getStatus, 3000);
  }
}

async function getData(url = '', data = {}) {
  const params = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }
  
  // const response = await fetch(url, params);
  // return response.json();


	let result = await fetch(url, params).then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).catch(function (err) {
		setModalStatus('ERROR');
	});

	// If there's no post, warn
	if (!result) return;

  return result;
}

const asyncIntervals = [];

const runAsyncInterval = async (cb, interval, intervalIndex) => {
  await cb();
  // if (asyncIntervals[intervalIndex]) {
  //   setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval);
  // }

  if (asyncIntervals[intervalIndex].run) {
    asyncIntervals[intervalIndex].id = setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval)
  }
};

const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === "function") {
    const intervalIndex = asyncIntervals.length;
    asyncIntervals.push({ run: true, id: 0 })
    runAsyncInterval(cb, interval, intervalIndex);
    return intervalIndex;
  } else {
    throw new Error('Callback must be a function');
  }
};

const clearAsyncInterval = () => {
  if (asyncIntervals.length > 0) {
    asyncIntervals.forEach((item, index) => {
      if (asyncIntervals[index].run) {
        clearTimeout(asyncIntervals[index].id)
        asyncIntervals[index].run = false
      }
    })
  }
};

const getStatus = async () => {
  let response = await getData('https://api.develop.playdigital.com.ar/ecommerce/payment-intention/c529ce02-3b55-4e1b-b63b-55b5f94169a6?mocked_status={status}'
    .replace('{status}', mockStatus));
  if(response) {
    setModalStatus(response.status);
  }
}

const setModalStatus = (status) => {
  if (status == currentStatus) {
    return;
  }
  currentStatus = status;
  switch (status) {
    case 'STARTED':
      handleStatusChange('STARTED');
      break;
    case 'PROCESSING':
      handleStatusChange('PROCESSING');
      break;
    case 'PAYING':
      handleStatusChange('PAYING');
      break;
    case 'PAYMENT_READY':
      clearAsyncInterval();
      handleStatusChange('PAYMENT_READY');
      break;
    case 'PAYMENT_DENIED':
      clearAsyncInterval();
      handleStatusChange('PAYMENT_DENIED');
      break;
    case 'ERROR':
      clearAsyncInterval();
      handleStatusChange('ERROR');
      break;
    case 'EXPIRED':
      clearAsyncInterval();
      handleStatusChange('EXPIRED');
      break;
    default:
      break;
  }
}