import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const data = {
    id: "123",
    title: "concert",
    price: 20,
  };

  const publisher = new TicketCreatedPublisher(stan);
  await publisher.publish(data);
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
