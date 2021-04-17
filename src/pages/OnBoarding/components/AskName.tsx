import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { ButtonNext } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import Fade from "@material-ui/core/Fade/Fade";
import { MascotAvatar } from "../../../components/MascotAvatar";
import { MASCOT_NAME } from "../../../constants/names";
import { FirstnameForm } from "../../../components/Forms/FirstnameForm";
import { LastnameForm } from "../../../components/Forms/LastnameForm";

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


  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row">
          <Grid item>
            <MascotAvatar className={classes.avatar} />
          </Grid>
          <Grid container direction="column" item xs={10}>
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >Salut! Je suis {MASCOT_NAME}</Typography>
            <Typography variant="body2" >On va créer ton profile en quelques étapes.</Typography>
            <Typography variant="body2" >Comment tu t'appelles ?</Typography>
            <FirstnameForm/>
            <LastnameForm/>
            <Grid item>
              <ButtonNext />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}