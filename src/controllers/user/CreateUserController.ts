import {Request, response, Response} from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController{
  async handle(req: Request, res: Response){
    const { name, email, password, role } = req.body;

    const createUserService = new CreateUserService();
    let createdBy = req.user_id;
    let updatedBy = req.user_id;

    const user = await createUserService.execute({
      name,
      email,
      password,
      role,
      createdBy,
      updatedBy
    });

    return res.json(user)
  }
}

export { CreateUserController }