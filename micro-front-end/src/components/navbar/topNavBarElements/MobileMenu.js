import React from "react";


import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu"
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/More";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";

import MailIcon from "@material-ui/icons/Mail";

import ProfileTopNav from "./Profile";
import ChangeThemeButton from "./ChangeThemeButton";
import SearchTopNav from "./Search";


const MobileMenuTopNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleProfileMenuOpen}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <ChangeThemeButton />
        </MenuItem>

        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem>
          <ProfileTopNav /> 
        </MenuItem>
        <MenuItem>
          <SearchTopNav />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileMenuTopNav;
