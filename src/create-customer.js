const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const TableName = process.env.DYNAMODB_CUSTOMER_TABLE;
  const Item = {
    primary_key: body.name,
    email: body.email,
  };

  console.log(TableName);
  console.log(Item);

  const putParams = {
    TableName,
    Item,
  };

  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};
