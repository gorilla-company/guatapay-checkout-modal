
let initialized = false;
let currentStatus = 'IDLE'

function buildHtml(qrCode) {
  var link = document.createElement('link');
  link.rel = 'stylesheet'; 
  link.type = 'text/css';
  link.href = './styles.css';
  document.head.appendChild(link);

  // Section
  let section = createElementWithClass("section", "modal-wrapper");
  section.id="main_modal";
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
  let step1Div = createElementWithClass("div", "modal-body-wrapper");
  step1Div.id = "step-1";
  step1Title = document.createElement("p");
  step1Title.innerHTML = "Escanea el c\u00F3digo QR <br> Con la App MODO o desde tu App bancaria preferida";

  let qrContainer = createElementWithClass("div", "modal-body-qr-wrapper");
  qrContainer.innerHTML = '<img src="data:image/png;base64, {qrCode}"></img>'.replace('{qrCode}', qrCode);
  let disclaimerQuestion = document.createElement("p");
  disclaimerQuestion.innerHTML = '\u00BFC\u00F3mo pagar desde App MODO?';
  step1Div.appendChild(step1Title);
  step1Div.appendChild(qrContainer);
  step1Div.appendChild(disclaimerQuestion);


  let step2Div = createElementWithClass("div", "modal-body-wrapper");
  step2Div.classList.add("hide");
  step2Div.id = "step-2";

  let step3Div = createElementWithClass("div", "modal-body-wrapper");
  step3Div.classList.add("hide");
  step3Div.id = "step-3";


  let step4Div = createElementWithClass("div", "modal-body-wrapper");
  step4Div.classList.add("hide");
  step4Div.id = "step-4";


  // append items to hierarchy
  header.appendChild(divWrapper);
  section.appendChild(header);
  section.appendChild(navBar);
  section.appendChild(step1Div);
  section.appendChild(step2Div);
  section.appendChild(step3Div);
  section.appendChild(step4Div);

  document.body.appendChild(section);
}

function createElementWithClass(elementName, className) {
  let element = document.createElement(elementName);
  element.className = className;
  return element;
}

function removeSelectedStep(stepNum) {
  let arr = [1, 2, 3, 4];

  arr = arr.filter(function (item) {
    return item !== stepNum
  });

  return arr;
}

function handleClick(stepNum) {
  const newClass = "modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-" + stepNum;
  document.getElementById("selected-step").className = newClass;


  const stepsToHide = removeSelectedStep(stepNum);
  stepsToHide.forEach(element => document.getElementById("step-" + element).className = "modal-body-wrapper hide");
  document.getElementById("step-" + stepNum).className = "modal-body-wrapper show";
}

function closeModal() {
  clearAsyncInterval();
  let modal = document.getElementById('main_modal');
  document.body.removeChild(modal);
  initialized = false; 
}


var openModal = function (modalObject) {
  //   The modal object must have the following properties
  //   checkoutId
  //   QRBase64
  //   deeplink
  //   onSuccess
  //   onFailure
  //   onClose
  //   onCancel
  //   callbackURL
  console.log(modalObject.checkoutId);
  if (!initialized) {
    initialized = true;
    buildHtml(modalObject.QRBase64);
    setAsyncInterval(getStatus, 3000);
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
  if(asyncIntervals.length > 0) {
    asyncIntervals.forEach((item, index) => {
      if (asyncIntervals[index]) {
        asyncIntervals[index] = false;
      }
    })
  }
};

const getStatus = async () => {
  let response = await getData('https://api.develop.playdigital.com.ar/ecommerce/payment-intention/c529ce02-3b55-4e1b-b63b-55b5f94169a6?mocked_status={status}'
  .replace('{status}', currentStatus));
  console.log(response);
}