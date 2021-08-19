// import modoModal from '../services/rest.service'
import "regenerator-runtime/runtime";
// import modoModal from '../ModoModal.js'
import { createStep1 } from "../steps/step1";
import { createStep2 } from "../steps/step2";
import { createStep3 } from "../steps/step3";
import { createStep4 } from "../steps/step4";
import { createStepPaymentError } from "../steps/paymentError";
import { createStepExpired } from "../steps/expired";
import { createHeader } from "../steps/header";
import { createNavBar } from "../steps/navBar";

import buildHtmlService from "../services/build-html.service";
import { modoInitPayment } from "../ModoModal";
import qrCodeService from "../services/qr-code.service";
import restService from "../services/rest.service";
import deeplinkService from "../services/deeplink.service";

import { async } from "regenerator-runtime/runtime";
// import asyncIntervalService from '../services/async-interval.service'

// const modoModal = require('../services/rest.service');
afterEach(() => {
  jest.clearAllMocks();
});

function setupFetchStub(data, isOk) {
  return function fetchStub(_url) {
    return new Promise((resolve) => {
      resolve({
        ok: isOk,
        json: () =>
          Promise.resolve({
            data,
          }),
      })
    })
  }
}

describe("Generate html", () => {
  test("it should create the step 1 html", () => {
    const html = `<div class=\"modal-body-wrapper\" id=\"step-STARTED\"><p class=\"paragraph\">Escanea el código QR <br> Con la App MODO o desde tu App bancaria preferida</p><div class=\"modal-body-qr-wrapper\"><div id=\"qrContainer\"></div></div><div class=\"question\">¿Cómo pagar desde App <b>MODO</b><div class=\"tooltip\"><img src=\"[object Object]\" alt=\"question\"><div class=\"tooltiptext\"><ul><li>Descargá <span class=\"bold\">MODO</span> en tu celular desde <span class=\"bold\">App Store o Google Play</span></li><li>Registrate y vinculá tus medios de pago</li><li>Seleccioná la opción “Pagar” desde la sección “Inicio” en <span class=\"bold\">MODO</span>.</li><li>Escaneá el Código QR con tu celular</li><li>Confirmá el pago y listo!</li></ul></div></div></div></div>`;
    const step = createStep1();
    expect(step.outerHTML).toBe(html);
  });

  test("it should create the step 2 html", () => {
    const html = `<div class=\"modal-body-wrapper hide\" id=\"step-PROCESSING\"><p class=\"paragraph\">Estamos esperando confirmación</p><div class=\"svg-icon rotate\"><img src=\"[object\" object]=\"\" alt=\"loading\"></div><p>Elegí el medio de pago y confirmá la transacción</p></div>`;
    const step = createStep2();
    expect(step.outerHTML).toBe(html);
  });

  test("it should create the step 3 html", () => {
    const html = `<div class=\"modal-body-wrapper hide\" id=\"step-PAYING\"><p class=\"subtitle\">Pago en proceso</p><div class=\"svg-icon spin\"><img src=\"[object\" object]=\"\" alt=\"loading\"></div><p>Estamos procesando tu pago,</p><p>te pedimos aguardar, puede demorar unos segundos.</p></div>`;
    const step = createStep3();
    expect(step.outerHTML).toBe(html);
  });

  test("it should create the step 4 html", () => {
    const html = `<div class=\"modal-body-wrapper hide\" id=\"step-PAYMENT_READY\"><p class=\"subtitle\">¡Listo!</p><div class=\"svg-icon\"><img src=\"[object\" object]=\"\" alt=\"ok\"></div><button class=\"modo-btn-primary\">Continuar</button></div>`;
    const step = createStep4();
    expect(step.outerHTML).toBe(html);
  });

  test("it should create the payment error step html", () => {
    const html = `<div class=\"modal-body-wrapper hide\" id=\"step-PAYMENT_DENIED\"><p class=\"subtitle\">Pago denegado</p><div class=\"svg-icon\"><img src=\"[object\" object]=\"\" alt=\"error\"></div><p><b>Lo sentimos, tu pago fue denegado</b></p><p>Por favor generá un nuevo QR</p><p>Para volver a intentar</p><button class=\"modo-btn-primary mt-55 refresh-button\">Generar nuevo QR</button><button class=\"modo-btn-link\">Cancelar</button></div>`;
    const step = createStepPaymentError();
    expect(step.outerHTML).toBe(html);
  });

  test("it should create the expired error step html", () => {
    const html = `<div class=\"modal-body-wrapper hide\" id=\"step-EXPIRED\"><p class=\"subtitle\">Código QR Expirado</p><div class=\"svg-icon\"><img src=\"[object\" object]=\"\" alt=\"expired\"></div><p>Por favor generá un nuevo QR</p><p>para poder pagar</p><button class=\"modo-btn-primary mt-75 refresh-button\">Generar nuevo QR</button><button class=\"modo-btn-link\">Cancelar</button></div>`;
    const step = createStepExpired();
    expect(step.outerHTML).toBe(html);
  });

  test("it should create the header html", () => {
    const html = `<header><div class=\"modal-header-wrapper\"><div class=\"modal-logo-wrapper\"><span class=\"title-header\" id=\"title-header\">Pagá con </span><img id=\"imgLogo\" src=\"[object Object]\" alt=\"close\"></div><button><img src=\"[object Object]\"></button></div></header>`;
    const step = createHeader();
    expect(step.outerHTML).toBe(html);
  });

  test("it should create the navbar html", () => {
    const html = `<nav class=\"wizard\"><div class=\"modal-nav-ball modal-nav-ball-selected\" id=\"selected-step\"></div><div class=\"modal-nav-ball\"></div><div class=\"modal-nav-ball\"></div><div class=\"modal-nav-ball\"></div><div class=\"modal-nav-ball\"></div></nav>`;
    const step = createNavBar();
    expect(step.outerHTML).toBe(html);
  });
});

