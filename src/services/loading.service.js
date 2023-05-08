let idArray = [];
let imagesLoaded = false;
let fontsLoaded = false;

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

function onElementLoadingCompleted(img, fonts) {
  if (img && fonts) {
    removeLoadingOverlay();
  }
}

function setFontsLoadedEvents() {
  document.fonts.ready.then(() => {
    fontsLoaded = true;
    onElementLoadingCompleted(imagesLoaded, fontsLoaded);
  });
}

function onImageLoaded(id) {
  const filteredArr = idArray.filter((e) => e !== id);
  if (filteredArr.length === 0) {
    imagesLoaded = true;
    onElementLoadingCompleted(imagesLoaded, fontsLoaded);
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
    if (currentImage) {
      currentImage.onload = (event) => {
        onImageLoaded(event.target.id);
      };
    }
  });
}

function initLoading() {
  imagesLoaded = true;
  fontsLoaded = false;

  idArray = [
    // 'img-question',
    // 'img-loading',
    // 'img-expired',
    // 'img-error',
    // 'img-spinner',
    // 'img-check',
    // 'img-qr',
    // 'img-step1',
  ];
  showLoadingOverlay();
  setImageLoadedEvents();
  setFontsLoadedEvents();
}

export default {
  initLoading,
  showLoadingOverlay,
  removeLoadingOverlay,
  onElementLoadingCompleted,
  onImageLoaded,
  imagesLoaded,
};
