import { handlerPath } from '../../libs/handler-resolver';

export const getCustomers = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/',
      },
    },
  ],
};
