import { Subjects, Publisher, OrderCancelledEvent } from "@chillarcs/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
