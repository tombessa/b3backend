import {Request, response, Response} from 'express'
import { DeleteFunctionPointService  } from '../../services/functionpoint/DeleteFunctionPointService'
import {TypeCountEnum} from "../../interface/enum";


class DeleteFunctionPointController{
  async handle(req: Request, res: Response){    
		const { id ,project_id ,type ,estimate_functional_size ,count_functional_size  } = req.body;
	
    const deleteFunctionPointService = new DeleteFunctionPointService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let pdelete = {
      	id :  id, 
	project_id :  project_id, 
	type :  TypeCountEnum [type], 
	estimate_functional_size :  estimate_functional_size, 
	count_functional_size :  count_functional_size, 
	created_by :  created_by, 
	updated_by :  updated_by, 

    };
    const functionpoint = await deleteFunctionPointService.execute(pdelete);

    return res.json(functionpoint)
  }
}

export { DeleteFunctionPointController }
