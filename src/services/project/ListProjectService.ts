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

class ListProjectService{
  async execute({ 	id, 
	name, 
	url, 
	accountable_id, 
	created_by, 
	updated_by, 
 }: ProjectRequest){

    
    

    let query={where:{}};
	
		if(id !== undefined) query.where = {...query.where, id : id}; 
	if(name !== undefined) query.where = {...query.where, name : name}; 
	if(url !== undefined) query.where = {...query.where, url : url}; 
	if(accountable_id !== undefined) query.where = {...query.where, accountable_id : accountable_id}; 
	if(created_by !== undefined) query.where = {...query.where, created_by : created_by}; 
	if(updated_by !== undefined) query.where = {...query.where, updated_by : updated_by}; 

	
	return await prismaClient.project.findMany(query);

  }
}

export { ListProjectService }
