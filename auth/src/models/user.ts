import mongoose from "mongoose";
import { Password } from "../services/password";

interface IUser {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashed = await Password.toHash(user.password);
    user.password = hashed;
  }
  next();
});

const User = mongoose.model("User", userSchema)<IUser>;

export { User };
