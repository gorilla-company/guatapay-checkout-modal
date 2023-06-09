import utilsService from '../services/utils.service';

function createLoading() {
  const step = utilsService.createElementWithClass('div', 'modal-body-wrapper');
  const section = utilsService.createElementWithClass(
    'section',
    'modal-wrapper'
  );
  section.id = 'loading-section';

  step.id = 'step-LOADING';

  const title = utilsService.createElementWithClass('p', 'paragraph');
  const titleInvisible = utilsService.createElementWithClass('p', 'paragraph');
  title.classList.add('loading-paragraph');
  title.innerHTML = 'Cargando';
  titleInvisible.innerHTML = '.';
  titleInvisible.style = 'visibility: hidden';

  step.appendChild(title);
  step.appendChild(titleInvisible);
  section.appendChild(step);
  return section;
}

export default {
  createLoading,
};
