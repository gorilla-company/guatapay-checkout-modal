import svgCheck from '../img/check.svg';
import {createElementWithClass} from '../services/build-html.service'

function createStep4(finalize) {
    let step = createElementWithClass("div", "modal-body-wrapper");
    step.classList.add("hide");
    step.id = "step-PAYMENT_READY";
  
    let stepTitle = createElementWithClass("p", "subtitle");
    stepTitle.innerHTML = "\u00A1Listo!"
    let divImg = createElementWithClass("div", "svg-icon");

    const imgCheck = document.createElement('img');
    imgCheck.id = 'img-check';
    imgCheck.src = svgCheck;
    imgCheck.alt= "ok"
    divImg.appendChild(imgCheck);
  
    let continueButton = createElementWithClass("button", "modo-btn-primary");
    continueButton.innerHTML = "Continuar";
    continueButton.onclick = () => finalize();  
  
    step.appendChild(stepTitle);
    step.appendChild(divImg);
    step.appendChild(continueButton);
  
    return step;
  }

  export {
      createStep4
  }