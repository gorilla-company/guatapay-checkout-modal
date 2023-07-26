import utilsService from '../services/utils.service'

function createFooter() {
  const footer = utilsService.createElementWithClass('footer', 'modal-footer-guatapay')
  footer.innerHTML = 'Version 0.1.0'
  return footer
}

export default {
  createFooter
}
