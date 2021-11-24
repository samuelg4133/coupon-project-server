import { Coupon } from ".prisma/client";
import { PaginateCouponDTO } from "@modules/coupons/dtos/CouponDTO";

import { prisma } from "@shared/infra/prisma/client";
import { ICouponRepository } from "../ICouponRepository";

export class PrismaCouponRepository implements ICouponRepository {
  async paginate({ page, perPage }: PaginateCouponDTO): Promise<{
    coupons: (Coupon & {
      client: { name: string };
    })[];
    total: number;
  }> {
    const [coupons, total] = await prisma.$transaction([
      prisma.coupon.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          isActive: true,
          isSelected: false,
        },
        orderBy: {
          voucher: "asc",
        },
        include: {
          client: true,
        },
      }),
      prisma.coupon.count(),
    ]);

    return { coupons, total };
  }
}
