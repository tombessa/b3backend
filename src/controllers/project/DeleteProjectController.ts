import {Request, response, Response} from 'express'
import { DeleteProjectService  } from '../../services/project/DeleteProjectService'



class DeleteProjectController{
  async handle(req: Request, res: Response){    
		const { id ,name ,url ,accountable_id  } = req.body;
	
    const deleteProjectService = new DeleteProjectService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let pdelete = {
      	id :  id, 
	name :  name, 
	url :  url, 
	accountable_id :  accountable_id, 
	created_by :  created_by, 
	updated_by :  updated_by, 

    };
    const project = await deleteProjectService.execute(pdelete);

    return res.json(project)
  }
}

export { DeleteProjectController }
