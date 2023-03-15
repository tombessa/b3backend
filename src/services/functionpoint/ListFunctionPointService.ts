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

class ListFunctionPointService{
  async execute({ 	id, 
	project_id, 
	type, 
	estimate_functional_size, 
	count_functional_size, 
	created_by, 
	updated_by, 
 }: FunctionPointRequest){

    
    

    let query={where:{}};
	
		if(id !== undefined) query.where = {...query.where, id : id}; 
	if(project_id !== undefined) query.where = {...query.where, project_id : project_id}; 
	if(type !== undefined) query.where = {...query.where, type : type}; 
	if(estimate_functional_size !== undefined) query.where = {...query.where, estimate_functional_size : estimate_functional_size}; 
	if(count_functional_size !== undefined) query.where = {...query.where, count_functional_size : count_functional_size}; 
	if(created_by !== undefined) query.where = {...query.where, created_by : created_by}; 
	if(updated_by !== undefined) query.where = {...query.where, updated_by : updated_by}; 

	
	return await prismaClient.functionPoint.findMany(query);

  }
}

export { ListFunctionPointService }
