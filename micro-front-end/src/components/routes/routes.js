import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ForumIcon from "@material-ui/icons/Forum";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { authRoles } from "../../helpers/authRoles";
import SigninPage from "../../containers/signin/index";
import SelectLanguage from "../../components/select_language/SelectLanguage";
import ForgotPassword from "../../containers/signin/forgot_password/ForgotPassword"
import ResetPassword from "../../containers/signin/forgot_password/ResetPassword"
import ConfirmEmail from "../../containers/signin/register_page/ConfirmEmail"
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
    name: "Forgot Password",
    type: "notInTheMenu",
    icon: VpnKeyIcon,
    usersCanSee: authRoles.only_guest,
    path: "/request_reset_password",
    component: ForgotPassword,
  },
  {
    name: "Reset Password",
    type: "notInTheMenu",
    icon: VpnKeyIcon,
    usersCanSee: authRoles.only_guest,
    path: "/reset_password",
    component: ResetPassword,
  },
  {
    name: "Confirm Email",
    type: "notInTheMenu",
    icon: VpnKeyIcon,
    usersCanSee: authRoles.all,
    path: "/confirm_email",
    component: ConfirmEmail,
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
