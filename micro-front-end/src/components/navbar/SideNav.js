import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { MenuItems } from "./MenuItems";
import { setMenuOpen } from "./store/menu_open/MenuOpenActions";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(0) + 1,
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    // background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  activePage: {
    background: theme.palette.primary.main,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  activePageOpen: {
    borderRadius: "0 0 25% 0",
  },
  listItem: {
    padding: "0",
  },
}));

const SideNav = () => {
  const theme = useTheme();
  const classes = useStyles();
  const state = useSelector((state) => ({
    menuOpen: state.changeMenuOpen.menuOpen,
    currentPage: state.changeCurrentPage.currentPage,
    role: state.loginUser.role

  }));
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    dispatch(setMenuOpen(false));
  };

  const renderMenu = (type) => {
    return MenuItems.filter((el) => el.type === type).map((item, i) => {
      if (item.usersCanSee.includes(state.role)) {
        return (
          <List className={classes.listItem}>
            <Link
              to={{
                pathname: item.path,
              }}
              className={classes.link}
              id={item.name}
            >
              <ListItem
                button
                key={item.name}
                className={
                  state.currentPage === item.path
                    ? clsx(classes.activePage, {
                        [classes.activePageOpen]: state.menuOpen,
                      })
                    : ""
                }
              >
                <ListItemIcon>{<item.icon />}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          </List>
        );
      } else {
        return <></>;
      }
    });
  };
  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: state.menuOpen,
          [classes.drawerClose]: !state.menuOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: state.menuOpen,
            [classes.drawerClose]: !state.menuOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {renderMenu("main")}
        <Divider />
        {renderMenu("user")}
      </Drawer>
    </>
  );
};

export default SideNav;
