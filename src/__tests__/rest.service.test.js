import restService from "../services/rest.service";

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


describe("Rest service", () => {
    it("resolves the fetch correctly", async () => {
      const fakeData = { response: "ok" };
      global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData, true));
  
      const res = await restService.getData("");
      expect(res).toEqual({ data: fakeData });
      expect(fetch).toHaveBeenCalledTimes(1);
  
      global.fetch.mockClear();
      delete global.fetch;
    });
  
    it("should throw an error if status is not ok", async () => {
      const fakeData = { response: "ok" };
      global.fetch = jest
        .fn()
        .mockImplementation(setupFetchStub(fakeData, false));
  
      await restService.getData("").catch((e) => expect(e).toMatch("error"));
      global.fetch.mockClear();
      delete global.fetch;
    });
  });