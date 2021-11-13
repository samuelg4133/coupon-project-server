import { ensureAuthenticated } from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { createUserRequest } from "../requests/CreateUserRequest";
import { updateUserRequest } from "../requests/UpdateUserRequest";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", createUserRequest, userController.store);
userRouter.put(
  "/",
  celebrate({
    [Segments.QUERY]: {
      user_id: Joi.string().required(),
    },
  }),
  updateUserRequest,
  ensureAuthenticated,
  userController.update
);

export { userRouter };
