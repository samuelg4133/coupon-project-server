import "reflect-metadata";
import "dotenv/config";

import { errors } from "celebrate";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import "express-async-errors";

import "../mongoose/connection";
import routes from "./routes";

import { error } from "./middlewares/ErrorHandler";
import rateLimiter from "./middlewares/RateLimiter";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_WEB_URL,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(error);

app.listen(Number(process.env.APP_PORT), () => {
  console.log(
    `Server running on ${process.env.APP_URL}:${process.env.APP_PORT}`
  );
});
