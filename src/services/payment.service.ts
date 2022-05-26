import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Payment } from '../model/payment';

type PaymentSource = 'vendor' | 'client';
type PaymentProcessor = 'vendorHandler' | 'clientHandler';

type PaymentSourceToProcessorMap = {
  [key in PaymentSource]: PaymentProcessor;
};

const PaymentSourceToProcessor: PaymentSourceToProcessorMap = {
  vendor: 'vendorHandler',
  client: 'clientHandler',
};

interface PaymentModel extends Payment {
  requestId: string;
  processedBy: PaymentProcessor;
}

export class PaymentService {
  private tableName: string = process.env.DYNAMODB_PAYMENT_TABLE;

  constructor(private docClient: DocumentClient) {}

  async save(model: PaymentModel): Promise<void> {
    const putParams = {
      TableName: this.tableName,
      Item: model,
    };

    await this.docClient.put(putParams).promise();
  }

  static toModel(requestId: string, payment: Payment): PaymentModel {
    return {
      requestId,
      processedBy: PaymentSourceToProcessor[payment.paymentSource],
      ...payment,
    };
  }
}
