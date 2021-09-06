function buildDeepLink(modalObject) {
  const deeplinkObject = modalObject.deeplink;
  let url = `${deeplinkObject.url}?qr={qr}&callback={callbackURL}&callbackSuccess={callbackURLSuccess}`;
  url = url
    .replace('{qr}', modalObject.qrString)
    .replace('{callbackURL}', deeplinkObject.callbackURL)
    .replace('{callbackURLSuccess}', deeplinkObject.callbackURLSuccess);
  return url;
}

function redirectToDeeplink(modalObject) {
  const url = buildDeepLink(modalObject);
  window.location.href = url;
}

export default {
  redirectToDeeplink,
  buildDeepLink,
};
