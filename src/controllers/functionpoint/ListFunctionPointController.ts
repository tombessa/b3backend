import {Request, response, Response} from 'express'
import { ListFunctionPointService , FunctionPointRequest } from '../../services/functionpoint/ListFunctionPointService'
import {TypeCountEnum} from "../../interface/enum";


class ListFunctionPointController{
  async handle(req: Request, res: Response){    
		const { id ,project_id ,type ,estimate_functional_size ,count_functional_size  } = req.query as unknown as FunctionPointRequest;
	
    const listFunctionPointService = new ListFunctionPointService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let plist = {
      	id :  id, 
	project_id :  project_id, 
	type :  TypeCountEnum [type], 
	estimate_functional_size :  estimate_functional_size, 
	count_functional_size :  count_functional_size, 
	created_by :  created_by, 
	updated_by :  updated_by, 

    };
    const functionpoint = await listFunctionPointService.execute(plist);

    return res.json(functionpoint)
  }
}

export { ListFunctionPointController }
