import { Publisher, Subjects, TicketUpdatedEvent } from "@chillarcs/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
