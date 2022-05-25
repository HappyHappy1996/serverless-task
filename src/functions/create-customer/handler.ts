import DynamoDB from 'aws-sdk/clients/dynamodb';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const dynamoDb = new DynamoDB.DocumentClient();

  const TableName = process.env.DYNAMODB_CUSTOMER_TABLE;
  const Item = {
    primary_key: event.body.name,
    email: event.body.email,
  };

  const putParams = {
    TableName,
    Item,
  };

  await dynamoDb.put(putParams).promise();

  return formatJSONResponse({ statusCode: 201 });
};

export const main = middyfy(hello);
