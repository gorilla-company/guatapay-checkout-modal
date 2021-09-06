import buildHtmlService from '../services/build-html.service';

describe('Build Html service', () => {
  test.each`
      status              | expected
      ${'STARTED'}        | ${'Pag\u00E1 con '}
      ${'PAYMENT_READY'}  | ${'Pagaste con '}
      ${'PROCESSING'}     | ${'Pagando con '}
      ${'PAYING'}         | ${'Pagando con '}
      ${'PAYMENT_DENIED'} | ${'Pagando con '}
      ${'EXPIRED'}        | ${'Pagando con '}
    `(
    'It should set $expected when status is $status',
    ({ status, expected }) => {
      document.body.innerHTML = '<div id="title-header"></div>';
      buildHtmlService.setTitleByStatus(status);

      expect(document.getElementById('title-header').innerHTML).toBe(expected);
    },
  );

  test.each`
      status              | expected
      ${'STARTED'}        | ${['PROCESSING', 'PAYING', 'PAYMENT_READY', 'PAYMENT_DENIED', 'EXPIRED']}
      ${'PROCESSING'}     | ${['STARTED', 'PAYING', 'PAYMENT_READY', 'PAYMENT_DENIED', 'EXPIRED']}
      ${'PAYING'}         | ${['STARTED', 'PROCESSING', 'PAYMENT_READY', 'PAYMENT_DENIED', 'EXPIRED']}
      ${'PAYMENT_READY'}  | ${['STARTED', 'PROCESSING', 'PAYING', 'PAYMENT_DENIED', 'EXPIRED']}
      ${'PAYMENT_DENIED'} | ${['STARTED', 'PROCESSING', 'PAYING', 'PAYMENT_READY', 'EXPIRED']}
      ${'EXPIRED'}        | ${['STARTED', 'PROCESSING', 'PAYING', 'PAYMENT_READY', 'PAYMENT_DENIED']}
    `(
    'It should return an array witouth the status $status',
    ({ status, expected }) => {
      const arr = buildHtmlService.removeSelectedStep(status);

      expect(arr).toEqual(expected);
    },
  );

  it('should create the overlay html', () => {
    const overlay = '<div class="modo-overlay" id="modo-overlay"></div>';
    buildHtmlService.buildHtml();
    expect(document.getElementById('modo-overlay').outerHTML).toBe(overlay);
  });

  test('It should create the modal container html', () => {
    const overlay = '<div class="modal-container" id="modal-container"></div>';

    const div = document.getElementById('modal-container');
    const html = div.outerHTML.replace(div.innerHTML || '', '');

    buildHtmlService.buildHtml();
    expect(html).toBe(overlay);
  });

  test.each`
      status              | expected
      ${'STARTED'}        | ${'modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-STARTED'}
      ${'PROCESSING'}     | ${'modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-PROCESSING'}
      ${'PAYING'}         | ${'modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-PAYING'}
      ${'PAYMENT_READY'}  | ${'modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-PAYMENT_READY'}
      ${'PAYMENT_DENIED'} | ${'modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-PAYMENT_DENIED'}
      ${'EXPIRED'}        | ${'modal-nav-ball modal-nav-ball-selected modal-nav-ball-selected-step-EXPIRED'}
    `(
    'It should set the navbar class corresponding to the status $status',
    ({ status, expected }) => {
      buildHtmlService.handleStatusChange(status);
      expect(document.getElementById('selected-step').className).toBe(expected);
    },
  );

  test.each`
      status              | expected
      ${'STARTED'}        | ${'modal-body-wrapper show'}
      ${'PROCESSING'}     | ${'modal-body-wrapper show'}
      ${'PAYING'}         | ${'modal-body-wrapper show'}
      ${'PAYMENT_READY'}  | ${'modal-body-wrapper show'}
      ${'PAYMENT_DENIED'} | ${'modal-body-wrapper show'}
      ${'EXPIRED'}        | ${'modal-body-wrapper show'}
    `(
    "It should set the class of the step for the $status status to 'show'",
    ({ status, expected }) => {
      buildHtmlService.handleStatusChange(status);
      expect(document.getElementById(`step-${status}`).className).toBe(
        expected,
      );
    },
  );

  test.each`
      status              | expected
      ${'STARTED'}        | ${'modal-body-wrapper hide'}
      ${'PROCESSING'}     | ${'modal-body-wrapper hide'}
      ${'PAYING'}         | ${'modal-body-wrapper hide'}
      ${'PAYMENT_READY'}  | ${'modal-body-wrapper hide'}
      ${'PAYMENT_DENIED'} | ${'modal-body-wrapper hide'}
      ${'EXPIRED'}        | ${'modal-body-wrapper hide'}
    `(
    "It should set the class of the steps that are not $status status to 'hide'",
    ({ status, expected }) => {
      let arr = [
        'STARTED',
        'PROCESSING',
        'PAYING',
        'PAYMENT_READY',
        'PAYMENT_DENIED',
        'EXPIRED',
      ];
      arr = arr.filter((item) => item !== status);

      buildHtmlService.handleStatusChange(status);
      arr.forEach((element) => {
        expect(document.getElementById(`step-${element}`).className).toBe(
          expected,
        );
      });
    },
  );
});
