import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const initDynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:5000',
    });
  }
  return new DocumentClient();
};
