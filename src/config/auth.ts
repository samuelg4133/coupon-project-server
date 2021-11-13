import "dotenv/config";

export default {
  jwt: {
    secret: process.env.APP_SECRET_KEY,
    expiresIn: 60 * 30,
  },
};
