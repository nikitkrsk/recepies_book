import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { PageNotifications } from "../../../components/notifications/notificationsService";
import { FPRequest } from "./store/ForgotPasswordActions";

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
const ForgotPassword = () => {
  const state = useSelector((state) => ({
    showNotificationMessage: state.showNotification.showNotificationMessage,
  }));
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    email === "" ? setDisabled(true) : setDisabled(false);
  }, [email]);

  const sendRequest = (event) => {
    event.preventDefault();
    dispatch(FPRequest({ email }));
  };
  return (
    <>
      {state.showNotificationMessage ? <PageNotifications /> : ""}

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
            RECOVER YOUR PASSWORD
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={(email) => setEmail(email.target.value)}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            disabled={disabled}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sendRequest}
          >
            Send Reset Link
          </Button>
          <Link href="/auth" variant="body2" color="secondary">
            Go Back To Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
