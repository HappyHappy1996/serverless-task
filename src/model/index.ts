import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const dynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:5000',
    });
  }
  return new DynamoDB.DocumentClient();
};
