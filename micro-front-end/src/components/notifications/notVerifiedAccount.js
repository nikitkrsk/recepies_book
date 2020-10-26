import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    pointerEvents: "none",
    position: "absolute",
    top: "105%",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      top: "auto",
    },
  },
  text: {
    display: "flex",
    justifyContent: "center",
  },
  textBody: {
    border: "none",
    textAlign: "none",
    textDecoration: "none",
    color: theme.palette.common.white,
    background: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.light,
    },
    padding: "5px 10px",
    borderRadius: "5px",
    pointerEvents: "auto",
    [theme.breakpoints.up("md")]: {
      padding: "10px 15px",
      fontSize: "20px",
    },
  },
}));
const NotVerifiedAccount = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.main}>
        <div className={classes.text}>
          <a href="/myAccount" className={classes.textBody}>
            Please Confirm Your Email
          </a>
        </div>
      </div>
    </>
  );
};

export default NotVerifiedAccount;
