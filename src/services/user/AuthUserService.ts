
import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest{
  email: string;
  password: string;
}


class AuthUserService{

  async reset({ email, password }: AuthRequest){
    //Verificar se o email existe.
    const user = await prismaClient.user.findFirst({
      where:{
        email: email,
        active: true,
      }
    })

    if(!user){
      throw new Error("User/password incorrect")
    }

    // Check Password
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("User/password incorrect")
    }

    //unlock
    await prismaClient.user.update({
      where:{
        id: user.id
      },
      data:{
        try: 0,
        blocked: false
      }
    })

    //Generate Token
    const token = sign(
        {
          name: user.name,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: '60m'
        }
    )


    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }

  async execute({ email, password }: AuthRequest){
    //Verificar se o email existe.
    const user = await prismaClient.user.findFirst({
      where:{
        email: email,
        active: true,
        blocked: false,
      }
    })

    if(!user){
      throw new Error("User/password incorrect")
    }

    // Check Password
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      //increment try and block
      await prismaClient.user.update({
        where:{
          id: user.id
        },
        data:{
          try: user.try+1,
          blocked: (user.try>3)
        }
      })
      throw new Error("User/password incorrect")
    }

    //Generate Token
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '60m'
      }
    )


    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
     }
  }
}

export { AuthUserService };