/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

async function generateQuotation() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        crypto: {
          amount: 0.0001,
          fee: 0.00001,
        },
        fiat: {
          amount: 10000,
          fee: 1000,
        },
      });
    }, 2000);
  });
}

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
    onQuotation: async (currency) => {
      console.log('Quotation', currency);
      const quotation = await generateQuotation(currency);
      return quotation;
    },
    onPayment: async (payment) => {
      console.log('Payment', payment);
      const quotation = await generateQuotation(currency);

      return {
        qrString: 'bitcoin:1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2?amount=0.0001',
        paymentId: '642d6d8c47b735aad4170b2e',
        ...quotation,
      };
    },
  };

  GuatapaySDK.InitPayment(modalObject);
}
