import { ListActiveEmployeesService } from "@modules/employees/services/ListActiveEmployeesService";
import { Request, Response } from "express";

export class ActiveEmployeeController {
  public async index(request: Request, response: Response) {
    const activeEmployeeService = new ListActiveEmployeesService();

    const employees = await activeEmployeeService.execute();

    return response.json(employees);
  }
}
