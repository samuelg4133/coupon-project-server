import { Client, Coupon } from "@prisma/client";
import { FilterDTO, PaginateCouponDTO } from "../dtos/CouponDTO";

export interface ICouponRepository {
  findAll(): Promise<
    (Coupon & {
      client: Client;
    })[]
  >;
  findAndFilter(query: string): Promise<
    (Coupon & {
      client: Client;
    })[]
  >;
  paginate(data: PaginateCouponDTO): Promise<{
    coupons: (Coupon & {
      client: { name: string };
    })[];
    total: number;
  }>;
  paginateAndFilter(data: FilterDTO): Promise<{
    coupons: (Coupon & {
      client: { name: string };
    })[];
    total: number;
  }>;
  paginateAndFilterByCPF(data: FilterDTO): Promise<{
    coupons: (Coupon & {
      client: { name: string };
    })[];
    total: number;
  }>;
}
