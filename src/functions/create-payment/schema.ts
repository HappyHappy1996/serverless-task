import { PaymentSource } from '../../services/payment.service';

export default {
  type: 'object',
  properties: {
    paymentSource: { enum: PaymentSource },
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
