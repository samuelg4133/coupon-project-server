import { ListClientCouponsService } from "./../../../services/ListClientCouponsService";
import { Request, Response } from "express";

export class ClientCouponsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { per_page: perPage, page: page } = request.query;
    const { cpf: cpf } = request.params;

    const listClientCoupons = new ListClientCouponsService();

    const clientCoupons = await listClientCoupons.execute({
      page: Number(page),
      perPage: Number(perPage),
      cpf: cpf,
    });

    return response.json(clientCoupons);
  }
}
