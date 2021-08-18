async function showModal() {

    const modalData = await getPaymentIntention();
    var modalObject = {
        qrString: modalData.qr,
        checkoutId: modalData.id,
        deeplink:  {
            url: modalData.deeplink,
            callbackURL: 'tienda.com/checkout',
            callbackURLSuccess: 'tienda.com/success'
        },
        onSuccess: function () { console.log('onSuccess') },
        onFailure: function () { console.log('onFailure') },
        onCancel: function () { console.log('onCancel') },
        refreshData: getPaymentIntention,
        callbackURL: '',
    }

    ModoSDK.modoInitPayment(modalObject);
}

