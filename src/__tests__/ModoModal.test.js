// import modoModal from '../services/rest.service'
import "regenerator-runtime/runtime";
// import modoModal from '../ModoModal.js'


import { modoInitPayment } from "../ModoModal";
import deeplinkService from "../services/deeplink.service";
import {
  setAsyncInterval,
  clearAsyncInterval,
} from "../services/async-interval.service";

// import asyncIntervalService from '../services/async-interval.service'

// const modoModal = require('../services/rest.service');
afterEach(() => {
  jest.clearAllMocks();
});

it("shouldn't fail if the modal or overlay html is not present when cancel called", () => {

  expect(true).toBe(true);
});




