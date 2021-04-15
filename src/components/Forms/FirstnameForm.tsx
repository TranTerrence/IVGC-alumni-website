import { Grid, makeStyles, TextField, Theme } from "@material-ui/core";
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


export const FirstnameForm = () => {
    const classes = useStyles();
    const { basics, changeBasics } = useContext(ProfileContext);
  
  
    return (
          <TextField
            margin="normal"
            fullWidth
            id="firstName"
            label="Prénom"
            name="firstName"
            autoComplete="fname"
            value={basics.firstName}
            onChange={(e) => {
                changeBasics("firstName", e.target.value);
            } }
            variant="outlined"
            autoFocus
            className={classes.textField} />
    );
}