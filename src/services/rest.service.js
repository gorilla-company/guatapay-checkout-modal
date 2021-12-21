async function getData(url = '') {
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
      throw new TypeError();
    })
    .catch((err) => {
      throw err;
    });
  if (!result) return {};

  console.log('result:' + result);
  return result;
}

export default {
  getData,
};
