import { Publisher, OrderCancelledEvent, Subjects } from "@ticketst/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
