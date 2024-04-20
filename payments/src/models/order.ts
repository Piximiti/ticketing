import { OrderStatus } from "@ticketst/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface IOrder {
  _id: string;
  price: number;
  status: OrderStatus;
  userId: string;
}

interface OrderDoc extends mongoose.Document {
  price: number;
  status: OrderStatus;
  userId: string;
  version: number;
}

const orderSchema = new mongoose.Schema<OrderDoc>(
  {
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

const Order = mongoose.model("Order", orderSchema)<IOrder>;

export { Order };
