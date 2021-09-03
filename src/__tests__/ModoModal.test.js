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
import {
  setAsyncInterval,
  clearAsyncInterval,
} from "../services/async-interval.service";
import modalService from "../services/modal.service";

import { async } from "regenerator-runtime/runtime";

const htmlPattern = /<(\"[^\"]*\"|'[^']*'|[^'\">])*>/;

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
      });
    });
  };
}

describe("Generate html", () => {
  test("it should create the step 1 html", () => {
    const step = createStep1();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test("it should create the step 2 html", () => {
    const step = createStep2();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test("it should create the step 3 html", () => {
    const step = createStep3();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test("it should create the step 4 html", () => {
    const step = createStep4();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test("it should create the payment error step html", () => {
    const step = createStepPaymentError();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test("it should create the expired error step html", () => {
    const step = createStepExpired();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test("it should create the header html", () => {
    const step = createHeader();
    expect(step.outerHTML).toMatch(htmlPattern);
  });

  test("it should create the navbar html", () => {
    const step = createNavBar();
    expect(step.outerHTML).toMatch(htmlPattern);
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
    expect(qrCodeService.generateQr("string")).not.toBeNull();
  });

  test("it should call the append function", async () => {
    const qrCodeTest = {
      getRawData: jest.fn(async (string) => {
        return "test data";
      }),
      append: jest.fn((object) => {}),
    };
    await qrCodeService.loadQr(qrCodeTest);
    expect(qrCodeTest.append.mock.calls.length).toBe(1);
  });
});

describe("Rest service", () => {
  it("it resolves the fetch correctly", async () => {
    const fakeData = { response: "ok" };
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData, true));

    const res = await restService.getData("");
    expect(res).toEqual({ data: fakeData });
    expect(fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
    delete global.fetch;
  });

  it("if status is not ok throws an error", async () => {
    const fakeData = { response: "ok" };
    global.fetch = jest
      .fn()
      .mockImplementation(setupFetchStub(fakeData, false));

    await restService.getData("").catch((e) => expect(e).toMatch("error"));
    global.fetch.mockClear();
    delete global.fetch;
  });
});

describe("Deeplink service", () => {
  let location;
  let mockLocation = new URL(
    "https://mockUrl.com/?qr=qrcode&callback=callbackURL&callbackSuccess=callbackURLSuccess"
  );

  beforeEach(() => {
    location = window.location;
    mockLocation.replace = jest.fn();
    delete window.location;
    window.location = mockLocation;
  });

  afterEach(() => {
    window.location = location;
  });

  const object = {
    qrString: "qrcode",
    deeplink: {
      url: "https://mockUrl.com/",
      callbackURL: "callbackURL",
      callbackURLSuccess: "callbackURLSuccess",
    },
  };

  test("it should return the deeplink url", async () => {
    const url = deeplinkService.buildDeepLink(object);

    expect(url).toEqual(
      "https://mockUrl.com/?qr=qrcode&callback=callbackURL&callbackSuccess=callbackURLSuccess"
    );
  });

  test("it should set the window location to the deeplink url", async () => {
    const url =
      "https://mockurl.com/?qr=qrcode&callback=callbackURL&callbackSuccess=callbackURLSuccess";
    deeplinkService.redirectToDeeplink(object);
    expect(window.location.href).toEqual(url);
  });
});

describe("Async Interval service", () => {
  jest.useFakeTimers();

  test("it should call the function", () => {
    const fn = jest.fn(async (string) => {
      return "test data";
    });
    setAsyncInterval(fn, 3000);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("it should throw an 'Callback must be a function' error", () => {
    const fn = {};
    expect(() => {
      setAsyncInterval(fn, 3000);
    }).toThrow("Callback must be a function");
  });

  test("it should clear the async intervals array", () => {
    const ai = clearAsyncInterval();
    ai.forEach((item) => {
      expect(item.run).toBe(false);
    });
  });

  // const flushPromises = () => new Promise(res => process.nextTick(res))

  // it('should call callback', async () => {
  //     const fn = jest.fn( async (string) => { return 'test data'} );

  //     setAsyncInterval(fn, 3000);

  //     jest.advanceTimersByTime(3000)
  //     await flushPromises();
  //     expect(fn).toHaveBeenCalledTimes(1)
  //   })
});

describe("Modal Service", () => {
  test.each`
    status          | expected
    ${"CREATED"}    | ${"STARTED"}
    ${"SCANNED"}    | ${"PROCESSING"}
    ${"PROCESSING"} | ${"PAYING"}
    ${"ACCEPTED"}   | ${"PAYMENT_READY"}
    ${"REJECTED"}   | ${"PAYMENT_DENIED"}
    ${"CANCELLED"}  | ${"PAYMENT_DENIED"}
    ${"ERROR"}      | ${"PAYMENT_DENIED"}
    ${"VOIDED"}     | ${"EXPIRED"}
  `("It should return the correct internal status", ({ status, expected }) => {
    const currentStatus = modalService.getCurrentInternalStatus(status);
    expect(currentStatus).toBe(expected);
  });

  test.each`
    status              | expected
    ${"STARTED"}        | ${"STARTED"}
    ${"PROCESSING"}     | ${"PROCESSING"}
    ${"PAYING"}         | ${"PAYING"}
    ${"PAYMENT_READY"}  | ${"PAYMENT_READY"}
    ${"PAYMENT_DENIED"} | ${"PAYMENT_DENIED"}
    ${"EXPIRED"}        | ${"EXPIRED"}
  `("It should return the correct internal status", ({ status, expected }) => {
    modalService.setCurrentStatus(status);
    const currentStatus = modalService.getCurrentStatus();
    expect(currentStatus).toBe(expected);
  });
});
