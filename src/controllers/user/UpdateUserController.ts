import {Request, response, Response} from 'express'
import {Role} from "../../interface";
import {UpdateUserService} from "../../services/user/UpdateUserService";

class UpdateUserController{
  async handle(req: Request, res: Response){
    const { id, name, email, password, nTry, blocked, role } = req.body;

    const updateUserService = new UpdateUserService();
    let updated_by = req.user_id;

    let update = {
      id: id,
      name: name,
      email: email,
      password: password,
      nTry: nTry,
      blocked: blocked,
      role: Role[role],
      updated_by: updated_by
    };
    const user = await updateUserService.execute(update);

    return res.json(user)
  }
}

export { UpdateUserController }