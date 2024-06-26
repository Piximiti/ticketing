import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { indexOrderRouter } from "./routes";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";
import { deleteOrderRouter } from "./routes/delete";
import { currentUser, errorHandler, NotFoundError } from "@ticketst/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
