import { Request, Response } from "express";

import { ListEmployeesService } from "./../../../services/ListEmployeesService";
import { DeleteEmployeeService } from "./../../../services/DeleteEmployeeService";
import { ShowEmployeeService } from "./../../../services/ShowEmployeeService";
import { UpdateEmployeeService } from "./../../../services/UpdateEmployeeService";
import { CreateEmployeeService } from "./../../../services/CreateEmployeeService";

export class EmployeeController {
  public async index(req: Request, res: Response) {
    const listEmployees = new ListEmployeesService();

    const employees = await listEmployees.execute();

    return res.json(employees);
  }
  public async store(req: Request, res: Response) {
    const { companyId, cpf, name } = req.body;

    const createEmployee = new CreateEmployeeService();

    const employee = await createEmployee.execute({
      companyId,
      cpf,
      name,
    });

    return res.status(201).json(employee);
  }

  public async show(req: Request, res: Response) {
    const { cpf } = req.params;

    const showEmployee = new ShowEmployeeService();

    const employee = await showEmployee.execute({
      cpf,
    });

    return res.status(200).json(employee);
  }

  public async delete(req: Request, res: Response) {
    const { employee_id: employee_id } = req.query;

    const deleteEmployee = new DeleteEmployeeService();

    await deleteEmployee.execute({
      id: employee_id.toString(),
    });

    return res.status(200).send({});
  }

  public async update(req: Request, res: Response) {
    const { companyId, id, isActive, name } = req.body;

    const updateEmployee = new UpdateEmployeeService();

    const employee = await updateEmployee.execute({
      companyId,
      id,
      isActive,
      name,
    });

    return res.json(employee);
  }
}
