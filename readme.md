# Modo Modal

Front-end vanilla js component to process MODO payment intentions via a modal (on desktop) or deeplink (on mobile)

Stack: Vanilla JS

## Integration Flow

Ecommerce platforms that wishes to implement MODO payments with this frontend must also make use of the MODO ecommerce API from their backend.

When an order is being placed in the ecommerce platform, and the payment method chosen by the user is MODO, the ecommerce platform backend must take the folowing actions:

- Obtain an Access Token from the MODO API by passing its credentials (username and password) to the `/tokens` endpoint. 
- Create a `payment-intention` in the MODO API by passing the order details to the `POST /payment-intention` endpoint.
- Pass the `qr`, `id` and `deeplink` fields obtained from the created payment-intention back to its frontend, which must implement the code under the "Client Usage" section to present the user with the payment flow.
- After the payment has been procesed (status is accepted, rejected, etc) MODO will send a notification to the ecommerce platform backend, which must in turn send a request back to the MODO API in the `GET /payment-intention/{payment-intention-id}` endpoint to verify the status of the transaction and upate its database accordingly.

## Client Usage

```html
<script src="https://modo-modal.ecomerciar.com/dist/bundle.js" charset="utf-8">
```

```js

var options = {
    qrString: '...',
    checkoutId: '...',
    deeplink:  {
        url: '...',
        callbackURL: '...',
        callbackURLSuccess: '...'
    },
    onSuccess: function() {console.log('onSuccess')},
    onFailure: function() {console.log('onFailure')},
    onCancel: function() {console.log('onCancel')},
    callbackURL: ''
}

ModoSDK.modoInitPayment(options);
```

### Options

|Option |Required  | Description|
--- | --- | ---
|qrString|Yes|String. Payment Intention's "qr" value.|
|checkoutId|Yes|String. Payment Intention's "id" value.|
|deeplink|Yes|Object. Sub-properties will be used on mobile only. |
|deeplink.url|Yes|String. Payment Intention's "deeplink" value.|
|deeplink.callbackURL|Yes|String. URL to redirect to if payment fails.|
|deeplink.callbackURLSuccess|Yes|String. URL to redirect to if payment succeeds.|
|onSuccess|No|Function.|
|onFailure|No|Function.|
|onClose|No|Function.|
|onCancel|No|Function.|
|callbackURL|No|String. URL to redirect to if payment succeeds.|


# Development

## Install & Build

```
$ npm i
$ cp .env.example .env.production
# Fill in PAYMENT_STATUS_URL in .env.production with the URL of the /payment-intention/{intention-id} endpoint.
$ npm run build
```

Serve the `/dist` directory via https with CORS enabled for the `GET` method. 
