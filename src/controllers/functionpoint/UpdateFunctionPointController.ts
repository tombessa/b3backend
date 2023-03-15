import {Request, response, Response} from 'express'
import { UpdateFunctionPointService  } from '../../services/functionpoint/UpdateFunctionPointService'
import {TypeCountEnum} from "../../interface/enum";


class UpdateFunctionPointController{
  async handle(req: Request, res: Response){    
		const { id ,project_id ,type ,estimate_functional_size ,count_functional_size  } = req.body;
	
    const updateFunctionPointService = new UpdateFunctionPointService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let pupdate = {
      	id :  id, 
	project_id :  project_id, 
	type :  TypeCountEnum [type], 
	estimate_functional_size :  estimate_functional_size, 
	count_functional_size :  count_functional_size, 
	created_by :  created_by, 
	updated_by :  updated_by, 

    };
    const functionpoint = await updateFunctionPointService.execute(pupdate);

    return res.json(functionpoint)
  }
}

export { UpdateFunctionPointController }
