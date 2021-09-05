let idArray = [];
let imagesLoaded = false;
let fontsLoaded = false;
let qrLoaded = false;

function showLoadingOverlay() {
  const step = document.getElementById('main_modal');
  step.classList.add('hide');

  const stepLoading = document.getElementById('loading-section');
  stepLoading.classList.remove('hide');
}

function removeLoadingOverlay() {
  const step = document.getElementById('main_modal');
  step.classList.remove('hide');

  const stepLoading = document.getElementById('loading-section');
  stepLoading.classList.add('hide');
}

function onElementLoadingCompleted(img, fonts, qr) {
  if (img && fonts && qr) {
    removeLoadingOverlay();
  }
}

function onQrLoaded() {
  qrLoaded = true;
  onElementLoadingCompleted(imagesLoaded, fontsLoaded, qrLoaded);
}

function setFontsLoadedEvents() {
  document.fonts.ready.then(() => {
    fontsLoaded = true;
    onElementLoadingCompleted(imagesLoaded, fontsLoaded, qrLoaded);
  });
}

function onImageLoaded(id) {
  const filteredArr = idArray.filter((e) => e !== id);
  if (filteredArr.length === 0) {
    imagesLoaded = true;
    onElementLoadingCompleted(imagesLoaded, fontsLoaded, qrLoaded);
  }
  idArray = filteredArr;
}

function setImageLoadedEvents() {
  const imgArr = [];
  idArray.forEach((id) => {
    imgArr.push(document.getElementById(id));
  });

  imgArr.forEach((element) => {
    const currentImage = element;
    currentImage.onload = (event) => {
      onImageLoaded(event.target.id);
    };
  });
}

function disableRefreshQrButton() {
  const buttons = document.getElementsByClassName('refresh-button');
  for (const item of buttons) {
    item.disabled = true;
  }
}

function initLoading() {
  imagesLoaded = false;
  fontsLoaded = false;
  qrLoaded = false;

  idArray = [
    'img-question',
    'img-loading',
    'img-expired',
    'img-error',
    'img-spinner',
    'img-check',
    'img-qr',
  ];
  showLoadingOverlay();
  setImageLoadedEvents();
  setFontsLoadedEvents();
}

export default {
  initLoading,
  onQrLoaded,
  showLoadingOverlay,
  removeLoadingOverlay,
  onElementLoadingCompleted,
  onImageLoaded,
  disableRefreshQrButton,
  imagesLoaded,
};
