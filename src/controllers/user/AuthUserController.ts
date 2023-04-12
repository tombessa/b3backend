import {Request, Response} from 'express';
import { AuthUserService } from '../../services/user/AuthUserService'

class AuthUserController{

  async handleSocialMedia(req: Request, res: Response){
    const {email} = req.body;
    const auth = await new AuthUserService().executeSocialMedia({
      email
    });
    return res.json(auth);
  }

  async resetHandle(req: Request, res: Response){
    const {email, password} = req.body;

    const authUserService = new AuthUserService();

    const auth = await authUserService.reset({
      email,
      password
    })

    return res.json(auth);

  }


  async handle(req: Request, res: Response){
    const {email, password} = req.body;

    const authUserService = new AuthUserService();

    const auth = await authUserService.execute({
      email,
      password
    })

    return res.json(auth);

  }
}


export { AuthUserController }