import { Box, Grid, Typography, } from "@material-ui/core";
import React, { useContext } from "react";
import { Basics, ProfileContext } from "../../../components/Profile/ProfileContext";
import { ButtonNext } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import { MASCOT_NAME } from "../../../constants/names";

import Fade from "@material-ui/core/Fade";
import { KeyboardDatePicker, } from '@material-ui/pickers';
import { FirebaseContext } from "../../../components/Firebase";
import { MascotAvatar } from "../../../components/MascotAvatar";

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


export const AskBirthday = () => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { basics, changeBasics }: { basics: Basics, changeBasics: Function } = useContext(ProfileContext);
  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row" >
          <Grid item >
            <MascotAvatar className={classes.avatar} />
          </Grid>
          <Grid item container direction="column" xs>
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >Quelle est ta date d'anniversaire  ?</Typography>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date d'anniversaire"
              inputVariant="outlined"
              cancelLabel="Annuler"
              format="dd/MM/yyyy"
              openTo="year"
              views={["year", "month", "date"]}
              disableFuture
              minDate={new Date("01/01/1950")}
              invalidDateMessage="Mauvaise date"
              value={
                basics.birthday
                  ? basics.birthday.toDate()
                  : null}
              initialFocusedDate={new Date().setFullYear(new Date().getFullYear() - 20)}
              onChange={(date) => {
                if (date !== null)
                  changeBasics("birthday", firebase?.toTimestamp(date));
              }}
              KeyboardButtonProps={{
                'aria-label': "date anniversaire",
              }}
            />

            <Grid item>{//Maybe do a check on the date before going next
            }
              <ButtonNext />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
