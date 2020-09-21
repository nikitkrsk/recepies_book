import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

/*
type:  
main -  before Divider
user - after Divider
*/

export const MenuItems = {
  main: [
    {
      name: "Home",
      icon: HomeIcon,
      protected: false,
      usersCanSee: [],
      route: "/",
    },
  ],
  user: [
    {
      name: "Login",
      icon: VpnKeyIcon,
      protected: false,
      usersCanSee: [],
      route: "./auth",
    },
  ],
};
