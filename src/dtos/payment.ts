export interface Payment {
  paymentSource: string;
  destination: string;
  currency: string;
  amount: string;
}

export interface PaymentCreatedEvent extends Payment {
  requestId: string;
}
