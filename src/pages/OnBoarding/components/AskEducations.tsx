import { Box, Grid, Typography, } from "@material-ui/core";
import React from "react";
import { ButtonLast } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import { MASCOT_NAME } from "../../../constants/names";
import Fade from "@material-ui/core/Fade";
import { MascotAvatar } from "../../../components/MascotAvatar";
import { EducationType, } from "../../../components/Profile/ProfileContext";
import { EducationForms } from "../../../components/Forms/EducationForms";
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

export interface updateEducationProps {
  index: number, key: keyof EducationType, newValue: any
}

export const AskEducations = () => {
  const classes = useStyles();
  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row" >
          <Grid item >
            <MascotAvatar className={classes.avatar} />
          </Grid>
          <Grid item container direction="column" xs >
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >Qu'as-tu fais après l'institut ?</Typography>
            <EducationForms />
            <Grid item>
              <ButtonLast />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
