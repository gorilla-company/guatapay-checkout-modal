/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function generateUUID() {
  let uuid = '';
  const hexValues = '0123456789abcdef';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4';
    } else {
      uuid += hexValues[Math.floor(Math.random() * hexValues.length)];
    }
  }
  return uuid;
}

async function showModal() {
  // const modalData = await getPaymentIntention();
  const modalData = {
    total: 12000,
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
    onQuotation: (currency) => {
      console.log('Quotation', currency);
      const random = Math.random() * 0.00021;
      return {
        crypto: {
          amount: 0.00012786 + random,
          fee: 0.00004 + random,
        },
        fiat: {
          amount: 12000,
          fee: 85 + random,
        },
      };
    },
    onPayment: (payment) => {
      console.log('Payment', payment);

      return {
        address: generateUUID(),
      };
    },
  };

  GuatapaySDK.InitPayment(modalObject);
}
