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
    QRBase64: '...',
    checkoutId: '...',
    deeplink: '...',
    onSuccess: function() {console.log('onSuccess')},
    onFailure: function() {console.log('onFailure')},
    onClose: function() {console.log('onClose')},
    onCancel: function() {console.log('onCancel')},
    callbackURL: ''
}

openModal(modalOptions);
```
