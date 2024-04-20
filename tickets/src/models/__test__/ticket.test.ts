import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  const ticket = new Ticket({
    title: "concert",
    price: 5,
    userId: "test",
  });

  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.price = 10;
  await firstInstance!.save();

  const expectedError = `No matching document found for id "${ticket.id}" version 0 modifiedPaths "price"`;

  await expect(async () => {
    secondInstance!.price = 15;
    await secondInstance!.save();
  }).rejects.toThrow(expectedError);
});

it("increments the version number of multiple saves", async () => {
  const ticket = new Ticket({
    title: "concert",
    price: 5,
    userId: "test",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  ticket.price = 10;
  await ticket.save();
  expect(ticket.version).toEqual(1);

  ticket.price = 15;
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
