import { Publisher, OrderCreatedEvent, Subjects } from "@ticketst/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
