import { Coupon } from ".prisma/client";
// import SMS from "@config/sms";
// import Notification from "@modules/notifications/infra/mongoose/Notification";
import Voucher from "@modules/vouchers/infra/mongoose/schemas/Voucher";
import Error from "@shared/core/Error";
import Service from "@shared/core/Service";
import { prisma } from "@shared/infra/prisma/client";
import { filterNumbers } from "@shared/utils/filterNumber";

type Address = {
  place: string; //logradouro
  number: string; //numero
  zipCode: string; //CEP
  district: string; //Bairro
  city: string; //City
  state: string; //UF
};

export interface Request {
  employee: string;
  company: string;
  clientName: string;
  clientCPF: string;
  clientPhone: string;
  clientEmail?: string;
  clientAddress?: Address;
  voucher: string;
}

export class CreateCouponService implements Service<Request, Coupon> {
  async execute({
    clientAddress,
    clientCPF,
    clientEmail,
    clientName,
    clientPhone,
    employee,
    company,
    voucher,
  }: Request): Promise<Coupon> {
    const filteredClientCPF = filterNumbers(clientCPF);
    const filteredClientPhone = filterNumbers(clientPhone);

    const voucherExists = await Voucher.findOneAndUpdate(
      {
        active: true,
        code: voucher.toUpperCase(),
        expiration: {
          $gte: new Date(Date.now()),
        },
      },
      {
        active: false,
      }
    );

    if (!voucherExists) {
      throw new Error({
        message: "Esse voucher não é ativo.",
      });
    }

    const clientAlreadyExists = await prisma.client.findUnique({
      where: {
        cpf: filteredClientCPF,
      },
    });
    try {
      let coupon: Coupon;
      if (!clientAlreadyExists) {
        coupon = await prisma.coupon.create({
          data: {
            employee: employee.toUpperCase(),
            company: company.toUpperCase(),
            voucher: voucher.toUpperCase(),
            expiresAt: voucherExists.expiration,
            client: {
              create: {
                cpf: filteredClientCPF,
                name: clientName.toUpperCase(),
                email: clientEmail ? clientEmail.toLowerCase() : null,
                phone: filteredClientPhone,
                address: {
                  place: clientAddress.place.toUpperCase(),
                  number: filterNumbers(clientAddress.number),
                  zipCode: filterNumbers(clientAddress.zipCode),
                  district: clientAddress.district.toUpperCase(),
                  city: clientAddress.city.toUpperCase(),
                  state: clientAddress.state.toUpperCase(),
                },
              },
            },
          },
        });
      } else {
        await prisma.client.update({
          where: {
            cpf: clientAlreadyExists.cpf,
          },
          data: {
            phone: filteredClientPhone,
          },
        });
        coupon = await prisma.coupon.create({
          data: {
            voucher: voucher.toUpperCase(),
            clientId: clientAlreadyExists.id,
            employee: employee.toUpperCase(),
            company: company.toUpperCase(),
            expiresAt: voucherExists.expiration,
          },
        });
      }

      // const message = `Seu código ${voucher.toUpperCase()} foi cadastrado com sucesso na Promoção Natal Premiado 2021!`;
      // const phoneNumber = `+55${filteredClientPhone}`;

      // SMS.publish(
      //   {
      //     Message: message,
      //     PhoneNumber: phoneNumber,
      //   },
      //   (err, _) => {
      //     if (err) throw new Error({ message: err });
      //   }
      // );

      // await Notification.create({
      //   message,
      //   phoneNumber,
      // });

      return coupon;
    } catch {
      throw new Error({
        message: "Erro ao salvar cupom.",
      });
    }
  }
}
