import "dotenv/config";
import AWS from "aws-sdk";

const SMS = new AWS.SNS({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

export default SMS;
