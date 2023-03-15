import {Request, response, Response} from 'express'
import { ListProjectService , ProjectRequest } from '../../services/project/ListProjectService'



class ListProjectController{
  async handle(req: Request, res: Response){    
		const { id ,name ,url ,accountable_id  } = req.query as unknown as ProjectRequest;
	
    const listProjectService = new ListProjectService();
    let created_by = req.user_id;
    let updated_by = req.user_id;

    let plist = {
      	id :  id, 
	name :  name, 
	url :  url, 
	accountable_id :  accountable_id, 
	created_by :  created_by, 
	updated_by :  updated_by, 

    };
    const project = await listProjectService.execute(plist);

    return res.json(project)
  }
}

export { ListProjectController }
