import mongoose, { Document, Model, Schema } from "mongoose";

export type NotificationAttributes = {
  phoneNumber: string;
  message: string;
};

export type NotificationDocument = Document & NotificationAttributes;

type NotificationModel = Model<NotificationDocument>;

const NotificationSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<NotificationDocument, NotificationModel>(
  "Notification",
  NotificationSchema
);
