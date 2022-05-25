import DynamoDB from 'aws-sdk/clients/dynamodb';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import { schema } from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const TableName = process.env.DYNAMODB_CUSTOMER_TABLE;

  const scanParams = {
    TableName,
  };

  const dynamodb = new DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  if (result.Count === 0) {
    return formatJSONResponse({ statusCode: 404 });
  }

  const items = result.Items.map((customer) => ({
    name: customer.primary_key,
    email: customer.email,
  }));
  const total = result.Count;

  return formatJSONResponse({
    response: {
      total,
      items,
    },
  });
};

export const main = middyfy(hello);
