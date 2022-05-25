import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

interface JSONResponse {
  statusCode?: number;
  response?: Record<string, unknown>
}

export const formatJSONResponse = ({ response, statusCode = 200 }: JSONResponse) => {
  return {
    statusCode,
    body: JSON.stringify(response)
  }
}
