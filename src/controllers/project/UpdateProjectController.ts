import {Request, response, Response} from 'express'
import { UpdateProjectService  } from '../../services/project/UpdateProjectService'



class UpdateProjectController{
  async handle(req: Request, res: Response){    
		const { id ,name ,url ,accountable_id  } = req.body;
	
    const updateProjectService = new UpdateProjectService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let pupdate = {
      	id :  id, 
	name :  name, 
	url :  url, 
	accountable_id :  accountable_id, 
	created_by :  created_by, 
	updated_by :  updated_by, 

    };
    const project = await updateProjectService.execute(pupdate);

    return res.json(project)
  }
}

export { UpdateProjectController }
