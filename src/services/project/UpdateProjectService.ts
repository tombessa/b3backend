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

class UpdateProjectService{
  async execute({ 	id, 
	name, 
	url, 
	accountable_id, 
	created_by, 
	updated_by, 
 }: ProjectRequest){

    	if(! name ){      throw new Error("'name' Required")    } 

    
	const unique = await prismaClient.project.findFirst({
	  where:{
		 NOT: {id: {equals: id,},},
			name : name, 

	  }
	})
	if(unique){
	  throw new Error("Project already exists")
	}

    let query={where:{},data:{	id : undefined, 
	name : undefined, 
	url : undefined, 
	accountable_id : undefined, 
	created_by : undefined, 
	updated_by : undefined, 
}};
	
	query.where = {...query.where, id : id};
		if(id !== undefined) query.data = {...query.data, id : id}; 
	if(name !== undefined) query.data = {...query.data, name : name}; 
	if(url !== undefined) query.data = {...query.data, url : url}; 
	if(accountable_id !== undefined) query.data = {...query.data, accountable_id : accountable_id}; 
	if(created_by !== undefined) query.data = {...query.data, created_by : created_by}; 
	if(updated_by !== undefined) query.data = {...query.data, updated_by : updated_by}; 

	return await prismaClient.project.update(query);

  }
}

export { UpdateProjectService }
