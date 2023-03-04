import {Request, response, Response} from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'
import {Role} from "../../interface";

class CreateUserController{
  async handle(req: Request, res: Response){
    const { name, email, password, role } = req.body;

    const createUserService = new CreateUserService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let create = {
      name: name,
      email: email,
      password: password,
      role: Role[role],
      created_by: created_by,
      updated_by: updated_by
    };
    const user = await createUserService.execute(create);

    return res.json(user)
  }
}

export { CreateUserController }