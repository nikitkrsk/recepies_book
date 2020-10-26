import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { setMenuOpen } from "./store/menu_open/MenuOpenActions";
import MenuTopNav from "./topNavBarElements/Menu";
import MobileMenuTopNav from "./topNavBarElements/MobileMenu";
import NotVerifiedAccount from "../notifications/notVerifiedAccount";
import config from "../../config";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const TopNavBar = (props) => {
  const state = useSelector((state) => ({
    menuOpen: state.changeMenuOpen.menuOpen,
    loggedIn: state.loginUser.loggedIn,
    verifiedAt: state.loginUser.user.verifiedAt
  }));
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDrawerOpen = () => {
    dispatch(setMenuOpen(true));
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state.menuOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: state.menuOpen,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            {config.DOMAIN}
          </Typography>
          {state.loggedIn && state.verifiedAt === null  ?  <NotVerifiedAccount /> : "" }
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuTopNav />
          </div>
          <div className={classes.sectionMobile}>
            <MobileMenuTopNav />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNavBar;
