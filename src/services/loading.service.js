let idArray = [];
let imagesLoaded = false;
let fontsLoaded = false;
let qrLoaded = false;

let interval = {};

function onElementLoadingCompleted() {
  if (imagesLoaded && fontsLoaded && qrLoaded) {
    removeLoadingOverlay();
  }
}

function onQrLoaded() {
  qrLoaded = true;
  onElementLoadingCompleted();
}

function setFontsLoadedEvents() {
  document.fonts.ready.then(function () {
    fontsLoaded = true;
    onElementLoadingCompleted();
  });
}

function setImageLoadedEvents() {
  let imgArr = [];
  idArray.forEach((id) => {
    imgArr.push(document.getElementById(id));
  });

  imgArr.forEach((element) => {
    element.onload = function (event) {
      onImageLoaded(event.target.id);
    };
  });
}

function onImageLoaded(id) {
  const filteredArr = idArray.filter((e) => e !== id);
  if (filteredArr.length === 0) {
    imagesLoaded = true;
    onElementLoadingCompleted();
  }
  idArray = filteredArr;
}

function showLoadingOverlay() {
  let step = document.getElementById("main_modal");
  step.classList.add("hide");

  let stepLoading = document.getElementById("loading-section");
  stepLoading.classList.remove("hide");
}

function removeLoadingOverlay() {
  let step = document.getElementById("main_modal");
  step.classList.remove("hide");

  let stepLoading = document.getElementById("loading-section");
  stepLoading.classList.add("hide");
}

function initLoading() {
  imagesLoaded = false;
  fontsLoaded = false;
  qrLoaded = false;

  idArray = [
    "img-question",
    "img-loading",
    "img-expired",
    "img-error",
    "img-spinner",
    "img-check",
    "img-qr",
  ];
  showLoadingOverlay();
  setImageLoadedEvents();
  setFontsLoadedEvents();
}

export default {
  initLoading,
  onQrLoaded,
};
