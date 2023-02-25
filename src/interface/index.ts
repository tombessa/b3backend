
interface UserRequest{
    name: string;
    email: string;
    password: string;
    role?: number;
    createdBy: string;
    updatedBy: string;
}


export {UserRequest}