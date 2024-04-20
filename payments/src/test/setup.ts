import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let mongo: MongoMemoryServer;

declare global {
  var signin: (id?: string) => string[];
}

jest.mock("../nats-wrapper");
process.env.STRIPE_KEY =
  "sk_test_51MdlxTLxL8s6yvJ1PwcZ4SsS0ZLYeB84JD1FfFXyV18xaXkxMDr9EV3GeoYXldlhdpQkIg9Eci9t6cAL7WKW7hf100TVEzII9U";

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) {
    await mongo.stop();
  }
});

global.signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");
  const cookie = `session=${base64}`;

  return [cookie];
};
