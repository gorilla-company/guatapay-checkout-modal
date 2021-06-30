# Modo Modal

Stack: Vanilla JS

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
