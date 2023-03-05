
interface UserRequest{
    name: string;
    email: string;
    password: string;
    role?: Role;
    created_by: string;
    updated_by: string;
}

interface UserRequestUpdate{
    id: string;
    name: string;
    email: string;
    password: string;
    role?: Role;
    try?: number;
    blocked?: boolean;
    updated_by: string;
}

export const Role: {
    USER: 'USER'
    ADMIN: 'ADMIN'
} = {
    USER: 'USER',
    ADMIN: 'ADMIN',
}

export type Role = typeof Role[keyof typeof Role];
export {UserRequest, UserRequestUpdate}