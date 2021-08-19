  async function getData(url = '', data = {}) {
    const params = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    const result = await fetch(url, params)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject('error');
      })
      .catch((err) => {
        throw err;
      });

    // If there's no post, warn
    if (!result) return;

    return result;
  }

  export default {
    getData
  };