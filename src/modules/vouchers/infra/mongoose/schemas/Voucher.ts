import mongoose, { Document, Model, Schema } from "mongoose";

export type VoucherAttributes = {
  code: string;
  active?: boolean;
  booked?: boolean;
  expiration: Date;
};

export type VoucherDocument = Document & VoucherAttributes;

type VoucherModel = Model<VoucherDocument>;

const VoucherSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
    expiration: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<VoucherDocument, VoucherModel>(
  "Voucher",
  VoucherSchema
);
