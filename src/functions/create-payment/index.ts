import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';

export const createPayment: AWS['functions'][string] = {
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
