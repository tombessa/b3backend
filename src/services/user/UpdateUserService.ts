import prismaClient from "../../prisma";
import {UserRequestUpdate} from "../../interface";


class UpdateUserService{
  async execute(data : UserRequestUpdate){

    const user = await prismaClient.user.update({
      where:{
        id: data.id
      },
      data: data
    })


    return user;

  }
}

export { UpdateUserService }