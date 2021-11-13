import { ListActualCouponsService } from "./../../../services/ListActualCouponsService";
import { CreateCouponService } from "./../../../services/CreateCouponService";
import { Request, Response } from "express";

export class CouponController {
  public async index(req: Request, res: Response) {
    const { per_page: perPage, page: page, name: name } = req.query;

    const actualCoupons = new ListActualCouponsService();

    const result = await actualCoupons.execute({
      page: Number(page),
      perPage: Number(perPage),
    });

    return res.json(result);
  }

  public async store(req: Request, res: Response) {
    const {
      employee,
      company,
      voucher,
      name,
      cpf,
      phone,
      email,
      address: { place, number, zipCode, district, city, state },
    } = req.body;

    const createCoupon = new CreateCouponService();

    const coupon = await createCoupon.execute({
      clientCPF: cpf,
      clientName: name,
      clientPhone: phone,
      employee,
      company,
      voucher,
      clientEmail: email,
      clientAddress: {
        place,
        number,
        zipCode,
        district,
        city,
        state,
      },
    });

    return res.status(201).json(coupon);
  }
}
