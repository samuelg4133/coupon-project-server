import { Coupon } from "@prisma/client";
import { PaginateCouponDTO } from "../dtos/CouponDTO";

export interface ICouponRepository {
  paginate(data: PaginateCouponDTO): Promise<{
    coupons: (Coupon & {
      client: { name: string };
    })[];
    total: number;
  }>;
}
