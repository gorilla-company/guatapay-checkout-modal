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

export default {
  createElementWithClass,
  createElementWithId,
};
