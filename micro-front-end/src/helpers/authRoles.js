export const authRoles = {
  admin: ["admin"],
  user: ["admin", "user"],
  only_guest: ["guest"], // For Login Page To Disappear when Logged In  
  all: ["admin","user", "guest"],
};
