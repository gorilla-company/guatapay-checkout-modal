/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
async function showModal() {
  // const modalData = await getPaymentIntention();
  const modalData = {
    total: 158.5,
    currency: 'COP',
  };

  const modalObject = {
    total: modalData.total,
    currency: modalData.currency,
    onSuccess() {
      console.log('onSuccess');
    },
    onFailure() {
      console.log('onFailure');
    },
    onCancel() {
      console.log('onCancel');
    },
  };

  GuatapaySDK.InitPayment(modalObject);
}
