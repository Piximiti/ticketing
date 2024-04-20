import { Publisher, Subjects, PaymentCreatedEvent } from "@ticketst/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
