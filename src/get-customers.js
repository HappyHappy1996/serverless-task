const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const TableName = process.env.DYNAMODB_CUSTOMER_TABLE;

  console.log(TableName);

  const scanParams = {
    TableName,
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
    };
  }

  const items = result.Items.map((customer) => {
    return {
      name: customer.primary_key,
      email: customer.email,
    };
  });
  const total = result.Count;

  return {
    statusCode: 200,
    body: JSON.stringify({
      total,
      items,
    }),
  };
};
