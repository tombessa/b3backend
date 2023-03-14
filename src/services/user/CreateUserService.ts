import prismaClient from "../../prisma"
import { hash } from 'bcryptjs'
import {UserRequest} from "../../interface";


class CreateUserService{
  async execute({ name, email, password, role, created_by, updated_by }: UserRequest){

    // verificar se ele enviou um email
    if(!email){
      throw new Error("Email incorrect")
    }

    //Verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(userAlreadyExists){
      if(userAlreadyExists.active){
        throw new Error("User already exists")
      }else{
        await prismaClient.user.delete({
          where:{
            id: userAlreadyExists.id
          }
        });
      }      
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data:{
        name: name,
        email: email,
        password: passwordHash,
        role: role,
        created_by: created_by,
        updated_by: updated_by,
      },
      select:{
        id: true,
        name: true,       
        email: true,
        role: true
      }
    })


    return user;
  }
}

export { CreateUserService }