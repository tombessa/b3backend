import {Request, Response} from 'express'
import {ListUserService} from "../../services/user/ListUserService";

class ListUserController{
  async handle(req: Request, res: Response){

    const detailUserService = new ListUserService();

    const user = await detailUserService.execute();

    return res.json(user);

  }
}

export { ListUserController  }