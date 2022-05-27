import EventBridge from 'aws-sdk/clients/eventbridge';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { Payment } from '../../dtos/payment';
import schema from './schema';
import { EVENTS, PAYMENT_EVENT_BUS } from '../../events';

const eventBridgeClient = new EventBridge();

const endpoint: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const requestId = event.requestContext.requestId;

  const payment: Payment = {
    paymentSource: event.body.paymentSource,
    destination: event.body.destination,
    currency: event.body.currency,
    amount: event.body.amount,
  };

  const Detail = JSON.stringify({
    ...payment,
    requestId,
  });

  const params: EventBridge.Types.PutEventsRequest = {
    Entries: [
      {
        DetailType: EVENTS.PaymentCreated,
        Detail,
        EventBusName: PAYMENT_EVENT_BUS,
        Source: 'create-payment.handler',
        Time: new Date(),
      },
    ],
  };

  await eventBridgeClient.putEvents(params).promise();

  console.log('Successfully put a new event to event bus.');

  return formatJSONResponse({ statusCode: 201 });
};

export const main = middyfy(endpoint);
