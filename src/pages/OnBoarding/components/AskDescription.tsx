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


export const AskDescription = () => {
  const classes = useStyles();
  const { profile, changeKey } = useContext(ProfileContext);


  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row">
          <Grid item>
            <MascotAvatar className={classes.avatar} />
          </Grid>
          <Grid container direction="column" item xs={10}>
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >Donne moi une petite description de ce que tu fais actuellement, et de qui tu es.</Typography>

            <Grid container spacing={2} direction="row">
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={profile.description}
                  onChange={(e) => {
                    changeKey("description", e.target.value);
                  }}
                  variant="outlined"
                  autoFocus
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