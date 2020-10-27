import passwordHash from "password-hash";
import {UserRole, UserStatus} from '../entity/User'
export const UserSeed = [
    {
        email : 'admin@recepies.dev',
        password : passwordHash.generate('password123'),
        firstName : 'Tyler',
        lastName: "Durden",
        verifiedAt: new Date(),
        role : UserRole.ADMIN,
        subscription: true,
        status : UserStatus.ACTIVE
    },
    {
        email : 'user@recepies.dev',
        password : passwordHash.generate('password123'),
        firstName : 'John',
        lastName: "Smith",
        verifiedAt: new Date(),
        role : UserRole.USER,
        status : UserStatus.ACTIVE
    },
  ];
  