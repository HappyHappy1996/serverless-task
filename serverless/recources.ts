import { AWS } from '@serverless/typescript';

export const resources: AWS['resources'] =  {
  Resources: {
    CustomerTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: '${self:service}-customerTable-${sls:stage}',
        AttributeDefinitions: [
          {
            AttributeName: 'primary_key',
            AttributeType: 'S',
          },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        KeySchema: [
          {
            AttributeName: 'primary_key',
            KeyType: 'HASH',
          },
        ],
      },
    },
  },
};
