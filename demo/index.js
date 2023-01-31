/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
async function showModal() {
  const modalData = await getPaymentIntention();
  const modalObject = {
    qrString: modalData.qr,
    checkoutId: modalData.id,
    deeplink: {
      url: modalData.deeplink,
      callbackURL: 'tienda.com/checkout',
      callbackURLSuccess: 'tienda.com/success',
    },
    onSuccess() {
      console.log('onSuccess');
    },
    onFailure() {
      console.log('onFailure');
    },
    onCancel() {
      console.log('onCancel');
    },
    refreshData: getPaymentIntention,
    callbackURL: '',
  };

  GuatapaySDK.InitPayment(modalObject);
}
