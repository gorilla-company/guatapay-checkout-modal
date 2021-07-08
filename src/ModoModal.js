import './styles.css';

import CloseBtn from './img/close-btn.svg';
import svgLogo from './img/modo-logo.svg';
import svgQuestion from './img/question-icon.svg';
import svgHourglass from './img/hourglass-icon.svg';
import svgSpinner from './img/spinner.svg';
import svgCheck from './img/check.svg';
import svgError from './img/error.svg';
import svgExpired from './img/expired.svg';
import qrLogo from './img/qrLogo.png';

import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Extension,
  Options
} from "qr-code-styling";


let modoModal = function() {
  console.log('modoModal()')
  window.exposed_1 = 'algo';

  let initialized = false;
  //this.mockStatus = 'STARTED'; 
  window.mockStatus = 'STARTED';// <-- this => window
  window.exposed_3 = 'algo'; // <-- no queda expuesto despues de usar this  
  let currentStatus = 'STARTED';
  let modalProperties = {};
  let checkoutId;
  let closeModalTimeout = {};

  function buildHtml(qrCode) {

    let overlay = createElementWithClass("div", "modo-overlay");
    overlay.id = "modo-overlay";

    // Section
    let modalContainer = createElementWithClass("div", "modal-container");
    modalContainer.id = 'modal-container';
    let section = createElementWithClass("section", "modal-wrapper");
    section.id = "main_modal";
    let header = document.createElement("header");
    let headerWrapper = createElementWithClass("div", "modal-header-wrapper");
    let logoWrapper = createElementWithClass("div", "modal-logo-wrapper");

    let spanLogo = createElementWithClass("span", "title-header");
    spanLogo.id = "title-header";
    spanLogo.innerHTML = 'Pag\u00E1 con ';
    let imgLogo = document.createElement('img');
    imgLogo.id = 'imgLogo';
    imgLogo.src = svgLogo;
    imgLogo.alt = 'logo';

    logoWrapper.appendChild(spanLogo);
    logoWrapper.appendChild(imgLogo);

    let closeButton = document.createElement("button");
    closeButton.onclick = () => closeModal();
    let imgClose = document.createElement('img');
    //imgClose.src = './img/close-btn.svg';
    imgClose.src = CloseBtn;
    imgLogo.alt = 'close';
    closeButton.appendChild(imgClose);

    headerWrapper.appendChild(logoWrapper);
    headerWrapper.appendChild(closeButton);

    // divWrapper.innerHTML = '<img src="./img/logo.jpg" alt="logo">';
    // let closeButton = document.createElement("button");
    // closeButton.innerHTML = 'X';
    // closeButton.onclick = () => closeModal();
    // divWrapper.appendChild(closeButton);

    // create navbar
    let navBar = createElementWithClass("nav", "wizard");
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
    header.appendChild(headerWrapper);
    section.appendChild(header);
    section.appendChild(navBar);
    section.appendChild(step1Div);
    section.appendChild(step2Div);
    section.appendChild(step3Div);
    section.appendChild(step4Div);

    section.appendChild(stepPaymentError);
    section.appendChild(stepError);
    section.appendChild(stepExpired);
    modalContainer.appendChild(section);

    document.body.appendChild(overlay);
    document.body.appendChild(modalContainer);

    const qrContainer = document.getElementById('imgLogo');
    qrContainer.onload = () => {
      modalContainer.style.visibility = "visible";
    };
  }

  
  function createStep1(qrString) {
    let step1Div = createElementWithClass("div", "modal-body-wrapper");
    step1Div.id = "step-STARTED";
    let step1Title = createElementWithClass("p", "paragraph");
    step1Title.innerHTML = "Escanea el código QR <br> Con la App MODO o desde tu App bancaria preferida";

    let qrContainer = createElementWithClass("div", "modal-body-qr-wrapper");
    qrContainer.innerHTML = '<div id="qrContainer"></div>';
    
    let questionContainer = createElementWithClass("div", "question");
    questionContainer.innerHTML = '\u00BFC\u00F3mo pagar desde App <b>MODO</b>';
    
    let toolTip = createElementWithClass("div", "tooltip");

    let imgQuestion = document.createElement('img');
    imgQuestion.src = svgQuestion;
    imgQuestion.alt = 'question';
    
    let toolTipText = createElementWithClass("div", "tooltiptext");

    let questionUl = document.createElement('ul');
    let questionLi1 = document.createElement('li');
    questionLi1.innerHTML = 'Descarg\u00E1 <span class="bold">MODO</span> en tu celular desde <span class="bold">App Store o Google Play</span>';
    
    let questionLi2 = document.createElement('li');
    questionLi2.innerHTML = 'Registrate y vincul\u00E1 tus medios de pago';

    let questionLi3 = document.createElement('li');
    questionLi3.innerHTML = 'Seleccion\u00E1 la opci\u00F3n \u201CPagar\u201D desde la secci\u00F3n \u201CInicio\u201D en <span class="bold">MODO</span>.';

    let questionLi4 = document.createElement('li');
    questionLi4.innerHTML = 'Escane\u00E1 el C\u00F3digo QR con tu celular';

    let questionLi5 = document.createElement('li');
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
    let step2Div = createElementWithClass("div", "modal-body-wrapper");
    step2Div.classList.add("hide");
    step2Div.id = "step-PROCESSING";

    let step2Title = createElementWithClass("p", "paragraph");
    step2Title.innerHTML = "Estamos esperando confirmaci\u00F3n";

    let divLoading = document.createElement("div");
    divLoading.classList.add("svg-icon");
    divLoading.classList.add("rotate");

    divLoading.innerHTML = '<img src={img} alt="loading">'.replace('{img}', svgHourglass);

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

    let step3Text = createElementWithClass("p", "subtitle");
    step3Text.innerHTML = "Pago en proceso"

    let divLoadingStep3 = document.createElement("div");
    divLoadingStep3.classList.add("svg-icon");
    divLoadingStep3.classList.add("spin");

    divLoadingStep3.innerHTML = '<img src={img} alt="loading">'.replace('{img}', svgSpinner);

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

    let stepTitle = createElementWithClass("p", "subtitle");
    stepTitle.innerHTML = "\u00A1Listo!"
    let divImg = createElementWithClass("div", "svg-icon");
    divImg.innerHTML = '<img src={img} alt="ok">'.replace('{img}', svgCheck);

    let paidTo = document.createElement("p");
    paidTo.innerHTML = "Pagaste a"

    let paidToName = document.createElement("p");
    paidToName.innerHTML = "{name}".replace('{name}', businessName);

    let paidPrice = document.createElement("p");
    paidPrice.innerHTML = "$ {price}".replace('{price}', price);

    let paymentNumberDiv = document.createElement("p");
    paymentNumberDiv.innerHTML = "En {paymentNumber} cuota".replace('{paymentNumber}', paymentNumber);

    let continueButton = createElementWithClass("button", "modo-btn-primary");
    continueButton.innerHTML = "Continuar";
    continueButton.onclick = () => finalize();


    step.appendChild(stepTitle);
    step.appendChild(divImg);
    step.appendChild(continueButton);
    // step.appendChild(paidTo);
    // step.appendChild(paidToName);
    // step.appendChild(paidPrice);
    // step.appendChild(paymentNumberDiv);

    return step;
  }

  function createStepPaymentError() {
    let step = createElementWithClass("div", "modal-body-wrapper");
    step.classList.add("hide");
    step.id = "step-PAYMENT_DENIED";

    let stepTitle = createElementWithClass("p", "subtitle");
    stepTitle.innerHTML = "Pago denegado"

    let stepImg = createElementWithClass("div", "svg-icon");
    stepImg.innerHTML = '<img src={img} alt="error">'.replace('{img}', svgError);

    let stepTextUpper = document.createElement("p");
    stepTextUpper.innerHTML = "<b>Lo sentimos, tu pago fue denegado</b>"
    let stepTextMiddle = document.createElement("p");
    stepTextMiddle.innerHTML = "Por favor gener\u00E1 un nuevo QR"
    let stepTextLower = document.createElement("p");
    stepTextLower.innerHTML = "Para volver a intentar"

    let stepButtonRefresh = document.createElement('button');
    stepButtonRefresh.classList.add("modo-btn-primary");
    stepButtonRefresh.classList.add("mt-55");
    stepButtonRefresh.classList.add("refresh-button");
    stepButtonRefresh.innerHTML = 'Generar nuevo QR';
    stepButtonRefresh.onclick = () => refreshQr();

    let cancelButton = createElementWithClass("button", "modo-btn-link");
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
    let step = createElementWithClass("div", "modal-body-wrapper");
    step.classList.add("hide");
    step.id = "step-ERROR";

    let stepTitle = createElementWithClass("p", "subtitle");
    stepTitle.innerHTML = "Error en el pago"

    let stepImg = createElementWithClass("div", "svg-icon")
    stepImg.innerHTML = '<img src={img} alt="error">'.replace('{img}', svgError);;

    let stepTextUpper = document.createElement("p");
    stepTextUpper.innerHTML = "<b>No pudimos procesar tu pago</b>"
    let stepTextMiddle = document.createElement("p");
    stepTextMiddle.innerHTML = "Por favor gener\u00E1 un nuevo QR"
    let stepTextLower = document.createElement("p");
    stepTextLower.innerHTML = "Para volver a intentar"

    let stepButtonRefresh = document.createElement('button');
    stepButtonRefresh.classList.add("modo-btn-primary");
    stepButtonRefresh.classList.add("mt-55");
    stepButtonRefresh.classList.add("refresh-button");
    stepButtonRefresh.innerHTML = 'Generar nuevo QR';
    stepButtonRefresh.onclick = () => refreshQr();
    let cancelButton = createElementWithClass("button", "modo-btn-link");
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
    let step = createElementWithClass("div", "modal-body-wrapper");
    step.classList.add("hide");
    step.id = "step-EXPIRED";
    let stepTitle = createElementWithClass("p", "subtitle");
    stepTitle.innerHTML = "C\u00F3digo QR Expirado";

    let stepImg = createElementWithClass("div", "svg-icon");
    stepImg.innerHTML = '<img src={img} alt="expired">'.replace('{img}', svgExpired);

    let stepTextUpper = document.createElement("p");
    stepTextUpper.innerHTML = "Por favor gener\u00E1 un nuevo QR"
    let stepTextLower = document.createElement("p");
    stepTextLower.innerHTML = "para poder pagar"

    let stepButton = document.createElement('button');
    stepButton.classList.add("modo-btn-primary");
    stepButton.classList.add("mt-75");
    stepButton.classList.add("refresh-button");
    stepButton.innerHTML = 'Generar nuevo QR';
    stepButton.onclick = () => refreshQr();

    let cancelButton = createElementWithClass("button", "modo-btn-link");
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
    removeModal();
    if(modalProperties.onClose) {
      modalProperties.onClose();
    }
  }

  function cancelModal() {
    removeModal();
    if(modalProperties.onCancel) {
      modalProperties.onCancel();
    }
  }

  function clearCloseModalTimeout() {
    clearTimeout(closeModalTimeout);
  }

  function finalize() {
    clearCloseModalTimeout();
    if(modalProperties.callbackURL) {
      window.location.replace(modalProperties.callbackURL);
    }
    else {
      removeModal();
    }
  }

  function removeModal() {
    clearAsyncInterval();
    let overlay = document.getElementById('modo-overlay');
    let modal = document.getElementById('modal-container');
    if(modal)
      document.body.removeChild(modal);
    if(overlay)
      document.body.removeChild(overlay);

    initialized = false;
  }

  async function refreshQr() {
    // disable refresh button
    let buttons = document.getElementsByClassName("refresh-button");
    for (let item of buttons) {
      item.disabled = true
    }
    let response = await postData('https://api.develop.playdigital.com.ar/ecommerce/payment-intention');
    // if(response) {
    //   modalProperties.qrCode = response.qrCode;
    //   modalProperties.deeplink = response.deeplink;
    // }
    console.log(response);
    removeModal();
    window.mockStatus = 'STARTED';
    modoInitPayment(modalProperties);
  }

  function detectMobile() {
    const isMobile = (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i));     
      return isMobile;
  }

  window.exposed_4 = 'algo';
  // this.modoInitPayment
  window.modoInitPayment = function (modalObject) {

    if(detectMobile()) {
      console.log('redirect to ' + modalObject.deeplink);
      return;
    }

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
      currentStatus = 'STARTED';
      modalProperties = modalObject;
      checkoutId = modalObject.checkoutId;
      initialized = true;

      let qrCode = generateQr(modalObject.qrString);
      buildHtml(qrCode);
      qrCode.append(document.getElementById("qrContainer"));
      setAsyncInterval(getStatus, 3000);
    }
  }

  function generateQr(qrString) {
  //   const qrCode = new QRCodeStyling({
  //     width: 200,
  //     height: 200,
  //     type: "svg",
  //     data: qrString,
  //     image: './img/qrLogo.png',
  //     dotsOptions: {
  //         color: "#fffffff",
  //         type: "rounded"
  //     },
  //     backgroundOptions: {
  //         color: "#e9ebee",
  //     },
  //     imageOptions: {
  //         crossOrigin: "anonymous",
  //         margin: 20
  //     }
  // });
  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: "0002010102125017001330-62017749-7512600220000068000000002222956520458125303032540410.05802AR5914PRUEBA QR DIMO6012VILLA GESELL610507165627001130000-000000000708396675605003APS51031.0520105312210112160106540210802139667560161046726626984021281807EuAu4cruerlUilEVOAtnrHoJD8eiSgLEb8gV1dwmOVOvuVyLz3YbVM4H/47xacol6QSj9fCc+VKb+0T8280o3Q/QZqwpayHN4b2wSolPTOOa/F+MmYQ//oFFBktruEWCLz2QsRYH3a60QQF9fcOhYXG068lCH2yUnl/83123xM+sVtCFYs=6304cc42",
    margin: 0,
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0
    },
    dotsOptions: {
      type: "rounded",
      color: "#121212",
      gradient: null
    },
    backgroundOptions: {
      color: "#ffffff"
    },
    image: qrLogo,
    dotsOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#6a1a4c",
        color2: "#6a1a4c",
        rotation: "0"
      }
    },
    cornersSquareOptions: {
      type: "square",
      color: "#121212"
    },
    cornersSquareOptionsHelper: {
      colorType: {
        single: true,
        gradient: false
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0"
      }
    },
    cornersDotOptions: {
      type: "square",
      color: "#121212"
    }
  });

  console.log(qrCode);
    return qrCode;
  }

  async function postData(url = '', data = {}) {

    const params = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer c53b1531-8e10-4b01-9c76-6482a33794a1'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }

    return await fetch(url, params);  
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
    let response = await getData('https://api.develop.playdigital.com.ar/ecommerce/payment-intention/{checkoutId}?mocked_status={status}'
      .replace('{checkoutId}', checkoutId)
      .replace('{status}', mockStatus));
    if(response) {
      setModalStatus(response.status);
    }
  }

  //window.setModalStatus = (status) => { //<-- this => window
  window.setModalStatus = (status) => {
    if (status == currentStatus) {
      return;
    }
    currentStatus = status;
    let spanLogo = document.getElementById('title-header');
    switch (status) {
      case 'STARTED':
        window.mockStatus = 'STARTED';
        spanLogo.innerHTML = 'Pag\u00E1 con ';
        handleStatusChange('STARTED');
        break;
      case 'PROCESSING':
        window.mockStatus = 'PROCESSING';
        spanLogo.innerHTML = 'Pagando con ';
        handleStatusChange('PROCESSING');
        break;
      case 'PAYING':
        window.mockStatus = 'PAYING';
        spanLogo.innerHTML = 'Pagando con ';
        handleStatusChange('PAYING');
        break;
      case 'PAYMENT_READY':
        window.mockStatus = 'PAYMENT_READY';
        if(modalProperties.onSuccess) {
          modalProperties.onSuccess();
        }
        closeModalTimeout = setTimeout(() => finalize(), 5000);
        spanLogo.innerHTML = 'Pagaste con ';
        clearAsyncInterval();
        handleStatusChange('PAYMENT_READY');
        break;
      case 'PAYMENT_DENIED':
        window.mockStatus = 'PAYMENT_DENIED';
        if(modalProperties.onFailure) {
          modalProperties.onFailure();
        }
        spanLogo.innerHTML = 'Pagando con ';
        clearAsyncInterval();
        handleStatusChange('PAYMENT_DENIED');
        break;
      case 'EXPIRED':
        window.mockStatus = 'EXPIRED';
        spanLogo.innerHTML = 'Pagando con ';
        clearAsyncInterval();
        handleStatusChange('EXPIRED');
        break;
      default:
        break;
    }
  }

}
//modoModal();

export default {
  modoModal: modoModal,
  testExpose: 'ok'
}

//export modoModal;