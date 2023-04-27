# Guatapay Modal

Front-end vanilla js component to process Guatapay payment intentions via a modal

Stack: Vanilla JS

## Integration Flow

Ecommerce platforms that wishes to implement Guatapay payments with this frontend must also make use of the Guatapay ecommerce API from their backend.

When an order is being placed in the ecommerce platform, and the payment method chosen by the user is Guatapay, the ecommerce platform backend must take the following actions:

## Client Usage

The client must include the following script in the page where the payment modal will be shown and initialized

```html
<script src="http://guatapay-modal.conexa.ai/dist/bundle.js" charset="utf-8">
```

```js
function createPaymentIntention(currency) {
  // ... calls ecommerce own backend to create a áyment intetion and returns the data
}

function getQuotation(currency) {
  // ... calls ecommerce own backend to get a quotation and returns the data
}

const cartData = {
  total: 12000,
  currency: 'COP',
};

const modalObject = {
  total: cartData.total,
  currency: cartData.currency,
  onSuccess() {
    console.log('onSuccess');
  },
  onFailure() {
    console.log('onFailure');
  },
  onCancel() {
    console.log('onCancel');
  },
  onQuotation: async (currency) => {
    const quotation = await getQuotation(currency);
    const { crypto, fiat } = quotation;

    return {
      crypto: {
        amount: crypto.amount,
        fee: crypto.fee,
      },
      fiat: {
        amount: fiat.amount,
        fee: fiat.fee,
      },
    };
  },
  onPayment: async (currency) => {
    const paymentIntention = await createPaymentIntention(currency);
    const { qrString, paymentId, crypto, fiat } = paymentIntention;

    return {
      qrString,
      paymentId,
      crypto: {
        amount: crypto.amount,
        fee: crypto.fee,
      },
      fiat: {
        amount: fiat.amount,
        fee: fiat.fee,
      },
    };
  },
};

GuatapaySDK.InitPayment(modalObject);
```

### Options

| Option      | Required | Description                                                                                                                           |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| total       | Yes      | Total amount of the order                                                                                                             |
| currency    | Yes      | Currency of the order. Must be one of the following: `COP`                                                                            |
| onSuccess   | Yes      | Callback function to be executed when the payment is successful                                                                       |
| onFailure   | Yes      | Callback function to be executed when the payment fails                                                                               |
| onCancel    | Yes      | Callback function to be executed when the user cancels the payment                                                                    |
| onQuotation | Yes      | Callback function to be executed when the user selects a currency. It must return a quotation object. See below for quotation object. |
| onPayment   | Yes      | Callback function to be executed when the user selects a currency. It must return a payment intention object. See below for object.   |

### Quotation Object

| Option        | Required | Description                                 |
| ------------- | -------- | ------------------------------------------- |
| crypto        | Yes      | Object containing the crypto amount and fee |
| crypto.amount | Yes      | Amount of crypto to be sent                 |
| crypto.fee    | Yes      | Fee of the crypto transaction               |
| fiat          | Yes      | Object containing the fiat amount and fee   |
| fiat.amount   | Yes      | Amount of fiat to be sent                   |
| fiat.fee      | Yes      | Fee of the fiat transaction                 |

### Payment Intention Object

| Option        | Required | Description                                       |
| ------------- | -------- | ------------------------------------------------- |
| qrString      | Yes      | QR string to be shown to the user                 |
| paymentId     | Yes      | Payment ID to be used in the payment status check |
| crypto        | Yes      | Object containing the crypto amount and fee       |
| crypto.amount | Yes      | Amount of crypto to be sent                       |
| crypto.fee    | Yes      | Fee of the crypto transaction                     |
| fiat          | Yes      | Object containing the fiat amount and fee         |
| fiat.amount   | Yes      | Amount of fiat to be sent                         |
| fiat.fee      | Yes      | Fee of the fiat transaction                       |

## Development

### Install dependencies

```bash
npm install
```

### Build

```bash
npm run build:watch
```
