import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

it("fetches the order", async () => {
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

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send({})
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error if a user tries to fetch another users order", async () => {
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
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(401);
});

it("returns an error if the order does not exists", async () => {
  const orderId = new mongoose.Types.ObjectId();
  await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});
