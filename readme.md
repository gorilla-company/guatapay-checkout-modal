# Modo Modal

Front-end vanilla js component to process Modo payment intentions via a modal (on desktop) or deeplink (on mobile)

Stack: Vanilla JS

## Install & Build

$ npm i
$ npm run build

## Usage

```html
<script src="https://modo-modal.ecomerciar.com/ModoModal.js">
```

```js

var modalOptions = {
    qrString: '...',
    checkoutId: '...',
    deeplink: '...',
    onSuccess: function() {console.log('onSuccess')},
    onFailure: function() {console.log('onFailure')},
    onClose: function() {console.log('onClose')},
    onCancel: function() {console.log('onCancel')},
    callbackURL: ''
}

modoInitPayment(modalOptions);
```

## Options

|Option |Required  | Description|
--- | --- | ---
|QRBase64|Yes|String.|
|checkoutId|Yes|String.|
|deeplink|Yes|String.|
|onSuccess|No|Function.|
|onFailure|No|Function.|
|onClose|No|Function.|
|onCancel|No|Function.|
|callbackURL|No|String.|
