import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketst/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