describe("Html service", () => {
  test.each`
    status              | expected
    ${"STARTED"}        | ${"Pag\u00E1 con "}
    ${"PAYMENT_READY"}  | ${"Pagaste con "}
    ${"PROCESSING"}     | ${"Pagando con "}
    ${"PAYING"}         | ${"Pagando con "}
    ${"PAYMENT_DENIED"} | ${"Pagando con "}
    ${"EXPIRED"}        | ${"Pagando con "}
  `(
    "It should set $expected when status is $status",
    ({ status, expected }) => {
      document.body.innerHTML = '<div id="title-header"></div>';
      buildHtmlService.setTitleByStatus(status);

      expect(document.getElementById("title-header").innerHTML).toBe(expected);
    }
  );

  test.each`
    status              | expected
    ${"STARTED"}        | ${["PROCESSING", "PAYING", "PAYMENT_READY", "PAYMENT_DENIED", "EXPIRED"]}
    ${"PROCESSING"}     | ${["STARTED", "PAYING", "PAYMENT_READY", "PAYMENT_DENIED", "EXPIRED"]}
    ${"PAYING"}         | ${["STARTED", "PROCESSING", "PAYMENT_READY", "PAYMENT_DENIED", "EXPIRED"]}
    ${"PAYMENT_READY"}  | ${["STARTED", "PROCESSING", "PAYING", "PAYMENT_DENIED", "EXPIRED"]}
    ${"PAYMENT_DENIED"} | ${["STARTED", "PROCESSING", "PAYING", "PAYMENT_READY", "EXPIRED"]}
    ${"EXPIRED"}        | ${["STARTED", "PROCESSING", "PAYING", "PAYMENT_READY", "PAYMENT_DENIED"]}
  `(
    "It should return an array witouth the status $status",
    ({ status, expected }) => {
      const arr = buildHtmlService.removeSelectedStep(status);

      expect(arr).toEqual(expected);
    }
  );

  test("It should create the overlay html", () => {
    const overlay = '<div class="modo-overlay" id="modo-overlay"></div>';
    buildHtmlService.buildHtml();
    expect(document.getElementById("modo-overlay").outerHTML).toBe(overlay);
  });

  test("It should create the modal container html", () => {
    const overlay = '<div class="modal-container" id="modal-container"></div>';

    const div = document.getElementById("modal-container");
    const html = div.outerHTML.replace(div.innerHTML || "", "");

    buildHtmlService.buildHtml();
    expect(html).toBe(overlay);
  });

  test.each`
    status              | expected
    ${"STARTED"}        | ${"modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-STARTED"}
    ${"PROCESSING"}     | ${"modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-PROCESSING"}
    ${"PAYING"}         | ${"modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-PAYING"}
    ${"PAYMENT_READY"}  | ${"modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-PAYMENT_READY"}
    ${"PAYMENT_DENIED"} | ${"modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-PAYMENT_DENIED"}
    ${"EXPIRED"}        | ${"modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-EXPIRED"}
  `(
    "It should set the navbar class corresponding to the status $status",
    ({ status, expected }) => {
      buildHtmlService.handleStatusChange(status);
      expect(document.getElementById("selected-step").className).toBe(expected);
    }
  );

  test.each`
    status              | expected
    ${"STARTED"}        | ${"modal-body-wrapper show"}
    ${"PROCESSING"}     | ${"modal-body-wrapper show"}
    ${"PAYING"}         | ${"modal-body-wrapper show"}
    ${"PAYMENT_READY"}  | ${"modal-body-wrapper show"}
    ${"PAYMENT_DENIED"} | ${"modal-body-wrapper show"}
    ${"EXPIRED"}        | ${"modal-body-wrapper show"}
  `(
    "It should set the class of the step for the $status status to 'show'",
    ({ status, expected }) => {
      buildHtmlService.handleStatusChange(status);
      expect(document.getElementById(`step-${status}`).className).toBe(
        expected
      );
    }
  );

  test.each`
    status              | expected
    ${"STARTED"}        | ${"modal-body-wrapper hide"}
    ${"PROCESSING"}     | ${"modal-body-wrapper hide"}
    ${"PAYING"}         | ${"modal-body-wrapper hide"}
    ${"PAYMENT_READY"}  | ${"modal-body-wrapper hide"}
    ${"PAYMENT_DENIED"} | ${"modal-body-wrapper hide"}
    ${"EXPIRED"}        | ${"modal-body-wrapper hide"}
  `(
    "It should set the class of the steps that are not $status status to 'hide'",
    ({ status, expected }) => {
      let arr = [
        "STARTED",
        "PROCESSING",
        "PAYING",
        "PAYMENT_READY",
        "PAYMENT_DENIED",
        "EXPIRED",
      ];
      arr = arr.filter((item) => item !== status);

      buildHtmlService.handleStatusChange(status);
      arr.forEach((element) => {
        expect(document.getElementById(`step-${element}`).className).toBe(
          expected
        );
      });
    }
  );
});

