import qrCodeService from "../services/qr-code.service";

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
  
