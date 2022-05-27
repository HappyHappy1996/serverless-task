import { PaymentCreatedEvent } from '../dtos/payment';

export enum PaymentSource {
  vendor = 'vendor',
  client = 'client',
}

type PaymentProcessor = 'vendorHandler' | 'clientHandler';

type PaymentSourceToProcessorMap = {
  [key in PaymentSource]: PaymentProcessor;
};

const PaymentSourceToProcessor: PaymentSourceToProcessorMap = {
  [PaymentSource.vendor]: 'vendorHandler',
  [PaymentSource.client]: 'clientHandler',
};

interface PaymentModel extends PaymentCreatedEvent {
  processedBy?: PaymentProcessor;
}

export class PaymentService {
  static toModel(paymentCreatedEvent: PaymentCreatedEvent): PaymentModel {
    return Object.assign(
      {},
      { processedBy: PaymentSourceToProcessor[paymentCreatedEvent.paymentSource] },
      paymentCreatedEvent,
    );
  }
}
