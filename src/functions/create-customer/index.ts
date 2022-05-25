import { handlerPath } from '../../libs/handler-resolver';

export const createCustomer = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/',
      },
    },
  ],
};
