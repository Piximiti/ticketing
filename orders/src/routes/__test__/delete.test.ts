import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@ticketst/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

it("marks an order as cancelled", async () => {
  const user = global.signin();

  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const ticket = new Ticket({
    _id: ticketId,
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send({})
    .expect(204);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("returns an error if a user tries to delete another users order", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const ticket = new Ticket({
    _id: ticketId,
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(401);
});

it("returns an error if the order does not exists", async () => {
  const orderId = new mongoose.Types.ObjectId();
  await request(app)
    .delete(`/api/orders/${orderId}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});

it("emits a order cancelled event", async () => {
  const user = global.signin();

  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const ticket = new Ticket({
    _id: ticketId,
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send({})
    .expect(204);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
