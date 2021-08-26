import CloseBtn from '../img/close-btn.svg';
import svgLogo from '../img/modo-logo.svg';
import {createElementWithClass} from '../services/build-html.service'

function createHeader(closeModal) {
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
    imgClose.id = "img-close";
    imgLogo.alt = 'close';
    closeButton.appendChild(imgClose);
  
    headerWrapper.appendChild(logoWrapper);
    headerWrapper.appendChild(closeButton);
    header.appendChild(headerWrapper);
    return header;
  }

  export {
      createHeader
  }