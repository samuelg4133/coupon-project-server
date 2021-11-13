import { UpdateUserService } from "@modules/users/services/UpdateUserService";
import { CreateUserService } from "@modules/users/services/CreateUserService";
import { Request, Response } from "express";

export class UserController {
  async store(req: Request, res: Response) {
    const { email, login, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email,
      login,
      password,
    });

    return res.status(201).send(user);
  }

  async update(req: Request, res: Response) {
    const { email, login, password, oldPassword } = req.body;

    const { user_id: user_id } = req.query;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id: user_id.toString(),
      email,
      login,
      password,
      oldPassword,
    });

    return res.json(user);
  }
}
