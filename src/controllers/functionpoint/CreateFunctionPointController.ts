import {Request, response, Response} from 'express'
import { CreateFunctionPointService  } from '../../services/functionpoint/CreateFunctionPointService'
import {TypeCountEnum} from "../../interface/enum";


class CreateFunctionPointController{
  async handle(req: Request, res: Response){    
		const { id ,project_id ,type ,estimate_functional_size ,count_functional_size  } = req.body;
	
    const createFunctionPointService = new CreateFunctionPointService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let pcreate = {
      	id :  id, 
	project_id :  project_id, 
	type :  TypeCountEnum [type], 
	estimate_functional_size :  estimate_functional_size, 
	count_functional_size :  count_functional_size, 
	created_by :  created_by, 
	updated_by :  updated_by, 

    };
    const functionpoint = await createFunctionPointService.execute(pcreate);

    return res.json(functionpoint)
  }
}

export { CreateFunctionPointController }
