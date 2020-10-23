import React from "react";

import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";

import ChangeThemeButton from "./ChangeThemeButton";
import ProfileTopNav from "./Profile";
import SearchTopNav from "./Search";

const MenuTopNav = () => {
  return (
    <>
      <SearchTopNav />
      <ChangeThemeButton />
      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={17} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <ProfileTopNav />
    </>
  );
};

export default MenuTopNav;
