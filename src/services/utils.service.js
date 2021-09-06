function createElementWithClass(elementName, className) {
  const element = document.createElement(elementName);
  element.className = className;
  return element;
}

export default {
  createElementWithClass,
};
