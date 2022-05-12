## Serverless Task

### Objectives
This is a task aiming to validate basic understanding of :
- AWS services: Lambda/DynamoDB/EventBridge/API Gateway
- Serverless framework

### Diagram

#### API spec
```
```

#### Functions

- HTTP to eventbridge 
This function takes an API gateway request and propagates to eventbridge as a `PaymentCreated` event. 
Event format should be :
```
```

- Event handler 1 : `payment.source == 'orbital'`
On events where source is Orbital, we add a  a `processedBy:'handler2'` field to our payment and save it in a DynamoDB table

- Event handler 1 : `payment.source == 'client'`
On events where source is client, we add a `processedBy:'handler2'` field to our payment and save it in a DynamoDB table
