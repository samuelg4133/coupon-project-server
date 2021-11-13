import { Request, Response } from "express";
import { parseISO } from "date-fns";
import path from "path";

import { CreateVoucherService } from "./../../../services/CreateVouchersService";

import { ListNotBookedVouchersService } from "@modules/vouchers/services/ListNotBookedVouchersService";
import { TakeAsBookedVouchersService } from "@modules/vouchers/services/TakeAsBookedVouchersService";

export class VoucherController {
  async index(req: Request, res: Response) {
    const { quantity: quantity } = req.query;

    const listNotBookedVouchers = new ListNotBookedVouchersService();

    const vouchers = await listNotBookedVouchers.execute({
      quantity: Number(quantity),
    });

    return res.json(vouchers);
  }
  async store(req: Request, res: Response) {
    const { expiration, quantity } = req.body;

    const createVouchers = new CreateVoucherService();

    await createVouchers.execute({
      expiration: parseISO(expiration),
      quantity,
    });

    return res.status(201).send({});
  }

  public async update(req: Request, res: Response) {
    const { quantity: quantity } = req.query;

    const takeAsBooked = new TakeAsBookedVouchersService();

    const updatedVouchers = await takeAsBooked.execute({
      quantity: Number(quantity),
    });

    return res.json(updatedVouchers);
  }
}
