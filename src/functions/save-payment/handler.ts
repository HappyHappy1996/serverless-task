import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import { paymentService } from '../../services';

import { Payment } from '../../model/payment';

import schema from './schema';
import { PaymentService } from '../../services/payment.service';

const endpoint: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const requestId = event.requestContext.requestId;

  console.log(requestId);

  const payment: Payment = {
    paymentSource: event.body.paymentSource,
    destination: event.body.destination,
    currency: event.body.currency,
    amount: event.body.amount,
  };
  await paymentService.save(PaymentService.toModel(requestId, payment));

  return formatJSONResponse({ statusCode: 201 });
};

export const main = middyfy(endpoint);
