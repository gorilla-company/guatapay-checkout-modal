import modalService from '../services/modal.service';
import qrCodeService from '../services/qr-code.service';
jest.mock('../services/qr-code.service');

qrCodeService.generateQr.mockResolvedValue({
  data:true
});

document.fonts = {
  ready: {
    then: jest.fn(async () => true),
  },
};

function setupFetchStub(data, isOk) {
  return function fetchStub(_url) {
      return Promise.resolve({
        ok: isOk,
        json: () => Promise.resolve(
          data,
        ),
      });
  };
}

describe('Modal Service', () => {
  let location;
  const mockLocation = new URL(
    'https://mockUrl.com/?qr=qrcode&callback=callbackURL&callbackSuccess=callbackURLSuccess',
  );

  beforeEach(() => {
    location = window.location;
    delete window.location;
    window.location = mockLocation;
  });

  afterEach(() => {
    window.location = location;
  });

  const modalProperties = {
    onClose: jest.fn(),
    onCancel: jest.fn(),
    onSuccess: jest.fn(),
    onFailure: jest.fn(),
    callbackURL: 'https://mockurl.com/',
    checkoutId: 1234,
    refreshData: jest.fn(async () => ({ qrCode: 'testQr', deeplink: 'https://mockUrl.com/' })),
    deeplink: {
      url: 'https://mockUrl.com/',
      callbackURL: 'callbackURL',
      callbackURLSuccess: 'callbackURLSuccess',
    },
  };

  test.each`
    status          | expected
    ${'CREATED'}    | ${'STARTED'}
    ${'SCANNED'}    | ${'PROCESSING'}
    ${'PROCESSING'} | ${'PAYING'}
    ${'ACCEPTED'}   | ${'PAYMENT_READY'}
    ${'REJECTED'}   | ${'PAYMENT_DENIED'}
    ${'CANCELLED'}  | ${'PAYMENT_DENIED'}
    ${'ERROR'}      | ${'PAYMENT_DENIED'}
    ${'VOIDED'}     | ${'EXPIRED'}
    ${'NOT_EXISTING'} | ${'ERROR'}
  `('It should return the correct internal status', ({ status, expected }) => {
    const currentStatus = modalService.getCurrentInternalStatus(status);
    expect(currentStatus).toBe(expected);
  });

  it('should set and return the given status', () => {
    const status = 'CREATED';
    modalService.setCurrentStatus(status);
    const currentStatus = modalService.getCurrentStatus();
    expect(currentStatus).toBe('CREATED');
  });

  it('should set and return the given status', () => {
    modalService.setInitializedStatus(true);
    expect(modalService.getInitializedStatus()).toBe(true);
  });

  it('should execute the close function', () => {
    modalService.initService(modalProperties);
    modalService.closeModal();

    expect(modalProperties.onClose).toHaveBeenCalledTimes(1);
  });

  it("shouldn't throw exception when no close function is provided", () => {
    modalProperties.onClose = null;
    modalService.initService(modalProperties);
    document.body.innerHTML = '<div id="guatapay-overlay"></div> <div id="modal-container"></div>';

    modalService.closeModal();

    const overlay = document.getElementById('guatapay-overlay');
    const container = document.getElementById('modal-container');

    expect(overlay).toBe(null);
    expect(container).toBe(null);
  });

  it('should remove the modal from the html body when close called', () => {
    modalService.initService(modalProperties);

    document.body.innerHTML = '<div id="guatapay-overlay"></div> <div id="modal-container"></div>';

    modalService.closeModal();
    const overlay = document.getElementById('guatapay-overlay');
    const container = document.getElementById('modal-container');

    expect(overlay).toBe(null);
    expect(container).toBe(null);
  });

  it("shouldn't fail if the modal or overlay html is not present when close called", () => {
    modalService.initService(modalProperties);
    modalService.closeModal();
    const overlay = document.getElementById('guatapay-overlay');
    const container = document.getElementById('modal-container');

    expect(overlay).toBe(null);
    expect(container).toBe(null);
  });

  it('should execute the cancel function', () => {
    modalService.initService(modalProperties);
    modalService.cancelModal();

    expect(modalProperties.onCancel).toHaveBeenCalledTimes(1);
  });

  it("shouldn't throw exception when no cancel function is provided", () => {
    modalProperties.onCancel = null;
    modalService.initService(modalProperties);
    document.body.innerHTML = '<div id="guatapay-overlay"></div> <div id="modal-container"></div>';

    modalService.cancelModal();

    const overlay = document.getElementById('guatapay-overlay');
    const container = document.getElementById('modal-container');

    expect(overlay).toBe(null);
    expect(container).toBe(null);
  });

  it('should remove the modal from the html body when cancel called', () => {
    modalService.initService(modalProperties);

    document.body.innerHTML = '<div id="guatapay-overlay"></div> <div id="modal-container"></div>';

    modalService.cancelModal();
    const overlay = document.getElementById('guatapay-overlay');
    const container = document.getElementById('modal-container');

    expect(overlay).toBe(null);
    expect(container).toBe(null);
  });

  it("shouldn't fail if the modal or overlay html is not present when cancel called", () => {
    modalService.initService(modalProperties);
    modalService.cancelModal();
    const overlay = document.getElementById('guatapay-overlay');
    const container = document.getElementById('modal-container');

    expect(overlay).toBe(null);
    expect(container).toBe(null);
  });

  it('should relocate to the callback url provided', () => {
    modalService.initService(modalProperties);
    modalService.finalize();

    expect(window.location.href).toEqual(modalProperties.callbackURL);
  });

  it('should close the modal if no callback url is provided', () => {
    modalProperties.callbackURL = null;
    modalService.initService(modalProperties);
    modalService.finalize();

    const overlay = document.getElementById('guatapay-overlay');
    const container = document.getElementById('modal-container');

    expect(overlay).toBe(null);
    expect(container).toBe(null);
  });

  it('should return not null if the userAgent is mobile', () => {
    const navigator = { userAgent: 'Android' };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });

    const isMobile = modalService.detectMobile();
    expect(isMobile).not.toBe(null);
  });

  it('should return null if the userAgent is not mobile', () => {
    const navigator = { userAgent: 'Mozilla' };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });

    const isMobile = modalService.detectMobile();
    expect(isMobile).toBe(null);
  });

  it('should return the get status url', () => {
    modalService.initService(modalProperties);

    const url = modalService.buildStatusUrl();
    expect(url).toBe('https://mockUrl.com/1234?mocked_status=CREATED');
  });

  it('should navigate to the deeplink url', () => {
    const navigator = { userAgent: 'Android' };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });

    modalService.showModal(modalProperties);
    expect(window.location.href).toEqual('https://mockurl.com/?qr=undefined&callback=callbackURL&callbackSuccess=callbackURLSuccess');
  });

  it('should set the initialized flag on true', () => {
    const navigator = { userAgent: 'Mozilla' };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });

    modalService.showModal(modalProperties);
    const initialized = modalService.getInitializedStatus();

    expect(initialized).toBe(true);
  });

  it('should call the refresh qr function and replace the values of the modal object', async () => {
    const navigator = { userAgent: 'Mozilla' };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });
    modalService.showModal(modalProperties);

    await modalService.refreshQr();
    const initialized = modalService.getInitializedStatus();

    expect(modalProperties.refreshData).toHaveBeenCalledTimes(1);
    expect(initialized).toBe(true);
  });

  it('should send to the failed step if the request throws error', async () => {
    const navigator = { userAgent: 'Mozilla' };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });
    modalService.showModal(modalProperties);
    modalProperties.refreshData.mockImplementation(() => {
      throw new Error();
    });
    await modalService.refreshQr();
    const status = modalService.getCurrentStatus();

    expect(modalProperties.refreshData).toHaveBeenCalledTimes(1);
    expect(status).toBe('REJECTED');
  });

  it('should call the onSuccess function and stet the status to created', async () => {
    modalService.showModal(modalProperties);
    global.fetch = jest.fn().mockImplementation(setupFetchStub({ status: 'ACCEPTED' }, true));

    await modalService.getStatus();
    const status = modalService.getCurrentStatus();

    expect(modalProperties.onSuccess).toHaveBeenCalledTimes(1);
    expect(status).toBe('ACCEPTED');
  });

  it('should call the onFailure function and stet the status to created', async () => {
    modalService.showModal(modalProperties);
    global.fetch = jest.fn().mockImplementation(setupFetchStub({ status: 'ERROR' }, true));

    await modalService.getStatus();
    const status = modalService.getCurrentStatus();

    expect(modalProperties.onFailure).toHaveBeenCalledTimes(1);
    expect(status).toBe('ERROR');
  });
});
