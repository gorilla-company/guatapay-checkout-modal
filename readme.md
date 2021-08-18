# Modo Modal

Front-end vanilla js component to process Modo payment intentions via a modal (on desktop) or deeplink (on mobile)

Stack: Vanilla JS

## Install & Build

```
$ npm i
$ cp .env.example .env.production
# Fill in PAYMENT_STATUS_URL in .env.production
$ npm run build
```

## Client Usage

```html
<script src="https://modo-modal.ecomerciar.com/dist/bundle.js" charset="utf-8">
```

```js

var settings = {
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

ModoSDK.modoInitPayment(settings);
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
