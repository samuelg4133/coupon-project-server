import Service from "@shared/core/Service";
import Voucher, { VoucherDocument } from "../infra/mongoose/schemas/Voucher";

interface Request {
  quantity: number;
}

export class ListNotBookedVouchersService
  implements Service<Request, VoucherDocument[]>
{
  async execute({ quantity }: Request): Promise<VoucherDocument[]> {
    const vouchers = await Voucher.find({
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

    return vouchers;
  }
}
