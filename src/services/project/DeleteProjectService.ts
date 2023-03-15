import prismaClient from "../../prisma"


interface ProjectRequest{
    	id? : string; 
	name : string; 
	url? : string; 
	accountable_id? : string; 
	created_by? : string; 
	updated_by? : string; 

}
export {ProjectRequest}

class DeleteProjectService{
  async execute({ 	id, 
	name, 
	url, 
	accountable_id, 
	created_by, 
	updated_by, 
 }: ProjectRequest){

    
    

    let query={where:{}};
	
	query.where = {...query.where, id : id};
	
	return await prismaClient.project.delete(query);

  }
}

export { DeleteProjectService }
