import { makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import React, { useContext } from "react";
import FirebaseContext from "../../../components/Firebase/context";
import { Profile } from "../../../components/Firebase/firebase_interfaces";
import { ProfileContext } from "../../../components/Profile/ProfileContext";


const useStyles = makeStyles((theme: Theme) => ({
  buttonNext: {
    marginTop: theme.spacing(2),
    alignItems: "left",
  }
}));



export const ButtonNext = () => {
  const { profile, changeKey }: { profile: Profile, changeKey: Function } = useContext(ProfileContext);
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const goNext = async () => {
    if (profile.onBoarding < 1) {
      await changeKey("onBoarding", profile.onBoarding + 1);
      firebase?.updateProfile(profile);

    }
  };

  return (<Button variant="contained" color="primary" className={classes.buttonNext}
    onClick={goNext}>Suivant</Button>);
}


export const ButtonPrevious = () => {
  const { profile, changeKey }: { profile: Profile, changeKey: Function } = useContext(ProfileContext);
  const classes = useStyles();

  const goNext = () => {
    if (profile.onBoarding > 0) {
      changeKey("onBoarding", profile.onBoarding - 1);
    }
  };


  return (<Button variant="outlined" color="primary" className={classes.buttonNext}
    onClick={goNext}>Précédent</Button>);
}
