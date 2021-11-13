import "dotenv/config";
import { RedisOptions } from "ioredis";

interface ICacheConfig {
  driver: string;
  config: { redis: RedisOptions };
}

export default {
  driver: "redis",
  config: {
    redis: {
      host: process.env.REDIS_URL,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    },
  },
} as ICacheConfig;
