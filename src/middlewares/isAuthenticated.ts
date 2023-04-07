import {NextFunction, Request, Response} from 'express'
import { verify } from 'jsonwebtoken'
import {ListUserService} from "../services/user/ListUserService";

interface Payload{
  sub: string;
}

export async function isSocialMediaLogin(req: Request,
                                         res: Response,
                                         next: NextFunction){
    if(req.body.key===process.env.SECRET) return next();
    else return res.status(401).end();
}

export async function isCreatingAdmin(
  req: Request,
  res: Response,
  next: NextFunction
){
	if(req.headers.superuser==="true"){
		const detailUserService = new ListUserService();
		const user = await detailUserService.execute();
		if(user.length===0)
			return next();
		else return res.status(500).end();
	}else return res.status(401).end();



}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){

  // Get Token
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ")

  
  try{
    //Validar esse token.
    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload;

    //Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req.
    req.user_id = sub;    

    return next();

  }catch(err){
    return res.status(401).end();
  }



}