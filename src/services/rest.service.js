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
  console.log('preFetch');
  const result = await fetch(url, params)
    .then((response) => {
      console.log('postFetch');

      if (response.ok) {
        return response.json();
      }
      throw new TypeError();
    })
    .catch((err) => {
      throw err;
    });
  if (!result) return {};

  return result;
}

export default {
  getData,
};
