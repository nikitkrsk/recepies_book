import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import IconButton from "@material-ui/core/IconButton";
import ColorCard from "./ColorCard";
import { themesConfig } from "../../themes/main";

const useStyles = makeStyles((theme) => ({
  AddButton: {
    padding: theme.spacing(2),
    margin: "15px 0",
    minWidth: 220,
  },
  formControl: {
    minWidth: 220,
    margin: "10px 10px",
  },
  themesStyles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr);',
    gridGap: '10px'

  }
}));

const ChangeThemeButton = ({ context }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        aria-label="chuoose color scheme"
        aria-controls="Color Change"
        aria-haspopup="true"
        onClick={handleClickOpen}
        color="inherit"
      >
        <ColorLensIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {context.t("Choose Theme")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {context.t("Choose theme That you would like to see")}
          </DialogContentText>
          <div className={classes.themesStyles}>
            {Object.entries(themesConfig).map(([key, value]) => {
              return <ColorCard colors={value.palette} theme={key}/>;
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {context.t("Cancel")}
          </Button>
          <Button onClick={handleClose} color="primary">
            {context.t("Select")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeThemeButton;
