function redirectToDeeplink(modalObject) {
  const url = buildDeepLink(modalObject);
  window.location.href = url;
}

function buildDeepLink(modalObject) {
  let deeplinkObject = modalObject.deeplink;
  let url = `${deeplinkObject.url}qr={qr}&callback={callbackURL}&callbackSuccess={callbackURLSuccess}`;
  url = url
    .replace("{qr}", modalObject.qrString)
    .replace("{callbackURL}", deeplinkObject.callbackURL)
    .replace("{callbackURLSuccess}", deeplinkObject.callbackURLSuccess);
  return url;
}

export default {
  redirectToDeeplink,
  buildDeepLink,
};
