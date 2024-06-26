import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@ticketst/common";
import mongoose from "mongoose";
import { Order } from "../models/order";
import { param } from "express-validator";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  [
    param("orderId").custom((input: string) =>
      mongoose.Types.ObjectId.isValid(input)
    ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
