let idArray = [
  "img-question",
  "img-loading",
  "img-expired",
  "img-error",
  "img-spinner",
  "img-check",
];
let imagesLoaded = false;
let fontsLoaded = false;

function onElementLoadingCompleted() {
  if (imagesLoaded && fontsLoaded) {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove("hide");
  }
}

function setFontsLoadedEvents() {
  document.fonts.ready.then(function (font_face_set) {
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

function initLoading() {
  setImageLoadedEvents();
  setFontsLoadedEvents();
}

export default {
  initLoading,
};
