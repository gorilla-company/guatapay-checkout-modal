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

    // const qrContainer = document.getElementById('imgLogo');
    // qrContainer.onload = () => {
    //   modalContainer.style.visibility = "visible";
    // };
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
    image: 'iVBORw0KGgoAAAANSUhEUgAAAwoAAAMKCAYAAAAlOLMhAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAFB/SURBVHgB7d1dcNXnnSf4ByTx/iKwMQ2KYzmNY5uOMfYM8W4mNZGT6a692K2BudibrU7gZi8mPWV8sVUz2d0CLqZn7gzV01tbtReQnr3b2jZ9MTeTjq2uSrvWYUyE3QO2cYIcDI6NjWXehSTY8ztENj7/I9DLefm/fD5VKgF2YtBB0vme3+/7PItu1yQAAIAvHVmcAAAAGggKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgKAABAhqAAAABkCAoAAECGoAAAAGQICgAAQIagAAAAZAgK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',
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