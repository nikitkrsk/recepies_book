import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { EmailConfirmed } from "./store/RegisterActions";
import { getParams } from "../../../helpers/getParams";
const useStyles = makeStyles((theme) => ({
  fullPage: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: " 1fr",
    },
  },
  leftSide: {
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 50%, rgba(0,0,19,1) 100%)`,

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  imageCentered: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "70vh",
    },
  },
  rightSide: {
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
    justifyItems: "center",
    gridGap: "20px",
    [theme.breakpoints.down("md")]: {
      height: "70vh",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 40px",
      height: "100vh",
    },
  },
  submit: {
    width: "220px",
  },
}));
const ConfirmEmail = ({ match, history }) => {
  const state = useSelector((state) => ({
    confirmEmailMessage: state.registerUser.confirmEmailMessage,
  }));
  const dispatch = useDispatch();
  const token = getParams(history.location.search).token[0];

  const classes = useStyles();
  useEffect(() => {
    dispatch(EmailConfirmed({ token }));
  }, []);
  return (
    <>
      <div className={classes.fullPage}>
        <div className={classes.leftSide}>
          <div className={classes.imageCentered}>
            <img
              src="https://webstockreview.net/images/crochet-clipart-wool-7.png"
              alt="Girl in a jacket"
              width="500px"
            />
          </div>
        </div>
        <div className={classes.rightSide}>
          <Typography variant="h5" component="h2">
            Your Email Was Confirmed
          </Typography>
          <Link href="/auth" variant="body2" color="secondary">
            Go Back To Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmail;
