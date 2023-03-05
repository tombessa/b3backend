import prismaClient from "../../prisma";

class ListUserService{
  async execute(){

    const user = await prismaClient.user.findMany({
      where:{
        active: true
      }
    });

    return user;
  }
}

export { ListUserService }