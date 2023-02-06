function createElementWithClass(elementName, className) {
  const element = document.createElement(elementName);
  element.className = className;
  return element;
}

function createElementWithId(elementName, id) {
  const element = document.createElement(elementName);
  element.id = id;
  return element;
}

function copyToClipboard(text) {
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

export default {
  createElementWithClass,
  createElementWithId,
  copyToClipboard,
};
