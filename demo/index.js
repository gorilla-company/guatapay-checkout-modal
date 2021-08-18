async function showModal() {
    let authData = await postData('https://merchants.preprod.playdigital.com.ar/merchants/middleman/token', { "username": "pablo", "password": "prueba" }, {'Authorization' : 'Basic prueba:cHJ1ZWJh'});
    
    const body = {
        "productName": "Compra en demo ecomerciar",
        "price": 550,
        "quantity": 1,
        "terminalId": "123",
        "storeId": "a32ccfce-561b-4543-b62e-0225aee702a8",
        "externalIntentionId": 1,
        "currency": "ARS"
    };

    // let modalData = await postData('https://merchants.preprod.playdigital.com.ar/merchants/ecommerce/payment-intention', body, {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWRjZTE4NS1iYmQ1LTRmOTgtOTMxMS05ZGUxMzkwNzgzOWYiLCJpYXQiOjE2MjkyMDU1NDMsImV4cCI6MTYyOTgxMDM0M30.mQ1wWW2s1TcOVGxQdIAKwgA8-nkdKW0zLuqKWfT7r84'});


    const modalData = {
        createdAt: "2021-08-17T13:10:41.323Z",
        expirationAt: 216000000,
        productName: "Compra en demo ecomerciar",
        price: 550,
        quantity: 1,
        storeId: "a32ccfce-561b-4543-b62e-0225aee702a8",
        externalIntentionId: 1,
        status: "CREATED",
        qr: "00020101021226540019ar.com.modo.decidir0127T00Im5LUDxxkPzUajblxXtI5HT352049001530303254035505802AR5907example6007example62640308999999990522r2D3jBa4jTBSMxbqbbh7PN0805OTHER100612345611035226304F8ED",
        paymentId: null,
        id: "caaf0978-2052-4076-9652-21f7985e370c",
        deeplink: "https://modo.com.ar/payment"
    }
    var modalObject = {
        // QRBase64: 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAACXklEQVR42uyXPW79KhDFD6JwyQ5gI+iyLReRsJTC2yJiI7ADly4Q52mc65ukh+j9pYzc/WQJhvk4B3/x70YkTyDkpJMqFnCG5ASyAqvOuXkPC2EG8o0n8Vxj8yHpBFgLZwxnkTedQvOqW1U7JpLYNHPuqnZXOYsA65vOmSkURRb3I9fjiFTIm5d4WImftTOOXDSTLXywAHA/q34YWSNPhBRyTo6sLOY+wG+RZYv7e0Ng/qi1KBby4ASyLjxjgg/pAeskDcd9tqEkbnET4qHYVVeF5jgmkIXbCqnRnKzqqvJ4luhgErkhNu89QrHSDIbgBLKcCzf4kJksoIp73nM0ifu+kzm3wGJh5eGeTzeWLNu6QjOTCa674nDcuR5L9n3fZGllUiqehs+nG022uGmmkFRR7NeswgSCSMloC/wga5eddb/dULJKa3mvG1SBhXWA+V0STyzvOScfumiN710ylEhv63wVab+2Gfmt68cRuSqgZcvUbq3i6wRjybLJFBFR83CUWQVwBpFmYNI5hUttyC7BDLIuUiGBSSpEsTjcGR1L4hk3eJGCoYjaAHlvmaFk2Xnq5nVOD+u6q+X4SsFIIpIiNg9/3bTKrDKcQNZ4xia7sYXaXbfuOF4zZCzZd+bk4RWLEklxYApZzhWhBTaoWln5Ep2/RSQu3aslA4qEMWYCufxcYBKfZeUMrz/GEvELMX36xu7kms8RP5o8/c+nz+qQ2XtMI6F53VVx3fGbXxhOMpMWn3XVx5dfGErk89BiDLrcFLh7YSi5/BxE3T6sY63lMMQE8hf/4/gvAAD//706oHZ7it2dAAAAAElFTkSuQmCC',
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
        refreshData: async function() { return await postData('https://merchants.preprod.playdigital.com.ar/merchants/ecommerce/payment-intention', body, {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWRjZTE4NS1iYmQ1LTRmOTgtOTMxMS05ZGUxMzkwNzgzOWYiLCJpYXQiOjE2MjkyMDU1NDMsImV4cCI6MTYyOTgxMDM0M30.mQ1wWW2s1TcOVGxQdIAKwgA8-nkdKW0zLuqKWfT7r84'}) },
        callbackURL: '',
    }

    ModoSDK.modoInitPayment(modalObject);

}

async function postData(url = '', data = {}, headers) {

    const params = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            ...headers
            // 'Authorization': 'Bearer c53b1531-8e10-4b01-9c76-6482a33794a1'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }

    return await fetch(url, params);
}

