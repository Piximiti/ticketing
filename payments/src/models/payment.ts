import mongoose from "mongoose";

interface IPayment {
  orderId: string;
  stripeId: string;
}

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
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

const Payment = mongoose.model("Payment", paymentSchema)<IPayment>;

export { Payment };
