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

function copyToClipboard(str) {
  const el = document.createElement('textarea'); // Create a temporary textarea element
  el.value = str; // Set the value of the textarea to the string
  el.setAttribute('readonly', ''); // Make the textarea readonly
  el.style.position = 'absolute'; // Position the textarea off-screen
  el.style.left = '-9999px';
  document.body.appendChild(el); // Append the textarea to the document body
  el.select(); // Select the contents of the textarea
  document.execCommand('copy'); // Copy the selected text to the clipboard
  document.body.removeChild(el); // Remove the temporary textarea from the document body
}

export default {
  createElementWithClass,
  createElementWithId,
  copyToClipboard,
};
