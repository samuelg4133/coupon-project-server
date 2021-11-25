import { Coupon } from "@prisma/client";
import { PaginateAndFilterDTO, PaginateCouponDTO } from "../dtos/CouponDTO";

export interface ICouponRepository {
  paginate(data: PaginateCouponDTO): Promise<{
    coupons: (Coupon & {
      client: { name: string };
    })[];
    total: number;
  }>;
  paginateAndFilter(data: PaginateAndFilterDTO): Promise<{
    coupons: (Coupon & {
      client: { name: string };
    })[];
    total: number;
  }>;
}
