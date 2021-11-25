import { PrismaCouponRepository } from "./../repositories/prisma/PrismaCouponRepository";
import { ICouponRepository } from "./../repositories/ICouponRepository";
import Service from "@shared/core/Service";
import { Coupon } from ".prisma/client";

interface Request {
  perPage: number;
  page: number;
  filter?: string;
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

export class ResponseClass implements Response {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  data: (Coupon & {
    client: { name: string };
  })[];
}

export class ListActualCouponsService implements Service<Request, Response> {
  private _couponRepository: ICouponRepository;

  constructor() {
    this._couponRepository = new PrismaCouponRepository();
  }

  async execute({ filter, page, perPage }: Request): Promise<Response> {
    const { coupons, total } =
      filter != "UNDEFINED"
        ? await this._couponRepository.paginateAndFilter({
            page,
            perPage,
            query: filter,
          })
        : await this._couponRepository.paginate({
            page,
            perPage,
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
