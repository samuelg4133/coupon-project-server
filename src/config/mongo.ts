interface MongoConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
  database: string;
}

export default {
  host: process.env.MONGO_URL || "localhost",
  port: Number(process.env.MONGO_PORT),
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  database: process.env.MONGO_DB,
} as MongoConfig;
