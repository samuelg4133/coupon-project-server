import { Coupon } from ".prisma/client";
import { FilterDTO, PaginateCouponDTO } from "@modules/coupons/dtos/CouponDTO";
import { Client } from "@prisma/client";

import { prisma } from "@shared/infra/prisma/client";
import { ICouponRepository } from "../ICouponRepository";

export class PrismaCouponRepository implements ICouponRepository {
  public async findAndFilter(
    query: string
  ): Promise<(Coupon & { client: Client })[]> {
    const coupons = await prisma.coupon.findMany({
      where: {
        isActive: true,
        isSelected: false,
        OR: [
          {
            voucher: query,
          },
          {
            client: {
              cpf: query,
            },
          },
          {
            client: {
              name: {
                contains: query,
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        client: true,
      },
    });

    return coupons;
  }
  public async findAll(): Promise<
    (Coupon & {
      client: Client;
    })[]
  > {
    const coupons = await prisma.coupon.findMany({
      where: {
        isActive: true,
        isSelected: false,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        client: true,
      },
    });

    return coupons;
  }
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
          createdAt: "asc",
        },
        include: {
          client: true,
        },
      }),
      prisma.coupon.count({
        where: {
          isActive: true,
          isSelected: false,
        },
      }),
    ]);

    return { coupons, total };
  }

  public async paginateAndFilter({ perPage, page, query }: FilterDTO): Promise<{
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
          OR: [
            {
              voucher: query,
            },
            {
              client: {
                cpf: query,
              },
            },
            {
              client: {
                name: {
                  contains: query,
                },
              },
            },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          client: true,
        },
      }),
      prisma.coupon.count({
        where: {
          isActive: true,
          isSelected: false,
          OR: [
            {
              voucher: query,
            },
            {
              client: {
                cpf: query,
              },
            },
            {
              client: {
                name: {
                  contains: query,
                },
              },
            },
          ],
        },
      }),
    ]);

    return { coupons, total };
  }
}
