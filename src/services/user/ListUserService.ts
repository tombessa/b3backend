import prismaClient from "../../prisma";

class ListUserService{
  async execute(){

    return await prismaClient.user.findMany({
      where: {
        active: true
      }
    });
  }

  async executeSocialMedia(email: string){
    if(!email) throw new Error("E-mail is required")
    return await prismaClient.user.findFirst({
      where: {
        email: email,
        active: true
      }
    });
  }
}

export { ListUserService }