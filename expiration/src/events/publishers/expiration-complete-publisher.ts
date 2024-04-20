import { Publisher, ExpirationCompleteEvent, Subjects } from "@ticketst/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
