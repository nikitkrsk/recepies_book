import React from "react";
import { useSelector, useDispatch } from "react-redux";

import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import ChatIcon from "@material-ui/icons/Chat";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import {LogoutAction } from '../../../containers/signin/login_page/store/LoginActions'

const ProfileTopNav = () => {
  const state = useSelector((state) => ({
    loggedIn: state.loginUser.loggedIn,
  }));
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const logout = (event) =>{
      event.preventDefault()
      dispatch(LogoutAction('TODO LOGOUT'))
  }
  const notLoggedInUser = (
    <List component="nav" aria-label="profile navbar">
      <ListItem button component="a" href="/auth">
        <ListItemIcon>
          <LockOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </List>
  );
  const loggedInUser = (
    <List component="nav" aria-label="profile loggedin navbar">
      <ListItem button component="a" href="/myProfile">
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem button component="a" href="/messages">
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
      <Divider />
      <ListItem button component="a" onClick={logout}>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleProfileMenuOpen}
      >
        <AccountCircle />
      </IconButton>
      <Popover
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {state.loggedIn ? loggedInUser : notLoggedInUser}
      </Popover>
    </>
  );
};

export default ProfileTopNav;
