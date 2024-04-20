import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@ticketst/common";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const {
      id,
      status,
      userId,
      ticket: { price },
    } = data;
    const order = new Order({
      _id: id,
      status,
      userId,
      price,
    });
    await order.save();
    msg.ack();
  }
}
