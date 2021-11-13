import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import Error from "@shared/core/Error";

const redisClient = redis.createClient({
  host: process.env.REDIS_URL,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 10,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new Error({ message: `Too many requests ${err}`, statusCode: 429 });
  }
}
