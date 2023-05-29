# **Modal Usage Guide**

## **Introduction**

---

The Guatapay Modal is a front-end vanilla JavaScript component that allows ecommerce platforms to process Guatapay payment intentions via a modal. This modal can be integrated with an ecommerce platform's backend via the Guatapay ecommerce API.

### **Integration Flow**

---

To use the Guatapay Modal, ecommerce platforms must take the following actions when a customer chooses Guatapay as their payment method:

1. The ecommerce platform backend must call their own backend to create a payment intention and return the data.
2. The ecommerce platform must include the Guatapay Modal script in the page where the payment modal will be shown and initialized.
3. The ecommerce platform must initialize the Guatapay Modal by passing the necessary configuration options and callback functions, including the payment intention data returned from their backend.

### **Client Usage**

---

To use the Guatapay Modal, the client must include the following script in the page where the payment modal will be shown and initialized:

```html
<script
  src="http://guatapay-modal.conexa.ai/dist/bundle.js"
  charset="utf-8"
></script>
```

### Initializing

---

The client must create an object with the following configuration options and callback functions:

```jsx
const modalObject = {
  total: 12000,
  currency: 'COP',
  onSuccess() {},
  onFailure() {},
  onCancel() {},
  onQuotation: (currency) => {
    return {
      crypto: { amount: 0, fee: 0 },
      fiat: { amount: 0, fee: 0 },
    };
  },
  onPayment: (currency) => {
    return {
      qrString: 'bitcoin:1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2?amount=0.0001',
      paymentId: '642d6d8c47b735aad4170b2e',
      crypto: { amount: 0, fee: 0 },
      fiat: { amount: 0, fee: 0 },
    };
  },
};
```

The configuration options and callback functions include:

- **`total`** (required): The total amount of the order.
- **`currency`** (optional): The currency of the order.
- **`onSuccess`** (optional): The callback function to be executed when the payment is successful.
- **`onFailure`** (optional): The callback function to be executed when the payment fails.
- **`onCancel`** (optional): The callback function to be executed when the user cancels the payment.
- **`onQuotation`** (required): The callback function to be executed when the user selects a currency. It must return a quotation object.
- **`onPayment`** (required): The callback function to be executed when the user confirms a quotation. It must return a payment intention object.

Finally to open de modal call the **InitPayment** function provided by the injected bundle, passing the object previously explained as parameter.

```jsx
GuatapaySDK.InitPayment(modalObject);
```

### **Get a Quotation**

---

When the user selects a currency, the Guatapay Modal will call the **`onQuotation`** callback function passed in the modal configuration options. This function must call the ecommerce platform's backend to get a quotation for the payment intention.

Here's an example of what the **`onQuotation`** callback function might look like:

```jsx
onQuotation: (currency, total) => {
  const quotation = getQuotation(currency, total);
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
```

The **`onQuotation`** callback function must return an object with the following properties:

| Property | Required | Description                                     |
| -------- | -------- | ----------------------------------------------- |
| crypto   | Yes      | An object containing the crypto amount and fee. |
| fiat     | Yes      | An object containing the fiat amount and fee.   |

The **`crypto`** and **`fiat`** objects must have the following properties:

| Property | Required | Description                                |
| -------- | -------- | ------------------------------------------ |
| amount   | Yes      | The amount of crypto or fiat to be sent.   |
| fee      | Yes      | The fee of the crypto or fiat transaction. |

<aside>
💡 The ecommerce backend should call the **`/trades/market-quote`** endpoint of the **Guatapay API** to get a market quote by currency. The function should consume this endpoint by sending a POST request to the endpoint with the following parameters in the request body:

| Parameter | Required | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| currency  | Yes      | The currency to get the market quote for.        |
| amount    | Yes      | The amount of the currency to get the quote for. |

The API will respond with a JSON object containing the crypto and fiat amounts and fees, which the **`onQuotation`** function should format into the required object format and return to the Guatapay Modal.

</aside>

### \***\*Create a Payment Intention\*\***

---

When the user clicks the "Continue" button in the modal, the Guatapay Modal will call the **`onPayment`** callback function passed in the modal configuration options. This function must call the ecommerce platform's backend to create a payment intention.

Here's an example of what the **`onPayment`** callback function might look like:

```jsx
onPayment: (currency, total) => {
  const paymentIntention = createPaymentIntention(currency, total);
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

```

The **`onPayment`** callback function must return an object with the following properties:

| Property  | Required | Description                                                              |     |
| --------- | -------- | ------------------------------------------------------------------------ | --- |
| qrString  | Yes      | The QR string to be displayed in the modal.                              |
|           |
| paymentId | Yes      | The ID of the payment intention used to check the status of the payment. |
| crypto    | Yes      | An object containing the crypto amount and fee.                          |     |
| fiat      | Yes      | An object containing the fiat amount and fee.                            |     |

The **`crypto`** and **`fiat`** objects must have the following properties:

| Property | Required | Description                                |     |
| -------- | -------- | ------------------------------------------ | --- |
| amount   | Yes      | The amount of crypto or fiat to be sent.   |     |
| fee      | Yes      | The fee of the crypto or fiat transaction. |     |

<aside>
💡 The **`onPayment`** callback function should call the **`/payments/create-intent`** endpoint of the Guatapay ecommerce API to create a payment intention. The function should consume this endpoint by sending a POST request to the endpoint with the following parameters in the request body:

| Parameter | Required | Description                                                     |
| --------- | -------- | --------------------------------------------------------------- |
| currency  | Yes      | The currency to create the payment intention for.               |
| amount    | Yes      | The amount of the currency to create the payment intention for. |

The API will respond with a JSON object containing the payment intention details, including the address to send the payment to and the crypto and fiat amounts and fees, which the **`onPayment`** function should format into the required object format and return to the Guatapay Modal.

</aside>

# [See demo on Codepen](https://codepen.io/JoaquinSantar/pen/abaMmOE)
