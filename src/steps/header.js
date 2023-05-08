import CloseBtn from '../img/close-btn.svg';
import svgLogo from '../img/guatapay-logo.svg';
import utilsService from '../services/utils.service';

function createHeader(closeModal) {
  const header = utilsService.createElementWithClass('header', 'modal-header-guatapay hide');
  document.createElement('header');
  const headerWrapper = utilsService.createElementWithClass('div', 'modal-header-wrapper');
  const logoWrapper = utilsService.createElementWithClass('div', 'modal-logo-wrapper');

  header.id = 'header';

  const imgLogo = document.createElement('img');
  imgLogo.id = 'imgLogo';
  imgLogo.src = svgLogo;
  imgLogo.alt = 'logo';

  logoWrapper.appendChild(imgLogo);

  const closeButton = document.createElement('button');
  closeButton.onclick = () => closeModal();
  const imgClose = document.createElement('img');
  imgClose.src = CloseBtn;
  imgClose.id = 'img-close';
  imgLogo.alt = 'close';
  closeButton.appendChild(imgClose);

  headerWrapper.appendChild(logoWrapper);
  headerWrapper.appendChild(closeButton);
  header.appendChild(headerWrapper);
  return header;
}

export default {
  createHeader,
};
