import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ActiveEmployeeController } from "../controllers/ActiveEmployeeController";
import { EmployeeController } from "../controllers/EmployeeController";
import { createEmployeeRequest } from "../requests/CreateEmployeeRequest";
import { updateEmployeeRequest } from "../requests/UpdateEmployeeRequest";

const employeeRouter = Router();

const employeeController = new EmployeeController();
const activeEmployeeController = new ActiveEmployeeController();

employeeRouter.get("/active", activeEmployeeController.index);

employeeRouter.use(ensureAuthenticated);

employeeRouter.get("/", employeeController.index);
employeeRouter.get("/:cpf", employeeController.show);
employeeRouter.post("/", createEmployeeRequest, employeeController.store);
employeeRouter.delete(
  "/",
  celebrate({
    [Segments.QUERY]: {
      employee_id: Joi.string().required(),
    },
  }),
  employeeController.delete
);
employeeRouter.put("/", updateEmployeeRequest, employeeController.update);

export { employeeRouter };
