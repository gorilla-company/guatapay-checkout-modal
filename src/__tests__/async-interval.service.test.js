import {
  setAsyncInterval,
  clearAsyncInterval,
} from '../services/async-interval.service';

describe('Async Interval service', () => {
  jest.useFakeTimers();

  test('it should call the function', () => {
    const fn = jest.fn(async (string) => 'test data');
    setAsyncInterval(fn, 3000);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("it should throw an 'Callback must be a function' error", () => {
    const fn = {};
    expect(() => {
      setAsyncInterval(fn, 3000);
    }).toThrow('Callback must be a function');
  });

  test('it should clear the async intervals array', () => {
    const ai = clearAsyncInterval();
    ai.forEach((item) => {
      expect(item.run).toBe(false);
    });
  });
});
