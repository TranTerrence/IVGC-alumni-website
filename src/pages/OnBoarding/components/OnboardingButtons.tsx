import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Slide, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../../../components/Firebase/context";
import { Profile, ProfileContext, ProfileMeta } from "../../../components/Profile/ProfileContext";
import * as ROUTES from '../../../constants/routes';
import { TransitionProps } from '@material-ui/core/transitions';
import Confetti from 'react-confetti';
const useStyles = makeStyles((theme: Theme) => ({
  buttonEnd: {
    marginTop: theme.spacing(2),
    alignItems: "left",
  }
}));

export const ButtonNext = () => {
  const { profileMeta, changeProfileMeta, profile }: { profileMeta: ProfileMeta, changeProfileMeta: Function, profile: Profile } = useContext(ProfileContext);
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const goNext = async () => {
    profileMeta.onBoarding += 1;
    console.log("GO next", profile);
    firebase?.updateProfile(profile);
    await changeProfileMeta("onBoarding", profileMeta.onBoarding);
  };

  return (<Button variant="contained" color="primary" className={classes.buttonEnd}
    onClick={goNext}>Suivant</Button>);
}

export const ButtonPrevious = () => {
  const { profileMeta, changeProfileMeta, profile }: { profileMeta: ProfileMeta, changeProfileMeta: Function, profile: Profile } = useContext(ProfileContext); const firebase = useContext(FirebaseContext);

  const goPrevious = async () => {
    if (profileMeta.onBoarding > 0) {
      profileMeta.onBoarding -= 1;
      firebase?.updateProfile(profile);
      await changeProfileMeta("onBoarding", profileMeta.onBoarding);
    }
  };

  return (<Button variant="outlined" color='inherit'
    onClick={goPrevious}>Précédent</Button>);
}


export const ButtonLast = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const goProfile = async () => {
    setOpen(true);
  };

  return (
    <>
      <Button variant="contained" color="primary" className={classes.buttonEnd}
        onClick={goProfile}>Terminer</Button>
      {open
        ? <CongratDialog />
        : null}

    </>);
}

const CongratDialog = () => {
  const { profileMeta, changeProfileMeta, profile }: { profileMeta: ProfileMeta, changeProfileMeta: Function, profile: Profile } = useContext(ProfileContext);
  const firebase = useContext(FirebaseContext);

  const history = useHistory();

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = async () => {
    profileMeta.onBoarding += 1;
    firebase?.updateProfile(profile);
    await changeProfileMeta("onBoarding", profileMeta.onBoarding);
    history.push(ROUTES.MY_PROFILE);
  }
  return (<Dialog
    open={true}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    maxWidth="xs"
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <Confetti
      width={444}
      height={217}
    />
    <DialogTitle id="alert-dialog-slide-title">Bienvenue dans la communauté!</DialogTitle>
    <DialogContent>

      <DialogContentText id="alert-dialog-slide-description">
        Tu as complété ton profil. Pour avoir accès à l'annuaire tu devras attendre qu'un administrateur valide ton compte.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Fermer
      </Button>
    </DialogActions>
  </Dialog>);
}

