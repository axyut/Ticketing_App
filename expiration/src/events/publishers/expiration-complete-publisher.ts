import {
    Subjects,
    Publisher,
    ExpirationCompleteEvent,
} from "@chillarcs/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
