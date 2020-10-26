import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import { PageNotifications } from "../../../components/notifications/notificationsService";
import { LoginAction } from "./store/LoginActions";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    background: theme.palette.primary.main,
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '280px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const state = useSelector((state) => ({
    showNotificationMessage: state.showNotification.showNotificationMessage,
  }));
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    /*
      "email": "admin@recepies.dev",
      "password": "password123"
    */
    dispatch(LoginAction(form));
  };
  return (
    <div className={classes.paper}>
      {state.showNotificationMessage ? <PageNotifications /> : ""}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          value={form.email}
          onChange={(email) => setForm({ ...form, email: email.target.value })}
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={form.password}
          onChange={(password) =>
            setForm({ ...form, password: password.target.value })
          }
          name="password"
          label="Password"
          id="password"
          autoComplete="current-password"
          type={form.showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setForm({ ...form, showPassword: !form.showPassword })
                  }
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {form.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              href="/request_reset_password"
              variant="body2"
              color="secondary"
            >
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
