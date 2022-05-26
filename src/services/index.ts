import { dynamoDBClient } from '../db';
import { PaymentService } from './payment.service';

export const paymentService = new PaymentService(dynamoDBClient());
