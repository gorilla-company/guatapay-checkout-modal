// import modoModal from '../services/rest.service'
import 'regenerator-runtime/runtime'
// import modoModal from '../ModoModal.js'
import {createStep1} from '../steps/step1';

// import asyncIntervalService from '../services/async-interval.service'

// const modoModal = require('../services/rest.service');

describe('Generate html', () => {
    test('it should create the step 1 html', () => {

      const html = `<p class="paragraph">Escanea el código QR <br> Con la App MODO o desde tu App bancaria preferida</p><div class="modal-body-qr-wrapper"><div id="qrContainer"></div></div><div class="question">¿Cómo pagar desde App <b>MODO</b><div class="tooltip"><img src="[object Object]" alt="question"><div class="tooltiptext"><ul><li>Descargá <span class="bold">MODO</span> en tu celular desde <span class="bold">App Store o Google Play</span></li><li>Registrate y vinculá tus medios de pago</li><li>Seleccioná la opción “Pagar” desde la sección “Inicio” en <span class="bold">MODO</span>.</li><li>Escaneá el Código QR con tu celular</li><li>Confirmá el pago y listo!</li></ul></div></div></div>`;
      const step1 = createStep1();
      expect(step1.innerHTML).toBe(html);
    })
  })