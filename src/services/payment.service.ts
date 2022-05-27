import { PaymentCreatedEvent } from '../dtos/payment';

type PaymentSource = 'vendor' | 'client';
type PaymentProcessor = 'vendorHandler' | 'clientHandler';

type PaymentSourceToProcessorMap = {
  [key in PaymentSource]: PaymentProcessor;
};

const PaymentSourceToProcessor: PaymentSourceToProcessorMap = {
  vendor: 'vendorHandler',
  client: 'clientHandler',
};

interface PaymentModel extends PaymentCreatedEvent {
  processedBy?: PaymentProcessor;
}

export class PaymentService {
  static toModel(paymentCreatedEvent: PaymentCreatedEvent): PaymentModel {
    const paymentProcessor: PaymentProcessor = PaymentSourceToProcessor[paymentCreatedEvent.paymentSource];

    return Object.assign(
      {},
      // add 'processedBy' field if there is a matching paymentProcessor
      paymentProcessor ? {
        processedBy: paymentProcessor,
      } : {},
      paymentCreatedEvent,
    );
  }
}
