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

class DeleteFunctionPointService{
  async execute({ 	id, 
	project_id, 
	type, 
	estimate_functional_size, 
	count_functional_size, 
	created_by, 
	updated_by, 
 }: FunctionPointRequest){

    
    

    let query={where:{}};
	
	query.where = {...query.where, id : id};
	
	return await prismaClient.functionPoint.delete(query);

  }
}

export { DeleteFunctionPointService }
