import { Box, Grid, Avatar, Typography, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { ProfileContext } from "../../../components/Profile/ProfileContext";
import { ButtonNext } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import Fade from "@material-ui/core/Fade/Fade";
import { MascotAvatar } from "../../../components/MascotAvatar";
import { MASCOT_NAME } from "../../../constants/names";

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: palette.primary.main,
      },
    },
  },
  speakerName: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  }
}));


export const AskName = () => {
  const classes = useStyles();
  const { profile, changeKey } = useContext(ProfileContext);


  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row">
          <Grid item>
            <MascotAvatar />
          </Grid>
          <Grid container direction="column" item xs={10}>
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >Salut! Je suis {MASCOT_NAME}</Typography>
            <Typography variant="body2" >On va créer ton profile en quelques étapes.</Typography>
            <Typography variant="body2" >Comment tu t'appelles ?</Typography>

            <Grid container spacing={2} direction="row">
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  name="firstName"
                  autoComplete="fname"
                  value={profile.firstName}
                  onChange={(e) => {
                    changeKey("firstName", e.target.value);
                  }}
                  variant="outlined"
                  autoFocus
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Nom"
                  type="lName"
                  id="lastName"
                  margin="normal"
                  autoFocus
                  variant="outlined"
                  value={profile.lastName}
                  onChange={(e) => {
                    changeKey("lastName", e.target.value);
                  }}
                  className={classes.textField}
                />
              </Grid>
            </Grid>

            <Grid item>
              <ButtonNext />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}