# Serverless Task

## Objectives
This is a task aiming to validate basic understanding of :
- AWS services: Lambda/DynamoDB/EventBridge/API Gateway
- [Serverless framework](https://www.serverless.com/)

![image](https://user-images.githubusercontent.com/83964075/168245520-a8b70d11-7092-46a7-a685-9d8f57da4b1b.png)

The goal of this task is to create a Payment API. The API takes a Payment as input (see spec below) and propagates it to an event bus (EventBridge).
Depending on the `paymentSource` field of that event, we'll then invoke one of 2 Lambda handlers and store the Payment in a database.

All the code should be in Typescript

Service should be deployable using `sls deploy` 

## Requirements

### API spec

```
POST /pay
{
  paymentSource:'client/vendor'
  destination:'orbital'
  currency: 'USD'
  amount: '123.45'
}
```

## Functions

### HTTP to Eventbridge 

This function takes an API gateway request and sends it to Eventbridge as a `PaymentCreated` event. 

For deduplication purposes, the event should contain the `awsRequestId` of the API Gateway event.

*Alternatively, you may use an API Gateway proxy integration and skip the lambda function.*

```
{
  detail: 'PaymentCreated'
  detail-type: {
    paymentSource:'client/vendor'
    destination:'orbital'
    currency: 'USD'
    amount: '123.45'
    requestId: xxx-yyyy-zzzz
  }
}
```

### Event handler 1 : `payment.paymentSource == 'vendor'`

On events where source is Orbital, we add a  a `processedBy:'vendorHandler'` field to our payment and save it in a DynamoDB table

### Event handler 1 : `payment.paymentSource == 'client'`

On events where source is client, we add a `processedBy:'clientHandler'` field to our payment and save it in a DynamoDB table

## Implementation

POST `/pay` lambda is available at https://pt84vrtsu8.execute-api.us-east-1.amazonaws.com/dev/pay

Instead of implementing 2 lambdas (`processVendorPayment` and `processClientPayment`) I decided to combine them into 1 `processPayment` lambda.

As for primary key of `paymentTable` DynamoDB table I used `requestId` of incoming requests to `create-payment` lambda from APIGateway.
