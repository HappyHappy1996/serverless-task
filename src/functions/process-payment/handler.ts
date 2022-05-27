import type { EventBridgeEvent } from 'aws-lambda';
import { initDynamoDBClient } from '../../db';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { PaymentCreatedEvent } from '../../dtos/payment';
import { PaymentService } from '../../services';
import { EVENTS } from '../../events';

const tableName: string = process.env.DYNAMODB_PAYMENT_TABLE;
const dynamoDBClient: DocumentClient = initDynamoDBClient();

export const main = async (event: EventBridgeEvent<EVENTS.PaymentCreated, PaymentCreatedEvent>): Promise<void> => {
  const paymentCreatedEvent: PaymentCreatedEvent = event.detail;

  const paymentModel = PaymentService.toModel(paymentCreatedEvent);

  const putParams = {
    TableName: tableName,
    Item: paymentModel,
  };

  await dynamoDBClient.put(putParams).promise();
};
