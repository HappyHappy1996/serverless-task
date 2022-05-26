import { dynamoDBClient } from '../model';
import { PaymentService } from './payment.service';

export const paymentService = new PaymentService(dynamoDBClient());
