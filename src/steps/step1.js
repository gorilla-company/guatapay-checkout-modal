import svgQuestion from '../img/question-icon.svg';
import qrLogo from '../img/qrLogo.png';

function createStep1() {
    const step1Div = createElementWithClass('div', 'modal-body-wrapper');
    step1Div.id = 'step-STARTED';
    const step1Title = createElementWithClass('p', 'paragraph');
    step1Title.innerHTML = 'Escanea el código QR <br> Con la App MODO o desde tu App bancaria preferida.';
  
    const qrContainer = createElementWithClass('div', 'modal-body-qr-wrapper');
    qrContainer.innerHTML = '<div id="qrContainer"></div>';
  
    const questionContainer = createElementWithClass('div', 'question');
    questionContainer.innerHTML = '\u00BFC\u00F3mo pagar desde App <b>MODO</b>?';
  
    const toolTip = createElementWithClass('div', 'tooltip');
  
    const imgQuestion = document.createElement('img');
    imgQuestion.id = 'img-question';
    imgQuestion.src = svgQuestion;
    imgQuestion.alt = 'question';

    const imgQr = document.createElement('img');
    imgQr.id = 'img-qr';
    imgQr.src = qrLogo;
    imgQr.alt = 'qrcode';
    imgQr.classList.add('hide');
  
    const toolTipText = createElementWithClass('div', 'tooltiptext');
  
    const questionUl = document.createElement('ul');
    const questionLi1 = document.createElement('li');
    questionLi1.innerHTML = 'Descarg\u00E1 <span class="bold">MODO</span> en tu celular desde <span class="bold">App Store o Google Play</span>.';
  
    const questionLi2 = document.createElement('li');
    questionLi2.innerHTML = 'Registrate y vincul\u00E1 tus medios de pago.';
  
    const questionLi3 = document.createElement('li');
    questionLi3.innerHTML = 'Seleccion\u00E1 la opci\u00F3n \u201CPagar\u201D desde la secci\u00F3n \u201CInicio\u201D en <span class="bold">MODO</span>.';
  
    const questionLi4 = document.createElement('li');
    questionLi4.innerHTML = 'Escane\u00E1 el C\u00F3digo QR con tu celular.';
  
    const questionLi5 = document.createElement('li');
    questionLi5.innerHTML = 'Confirm\u00E1 el pago y ¡listo!';
  
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
    step1Div.appendChild(imgQr);
    return step1Div;
  }

  function createElementWithClass(elementName, className) {
    const element = document.createElement(elementName);
    element.className = className;
    return element;
  }

  export {
    createStep1
  };