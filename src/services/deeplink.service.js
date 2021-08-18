function redirectToDeeplink(modalObject) {
  const deeplinkObject = modalObject.deeplink;

  const url = `${deeplinkObject.url}qr={qr}&callback={callbackURL}&callbackSuccess={callbackURLSuccess}`;
  url.replace('{qr}', modalObject.qr)
    .replace('{callbackURL}', deeplinkObject.callbackURL)
    .replace('{callbackURLSuccess}', deeplinkObject.callbackURLSuccess);

  window.location.replace(url);
}

export default {
  redirectToDeeplink,
};
