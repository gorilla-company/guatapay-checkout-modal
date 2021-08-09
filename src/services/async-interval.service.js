const runAsyncInterval = async (cb, interval, intervalIndex) => {
    await cb();
    if (asyncIntervals[intervalIndex].run) {
      asyncIntervals[intervalIndex].id = setTimeout(
        () => runAsyncInterval(cb, interval, intervalIndex),
        interval,
      );
    }
  };

  const setAsyncInterval = (cb, interval) => {
    if (cb && typeof cb === 'function') {
      const intervalIndex = asyncIntervals.length;
      asyncIntervals.push({ run: true, id: 0 });
      runAsyncInterval(cb, interval, intervalIndex);
      return intervalIndex;
    }
    throw new Error('Callback must be a function');
  };

  const clearAsyncInterval = () => {
    if (asyncIntervals.length > 0) {
      asyncIntervals.forEach((item, index) => {
        if (asyncIntervals[index].run) {
          clearTimeout(asyncIntervals[index].id);
          asyncIntervals[index].run = false;
        }
      });
    }
  };

  export {
    setAsyncInterval,
    clearAsyncInterval
  }