describe("Qr code service", () => {
  test("it should return the qr code object", () => {

    expect(qrCodeService.generateQr('string')).not.toBeNull();
  });
});

describe("Rest service", () => {
  it('it resolves the fetch correctly', async () => {
    const fakeData = { response: 'ok' }
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData, true));
  
    const res = await restService.getData('');
    expect(res).toEqual({ data: fakeData })
    expect(fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
    delete global.fetch;
  })

  it('if status is not ok throws an error', async () => {
    const fakeData = { response: 'ok' }
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData, false));
  
    await restService.getData('').catch(e => expect(e).toMatch('error'));
    global.fetch.mockClear();
    delete global.fetch;
  });
});

describe("Deeplink service", () => {
  let location;
  let mockLocation = new URL("https://example.com");

  beforeEach(() => {
    location = window.location;
    mockLocation.replace = jest.fn();
    delete window.location;
    window.location = mockLocation;
  });

  afterEach(() => {
    window.location = location;
  });

  test('it should return the deeplink url', async () => {

    const object = {
      qrString: 'qrcode',
      deeplink: {
        url: 'mockUrl.com/',
        callbackURL: 'callbackURL',
        callbackURLSuccess: 'callbackURLSuccess'
      }
    }
    const url = deeplinkService.buildDeepLink(object);

    expect(url).toEqual('mockUrl.com/qr=qrcode&callback=callbackURL&callbackSuccess=callbackURLSuccess');
  })
});