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
// import asyncIntervalService from '../services/async-interval.service'

// const modoModal = require('../services/rest.service');

describe("Generate html", () => {
  test("it should create the step 1 html", () => {
    const html = `<p class="paragraph">Escanea el código QR <br> Con la App MODO o desde tu App bancaria preferida</p><div class="modal-body-qr-wrapper"><div id="qrContainer"></div></div><div class="question">¿Cómo pagar desde App <b>MODO</b><div class="tooltip"><img src="[object Object]" alt="question"><div class="tooltiptext"><ul><li>Descargá <span class="bold">MODO</span> en tu celular desde <span class="bold">App Store o Google Play</span></li><li>Registrate y vinculá tus medios de pago</li><li>Seleccioná la opción “Pagar” desde la sección “Inicio” en <span class="bold">MODO</span>.</li><li>Escaneá el Código QR con tu celular</li><li>Confirmá el pago y listo!</li></ul></div></div></div>`;
    const step = createStep1();
    expect(step.innerHTML).toBe(html);
  });

  test("it should create the step 2 html", () => {
    const html = `<p class=\"paragraph\">Estamos esperando confirmación</p><div class=\"svg-icon rotate\"><img src=\"[object\" object]=\"\" alt=\"loading\"></div><p>Elegí el medio de pago y confirmá la transacción</p>`;
    const step = createStep2();
    expect(step.innerHTML).toBe(html);
  });

  test("it should create the step 3 html", () => {
    const html = `<p class=\"subtitle\">Pago en proceso</p><div class=\"svg-icon spin\"><img src=\"[object\" object]=\"\" alt=\"loading\"></div><p>Estamos procesando tu pago,</p><p>te pedimos aguardar, puede demorar unos segundos.</p>`;
    const step = createStep3();
    expect(step.innerHTML).toBe(html);
  });

  test("it should create the step 4 html", () => {
    const html = `<p class=\"subtitle\">¡Listo!</p><div class=\"svg-icon\"><img src=\"[object\" object]=\"\" alt=\"ok\"></div><button class=\"modo-btn-primary\">Continuar</button>`;
    const step = createStep4();
    expect(step.innerHTML).toBe(html);
  });

  test("it should create the payment error step html", () => {
    const html = `<p class=\"subtitle\">Pago denegado</p><div class=\"svg-icon\"><img src=\"[object\" object]=\"\" alt=\"error\"></div><p><b>Lo sentimos, tu pago fue denegado</b></p><p>Por favor generá un nuevo QR</p><p>Para volver a intentar</p><button class=\"modo-btn-primary mt-55 refresh-button\">Generar nuevo QR</button><button class=\"modo-btn-link\">Cancelar</button>`;
    const step = createStepPaymentError();
    expect(step.innerHTML).toBe(html);
  });

  test("it should create the expired error step html", () => {
    const html = `<p class=\"subtitle\">Código QR Expirado</p><div class=\"svg-icon\"><img src=\"[object\" object]=\"\" alt=\"expired\"></div><p>Por favor generá un nuevo QR</p><p>para poder pagar</p><button class=\"modo-btn-primary mt-75 refresh-button\">Generar nuevo QR</button><button class=\"modo-btn-link\">Cancelar</button>`;
    const step = createStepExpired();
    expect(step.innerHTML).toBe(html);
  });

  test("it should create the header html", () => {
    const html = `<div class=\"modal-header-wrapper\"><div class=\"modal-logo-wrapper\"><span class=\"title-header\" id=\"title-header\">Pagá con </span><img id=\"imgLogo\" src=\"[object Object]\" alt=\"close\"></div><button><img src=\"[object Object]\"></button></div>`;
    const step = createHeader();
    expect(step.innerHTML).toBe(html);
  });

  test("it should create the navbar html", () => {
    const html = `<div class=\"modal-nav-ball modal-nav-ball-selected\" id=\"selected-step\"></div><div class=\"modal-nav-ball\"></div><div class=\"modal-nav-ball\"></div><div class=\"modal-nav-ball\"></div><div class=\"modal-nav-ball\"></div>`;
    const step = createNavBar();
    expect(step.innerHTML).toBe(html);
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
    const overlay = '<div class="modo-overlay" id="modo-overlay"></div>'
    buildHtmlService.buildHtml();
    expect(document.getElementById("modo-overlay").outerHTML).toBe(overlay);
  });
});
