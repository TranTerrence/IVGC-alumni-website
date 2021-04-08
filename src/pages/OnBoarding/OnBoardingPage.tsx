import React, { useContext, useEffect, useState, } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../../components/Profile/ProfileContext';
import { AskName } from './components/AskName';
import { AskPromo } from './components/AskPromo';
import { FirebaseContext } from '../../components/Firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import { AskBirthday } from './components/AskBirthday';
import { AskEducations } from './components/AskEducations';
import { AppBar, Button, CircularProgress, Toolbar, Typography } from '@material-ui/core';
import ConstantContextProvider from '../../components/Firebase/ConstantContext';
import { ButtonPrevious } from './components/OnboardingButtons';
import { AskPicture } from './components/AskPicture';

const useStyles = makeStyles((theme: Theme) => ({
  stepWrapper: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function OnBoardingPage() {

  const classes = useStyles();
  const { profile, profileMeta, setProfile } = useContext(ProfileContext);
  const firebase = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(true);
  const onBoardingSteps = [<AskName />,
  <AskBirthday />,
  <AskPromo />,
  <AskPicture />,
  <ConstantContextProvider>
    <AskEducations />
  </ConstantContextProvider>,
  ];

  // Sync the data with the context
  useEffect(() => {
    const fetchProfile = async () => {
      if (firebase) {
        const currentProfile = await firebase.getCurrentProfile();
        if (currentProfile !== null) {
          setProfile(currentProfile);
        }
        setIsLoading(false);
      } else
        console.log("No firebase");
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();

  console.log("profile", profile);
  if (profileMeta?.onBoarding === onBoardingSteps.length) {
    history.push(ROUTES.MY_PROFILE);
  }
  return (
    <>
      <AppBarOnBoarding step={profileMeta?.onBoarding} />
      <LinearProgress variant="determinate" color="secondary" value={(profileMeta?.onBoarding / onBoardingSteps.length) * 100} />
      <Container component="main" maxWidth="sm">
        <div className={classes.stepWrapper}>
          {isLoading
            ? <CircularProgress />
            : onBoardingSteps[profileMeta?.onBoarding]}
        </div>
      </Container>
    </>

  );
}

export const AppBarOnBoarding = ({ step }: { step: number }) => {
  const useStyles = makeStyles((theme: Theme) => ({
    titleCenter: {
      flexGrow: 1,
      textAlign: "center"
    },
  }
  )
  );

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        {step > 0 && <ButtonPrevious />}
        <Typography variant="h6" className={classes.titleCenter}>Bienvenue dans la communauté</Typography>
        <LogOutButton />
      </Toolbar>
    </AppBar>
  );
}


const LogOutButton = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const SignOutUser = async function () {
    if (firebase) {
      firebase.doSignOut();
      history.push(ROUTES.SIGN_IN);
    }
  }

  return (
    <Button color='inherit' onClick={SignOutUser}>
      Se déconnecter
    </Button>
  );
}
