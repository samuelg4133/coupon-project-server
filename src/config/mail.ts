import "dotenv/config";

interface IMailConfig {
  driver: "ethereal" | "ses";
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
}

export default {
  driver: String(process.env.MAIL_DRIVER),
  defaults: {
    from: {
      address: String(process.env.MAIL_ADDRESS),
      name: String(process.env.MAIL_NAME),
    },
  },
} as IMailConfig;
