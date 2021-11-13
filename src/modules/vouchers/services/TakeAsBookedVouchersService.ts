import Service from "@shared/core/Service";
import Voucher, { VoucherDocument } from "../infra/mongoose/schemas/Voucher";

interface Request {
  quantity: number;
}

export class TakeAsBookedVouchersService
  implements Service<Request, VoucherDocument[]>
{
  async execute({ quantity }: Request): Promise<VoucherDocument[]> {
    let vouchers = await Voucher.find({
      expiration: {
        $gte: new Date(Date.now()),
      },
    })
      .where("active")
      .equals(true)
      .where("booked")
      .equals(false)
      .sort({
        createdAt: "asc",
      })
      .limit(quantity);

    await Voucher.updateMany(
      {
        _id: {
          $in: vouchers.map((v) => v._id),
        },
      },
      {
        $set: {
          booked: true,
        },
      }
    );

    for (let i = 0; i < vouchers.length; i++) {
      vouchers[i].booked = true;
    }
    return vouchers;
  }
}
