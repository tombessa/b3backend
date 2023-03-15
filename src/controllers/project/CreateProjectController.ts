import {Request, response, Response} from 'express'
import { CreateProjectService  } from '../../services/project/CreateProjectService'



class CreateProjectController{
  async handle(req: Request, res: Response){    
		const { id ,name ,url ,accountable_id  } = req.body;
	
    const createProjectService = new CreateProjectService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let pcreate = {
      	id :  id, 
	name :  name, 
	url :  url, 
	accountable_id :  accountable_id, 
	created_by :  created_by, 
	updated_by :  updated_by, 

    };
    const project = await createProjectService.execute(pcreate);

    return res.json(project)
  }
}

export { CreateProjectController }
