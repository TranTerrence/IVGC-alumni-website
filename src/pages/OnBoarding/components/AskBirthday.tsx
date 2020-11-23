import { Box, Grid, Avatar, Typography, } from "@material-ui/core";
import React, { useContext } from "react";
import { ProfileContext } from "../../../components/Profile/ProfileContext";
import { ButtonNext } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import Fade from "@material-ui/core/Fade";
import { KeyboardDatePicker, } from '@material-ui/pickers';
import { Profile } from "../../../components/Firebase/firebase_interfaces";
import { FirebaseContext } from "../../../components/Firebase";

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
  const { profile, changeKey }: { profile: Profile, changeKey: Function } = useContext(ProfileContext);
  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row" >
          <Grid item >
            <Avatar className={classes.avatar} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QCVkDf6qZSjynGijcf47IQHaJg%26pid%3DApi&f=1">G</Avatar>
          </Grid>
          <Grid item container direction="column" xs>
            <Typography variant="body1" className={classes.speakerName} >Georges</Typography>
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
              invalidDateMessage="Mauvaise date"
              value={
                profile.birthday
                  ? profile.birthday.toDate()
                  : null}
              initialFocusedDate={new Date().setFullYear(new Date().getFullYear() - 20)}
              onChange={(date) => {
                if (date !== null)
                  changeKey("birthday", firebase?.toTimestamp(date));
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
