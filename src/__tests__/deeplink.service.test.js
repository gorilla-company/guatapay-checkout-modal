import deeplinkService from "../services/deeplink.service";

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