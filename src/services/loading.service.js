let idArray = [];
let imagesLoaded = false;
let fontsLoaded = false;
let interval = {};

function onElementLoadingCompleted() {
  if (imagesLoaded && fontsLoaded) {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove("non-visible");
  }
}

function setFontsLoadedEvents() {
  interval = setInterval(fontLoadListener, 500);
}

function fontLoadListener() {
  let hasLoaded = document.fonts.check('12px "Red Hat Display"');
  if (hasLoaded) {
    fontsLoaded = true;
    onElementLoadingCompleted();
    clearInterval(interval);
  }
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

function hideAll() {
    
}

function initLoading() {
  idArray = [
    "img-question",
    "img-loading",
    "img-expired",
    "img-error",
    "img-spinner",
    "img-check",
  ];
  setImageLoadedEvents();
  setFontsLoadedEvents();
}

export default {
  initLoading,
};
