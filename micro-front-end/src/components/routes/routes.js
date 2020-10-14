import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ForumIcon from "@material-ui/icons/Forum";
import { authRoles } from "../../helpers/authRoles";
/*
type:  
main -  before Divider
user - after Divider
*/
import SigninPage from "../../containers/signin/index";
import SelectLanguage from "../../components/select_language/SelectLanguage";

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
    usersCanSee: authRoles.all,
    path: "/auth",
    component: SigninPage,
  },
];
