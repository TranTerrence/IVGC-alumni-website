import { makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useContext } from "react";
import { palette } from "../../constants/colors";
import { ProfileContext } from "../Profile/ProfileContext";


const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: palette.primary.main,
      },
    },
  },
}));

export const LastnameForm = () => {
  const classes = useStyles();
  const { basics, changeBasics } = useContext(ProfileContext);
  return (
    <TextField
      name="lastName"
      fullWidth
      label="Nom"
      type="lName"
      id="lastName"
      margin="normal"
      variant="outlined"
      value={basics.lastName}
      onChange={(e) => {
        changeBasics("lastName", e.target.value);
      }}
      className={classes.textField}
    />
  );
}
