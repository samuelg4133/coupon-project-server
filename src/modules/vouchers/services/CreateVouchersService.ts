import { generate } from "voucher-code-generator";

import Voucher, { VoucherDocument } from "./../infra/mongoose/schemas/Voucher";
import Service from "@shared/core/Service";
import Error from "@shared/core/Error";
import { endOfDay, isBefore } from "date-fns";

interface Request {
  expiration: Date;
  quantity: number;
}

export class CreateVoucherService implements Service<Request, void> {
  async execute({ expiration, quantity }: Request): Promise<void> {
    const expirationDate = endOfDay(expiration);

    if (isBefore(expirationDate, Date.now())) {
      throw new Error({
        message: "You cannot create an voucher at an earlier date.",
      });
    }

    // if (quantity > 1000) {
    //   throw new Error({
    //     message: "You cannot create most than 1000 vouchers per request.",
    //   });
    // }

    try {
      for (let i = 0; i < quantity; i++) {
        await Voucher.create({
          expiration: expirationDate,
          code: String(
            generate({
              length: 8,
              count: 1,
            })
          ).toUpperCase(),
        });
      }
    } catch {
      throw new Error({
        message: "Error on save vouchers.",
      });
    }
  }
}
