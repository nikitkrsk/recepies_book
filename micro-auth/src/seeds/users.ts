import passwordHash from "password-hash";
import {UserRole, UserStatus} from '../entity/User'
export const UserSeed = [
    {
        email : 'admin@recepies.dev',
        password : passwordHash.generate('password123'),
        firstName : 'Tyler',
        lastName: "Durden",
        role : UserRole.ADMIN,
        status : UserStatus.ACTIVE
    },
    {
        email : 'user@recepies.dev',
        password : passwordHash.generate('password123'),
        firstName : 'John',
        lastName: "Smith",
        role : UserRole.USER,
        status : UserStatus.ACTIVE
    },
  ];
  