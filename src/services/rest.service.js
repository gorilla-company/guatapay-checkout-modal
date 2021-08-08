async function postData(url = '', data = {}) {
    const params = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer c53b1531-8e10-4b01-9c76-6482a33794a1',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };

    return await fetch(url, params);
  }

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
        return Promise.reject(response);
      })
      .catch((err) => {
        throw err;
      });

    // If there's no post, warn
    if (!result) return;

    return result;
  }

  export default {
    postData,
    getData
  };