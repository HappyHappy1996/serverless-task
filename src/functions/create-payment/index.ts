import { AWS } from '@serverless/typescript';
import { handlerPath } from '../../libs/handler-resolver';
import schema from './schema';

export const createPayment: AWS['functions'][string] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/pay',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
