import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ForumIcon from "@material-ui/icons/Forum";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { authRoles } from "../../helpers/authRoles";
import SigninPage from "../../containers/signin/index";
import SelectLanguage from "../../components/select_language/SelectLanguage";
/*
type:  
main -  before Divider
user - after Divider
*/
export const Routes = [
  {
    name: "Home",
    type: "main",
    icon: HomeIcon,
    usersCanSee: authRoles.all,
    path: "/",
    component: SelectLanguage,
  },
  {
    name: "Forum",
    type: "main",
    icon: ForumIcon,
    usersCanSee: authRoles.user,
    path: "/testRoute",
    component: SelectLanguage,
  },
  {
    name: "Login",
    type: "user",
    icon: VpnKeyIcon,
    usersCanSee: authRoles.only_guest,
    path: "/auth",
    component: SigninPage,
  },
  {
    name: "My Account",
    type: "user",
    icon: AccountBoxIcon,
    usersCanSee: authRoles.user,
    path: "/myAccount",
    component: SelectLanguage,
  },
];
