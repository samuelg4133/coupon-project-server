import { Coupon } from "@prisma/client";
import Service from "@shared/core/Service";
import { filterNumbers } from "@shared/utils/filterNumber";
import { ICouponRepository } from "../repositories/ICouponRepository";
import { PrismaCouponRepository } from "../repositories/prisma/PrismaCouponRepository";

interface Request {
  perPage: number;
  page: number;
  cpf: string;
}

interface Response {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  data: (Coupon & {
    client: { name: string };
  })[];
}

export class ListClientCouponsService implements Service<Request, Response> {
  private _couponRepository: ICouponRepository;

  constructor() {
    this._couponRepository = new PrismaCouponRepository();
  }

  public async execute({ cpf, page, perPage }: Request): Promise<Response> {
    const filteredClientCPF = filterNumbers(cpf);

    const { coupons, total } =
      await this._couponRepository.paginateAndFilterByCPF({
        page,
        perPage,
        query: filteredClientCPF,
      });

    const lastPage = Math.ceil(total / perPage);

    return {
      total,
      perPage,
      currentPage: page,
      lastPage,
      data: coupons,
    };
  }
}
