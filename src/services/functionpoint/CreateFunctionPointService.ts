import prismaClient from "../../prisma"
import {TypeCountEnum} from "../../interface/enum";

interface FunctionPointRequest{
    	id? : string; 
	project_id : string; 
	type : TypeCountEnum; 
	estimate_functional_size? : number; 
	count_functional_size? : number; 
	created_by? : string; 
	updated_by? : string; 

}
export {FunctionPointRequest}

class CreateFunctionPointService{
  async execute({ 	id, 
	project_id, 
	type, 
	estimate_functional_size, 
	count_functional_size, 
	created_by, 
	updated_by, 
 }: FunctionPointRequest){

    	if(! project_id ){      throw new Error("'project_id' Required")    } 
	if(! type ){      throw new Error("'type' Required")    } 

    
	const unique = await prismaClient.functionPoint.findFirst({
	  where:{
		
			project_id : project_id, 

	  }
	})
	if(unique){
	  throw new Error("FunctionPoint already exists")
	}

    let query={data:{	id : undefined, 
	project_id : undefined, 
	type : undefined, 
	estimate_functional_size : undefined, 
	count_functional_size : undefined, 
	created_by : undefined, 
	updated_by : undefined, 
}};
	
	
		if(id !== undefined) query.data = {...query.data, id : id}; 
	if(project_id !== undefined) query.data = {...query.data, project_id : project_id}; 
	if(type !== undefined) query.data = {...query.data, type : type}; 
	if(estimate_functional_size !== undefined) query.data = {...query.data, estimate_functional_size : estimate_functional_size}; 
	if(count_functional_size !== undefined) query.data = {...query.data, count_functional_size : count_functional_size}; 
	if(created_by !== undefined) query.data = {...query.data, created_by : created_by}; 
	if(updated_by !== undefined) query.data = {...query.data, updated_by : updated_by}; 

	return await prismaClient.functionPoint.create(query);

  }
}

export { CreateFunctionPointService }
