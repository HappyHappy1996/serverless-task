import type { AWS } from '@serverless/typescript';

import * as functions from './src/functions';
import { resources } from './serverless/recources';

const serverlessConfiguration: AWS = {
  org: 'happymilitary',
  app: 'aws-node-http-api-project',
  service: 'serverless-task',
  frameworkVersion: '3',
  configValidationMode: 'error',

  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      DYNAMODB_PAYMENT_TABLE: '${self:service}-paymentTable-${sls:stage}',

      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:PutItem',
              'dynamodb:Get*',
              'dynamodb:Scan*',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: 'arn:aws:dynamodb:${aws:region}:${aws:accountId}:table/${self:service}-paymentTable-${sls:stage}',
          },
          {
            Effect: 'Allow',
            Action: [
              'events:DescribeEventBus',
              'events:PutEvents',
            ],
            Resource: 'arn:aws:events:${aws:region}:*:*',
          },
        ],
      },
    },
  },

  functions,
  resources,

  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: 'dev',
    },
  },
};

module.exports = serverlessConfiguration;
