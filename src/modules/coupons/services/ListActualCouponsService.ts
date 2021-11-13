import { PrismaCouponRepository } from "./../repositories/prisma/PrismaCouponRepository";
import { ICouponRepository } from "./../repositories/ICouponRepository";
import Service from "@shared/core/Service";
import { Coupon } from ".prisma/client";

interface Request {
  perPage: number;
  page: number;
}

interface Response {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  data: (Coupon & {
    client: { name: string };
    employee: { name: string };
  })[];
}

export class ResponseClass implements Response {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string;
  previousPageUrl: string;
  data: (Coupon & { client: { name: string }; employee: { name: string } })[];
}

export class ListActualCouponsService implements Service<Request, Response> {
  private _couponRepository: ICouponRepository;

  constructor() {
    this._couponRepository = new PrismaCouponRepository();
  }
  async execute({ page, perPage }: Request): Promise<Response> {
    const { coupons, total } = await this._couponRepository.paginate({
      page,
      perPage,
    });

    const lastPage = Math.ceil(total / perPage);
    const firstPageUrl = `${process.env.APP_URL}:${
      process.env.APP_PORT
    }/coupons?page=${1}&per_page=${perPage}`;
    const lastPageUrl = `${process.env.APP_URL}:${process.env.APP_PORT}/coupons?page=${lastPage}&per_page=${perPage}`;
    const nextPageUrl =
      page < lastPage
        ? `${process.env.APP_URL}:${process.env.APP_PORT}/coupons?page=${
            page + 1
          }&per_page=${perPage}`
        : null;

    const previousPageUrl =
      page > 1 && page < lastPage
        ? `${process.env.APP_URL}:${process.env.APP_PORT}/coupons?page=${
            page - 1
          }&per_page=${perPage}`
        : null;

    return {
      total,
      perPage,
      currentPage: page,
      lastPage,
      firstPageUrl,
      lastPageUrl,
      nextPageUrl,
      previousPageUrl,
      data: coupons,
    };
  }
}
