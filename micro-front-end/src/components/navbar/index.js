import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import TopNavBar from './TopNavBar'
import SideNav from "./SideNav"


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const Navigation = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopNavBar />
      <SideNav />
    </div>
  );
};



export default Navigation;
