import { jest } from "@jest/globals";
import loadingService from "../services/loading.service";
import "core-js";
import svg from "../img/check.svg";

document.fonts = {
  ready: {
    then: jest.fn(async () => {
      return true;
    }),
  },
};

// it("shouldn't fail if the modal or overlay html is not present when cancel called", async () => {
//     const flushPromises = () => new Promise(setImmediate);
//   const testPromise = new Promise((resolve) => { resolve({}); });
//   document.fonts = {};
//   document.fonts.ready = {};
//   document.fonts.ready.then = jest.fn(async () => {
//     return true;
//   });

//   global.Image = class {
//     constructor() {
//       setTimeout(() => {
//         this.onload(); // simulate success
//       }, 5);
//     }
//   }

//   document.body.innerHTML =
//     '<div id="main_modal"></div> <div id="loading-section"></div>' +
//     '<div id="img-question" src="../img/check.svg"></div>' +
//     '<div id="img-loading"></div>' +
//     '<div id="img-expired"></div>' +
//     '<div id="img-error"></div>' +
//     '<div id="img-spinner"></div>' +
//     '<div id="img-check"></div>' +
//     '<div id="img-qr"></div>';

//   loadingService.initLoading();
//   await flushPromises();
// //   testPromise.resolve();
//   expect(true).toBe(true);
// });

it("shouldn run and make the loading classes visible and hide the rest", async () => {
  document.body.innerHTML =
    '<div id="main_modal"></div> <div id="loading-section"></div>' +
    '<div id="img-question"></div>' +
    '<div id="img-loading"></div>' +
    '<div id="img-expired"></div>' +
    '<div id="img-error"></div>' +
    '<div id="img-spinner"></div>' +
    '<div id="img-check"></div>' +
    '<div id="img-qr"></div>';

  loadingService.initLoading();

  const mainModal = document.getElementById("main_modal");
  const isMainHidden = mainModal.classList.contains("hide");
  const loadingSection = document.getElementById("loading-section");
  const isLoadingHidden = loadingSection.classList.contains("hide");
  expect(isMainHidden).toBe(true);
  expect(isLoadingHidden).toBe(false);
});

it("should make the loading classes hidden and show the main modal", async () => {
  document.body.innerHTML =
    '<div id="main_modal"></div> <div id="loading-section"></div>';

  loadingService.removeLoadingOverlay();

  const mainModal = document.getElementById("main_modal");
  const isMainHidden = mainModal.classList.contains("hide");
  const loadingSection = document.getElementById("loading-section");
  const isLoadingHidden = loadingSection.classList.contains("hide");
  expect(isMainHidden).toBe(false);
  expect(isLoadingHidden).toBe(true);
});

it("shouldn't remove the loading overlay if at least 1 element has not ended loading", async () => {
  document.body.innerHTML =
    '<div id="main_modal"></div> <div id="loading-section"></div>';
  const mainModal = document.getElementById("main_modal");
  const loadingSection = document.getElementById("loading-section");
  mainModal.classList.add("hide");
  loadingService.onElementLoadingCompleted(true, true, false);

  const isMainHidden = mainModal.classList.contains("hide");
  const isLoadingHidden = loadingSection.classList.contains("hide");
  expect(isMainHidden).toBe(true);
  expect(isLoadingHidden).toBe(false);
});

it("should remove the loading overlay if all elementes are done loading", async () => {
  document.body.innerHTML =
    '<div id="main_modal"></div> <div id="loading-section"></div>';
  const mainModal = document.getElementById("main_modal");
  const loadingSection = document.getElementById("loading-section");
  mainModal.classList.add("hide");

  loadingService.onElementLoadingCompleted(true, true, true);

  const isMainHidden = mainModal.classList.contains("hide");
  const isLoadingHidden = loadingSection.classList.contains("hide");
  expect(isMainHidden).toBe(false);
  expect(isLoadingHidden).toBe(true);
});

it("should set the imagesLoaded flag if all elements are done loading", async () => {
  document.body.innerHTML =
    '<div id="main_modal"></div> <div id="loading-section"></div>' +
    '<div id="img-question"></div>' +
    '<div id="img-loading"></div>' +
    '<div id="img-expired"></div>' +
    '<div id="img-error"></div>' +
    '<div id="img-spinner"></div>' +
    '<div id="img-check"></div>' +
    '<div id="img-qr"></div>';

  const idArray = [
    "img-question",
    "img-loading",
    "img-expired",
    "img-error",
    "img-spinner",
    "img-check",
    "img-qr",
  ];
  idArray.forEach((id, index) => {
    loadingService.onImageLoaded(id);
    if (idArray.length == index) {
      expect(loadingService.imagesLoaded).toBe(true);
    } else {
      expect(loadingService.imagesLoaded).toBe(false);
    }
  });
});

it("should disable the reload qr button", async () => {
  document.body.innerHTML =
    '<button id="refresh-button" class="refresh-button"></button>';

  const buttons = document.getElementsByClassName("refresh-button");
  loadingService.disableRefreshQrButton();
  for (const item of buttons) {
    expect(item.disabled).toBe(true);
  }
});
