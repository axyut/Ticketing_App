import { Publisher, Subjects, TicketCreatedEvent } from "@chillarcs/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
