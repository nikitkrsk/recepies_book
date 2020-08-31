import passwordHash from "password-hash";

export const UserSeed = [
    {
        email : 'test@test.com',
        password : passwordHash.generate('password123'),
        name : 'John',
        role : 'User',
        status : 'active'
    },
    {
        email : 'test1@test.com',
        password : passwordHash.generate('password123'),
        name : 'Ben',
        role : 'Admin',
        status : 'active'
    },
  ];
  