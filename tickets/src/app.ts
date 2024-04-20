import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { indexTicketRouter } from "./routes";
import { showTicketRouter } from "./routes/show";
import { createTicketRouter } from "./routes/new";
import { updateTicketRouter } from "./routes/update";
import { currentUser, errorHandler, NotFoundError } from "@ticketst/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(indexTicketRouter);
app.use(showTicketRouter);
app.use(createTicketRouter);
app.use(updateTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
