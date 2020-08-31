import passwordHash from "password-hash";
import {UserRole, UserStatus} from '../entity/User'
export const UserSeed = [
    {
        email : 'admin@recepies.com',
        password : passwordHash.generate('password123'),
        firstName : 'Tyler',
        lastName: "Derdan",
        role : UserRole.ADMIN,
        status : UserStatus.ACTIVE
    },
    {
        email : 'test1@test.com',
        password : passwordHash.generate('password123'),
        firstName : 'John',
        lastName: "Doe",
        role : UserRole.USER,
        status : UserStatus.ACTIVE
    },
  ];
  