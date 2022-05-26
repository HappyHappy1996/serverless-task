import { AWS } from '@serverless/typescript';


export const resources: AWS['resources'] =  {
  Resources: {
    PaymentTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: '${self:service}-paymentTable-${sls:stage}',
        AttributeDefinitions: [
          {
            AttributeName: 'requestId',
            AttributeType: 'S',
          },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        KeySchema: [
          {
            AttributeName: 'requestId',
            KeyType: 'HASH',
          },
        ],
      },
    },
  },
};
