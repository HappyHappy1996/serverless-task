import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';
import { EVENTS, PAYMENT_EVENT_BUS } from '../../events';

export const processPayment: AWS['functions'][string]  = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus: PAYMENT_EVENT_BUS,
        pattern: {
          'detail-type': [
            EVENTS.PaymentCreated,
          ],
        },
      },
    },
  ],
};
