import qrCodeService from '../services/qr-code.service';

describe('Qr code service', () => {
  it('should return the qr code object', () => {
    expect(qrCodeService.generateQr('string')).not.toBeNull();
  });

  it('should call the append function', async () => {
    const qrCodeTest = {
      getRawData: jest.fn(async (string) => 'test data'),
      append: jest.fn(),
    };
    qrCodeService.loadQr(qrCodeTest)
    .then(() => {
      expect(qrCodeTest.append.mock.calls.length).toBe(1);
    });

  });
});
