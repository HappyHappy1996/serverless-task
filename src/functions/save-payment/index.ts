import { handlerPath } from '../../libs/handler-resolver';

export const savePayment = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/pay',
      },
    },
  ],
};
