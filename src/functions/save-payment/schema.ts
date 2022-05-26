export default {
  type: 'object',
  properties: {
    paymentSource: { type: 'string' },
    destination: { type: 'string' },
    currency: { type: 'string' },
    amount: { type: 'string' },
  },
  required: [
    'paymentSource',
    'destination',
    'currency',
    'amount',
  ],
} as const;
