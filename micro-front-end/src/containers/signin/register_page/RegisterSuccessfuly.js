import React from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: "100px",
    display: "grid",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    justifyItems: "center",
    gridGap: "20px",
  },
}));
const RegisterSuccessfuly = () => {
  const classes = useStyles()
  const state = useSelector((state) => ({
    email: state.registerUser.email,
  }));
  return (
    <>
      <div className={classes.content}>
        <EmailIcon style={{ fontSize: 90 }} />
        <Typography variant="h4" component="h2">
          Confirm your email address!
        </Typography>
        <Typography variant="h6" component="h2">
          A confirmation e-mail has been sent to {state.email}
        </Typography>
        <Typography variant="h6" component="h2">
          Check your inbox and click on the
          "Confirm my email" link to confirm
          your email address.
        </Typography>
        <Link
              href="/auth"
              variant="body2"
              color="secondary"
            >
              Go Back To Login
            </Link>
      </div>
    </>
  );
};

export default RegisterSuccessfuly;
