import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import { ResetPassRequest } from "./store/ForgotPasswordActions";
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
const ResetPassword = ({ match, history }) => {
 
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({ error: false, errorMessage: "" });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const token = getParams(history.location.search).token[0];

  const classes = useStyles();
  useEffect(() => {
    form.password === "" ? setDisabled(true) : setDisabled(false);
  }, [form.password]);

  const sendRequest = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError({
        error: true,
        errorMessage: "Password and Confirm Password don't match",
      });
    } else {
      setError({
        error: false,
        errorMessage: "",
      });
      dispatch(ResetPassRequest({ password: form.password, token }));
    }
  };
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
            RESET YOUR PASSWORD
          </Typography>
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
            autoComplete="new-password"
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
          <TextField
            variant="outlined"
            margin="normal"
            error={error.error}
            helperText={error.errorMessage}
            required
            fullWidth
            value={form.confirmPassword}
            onChange={(password) =>
              setForm({ ...form, confirmPassword: password.target.value })
            }
            name="confirmPassword"
            label="Confirmm Password"
            id="confirmPassword"
            autoComplete="new-password"
            type="password"
          />
          <Button
            disabled={disabled}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sendRequest}
          >
            Reset Password
          </Button>
          <Link href="/auth" variant="body2" color="secondary">
            Go Back To Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
