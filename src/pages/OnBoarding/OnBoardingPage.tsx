import React, { useContext, useEffect, } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../../components/Profile/ProfileContext';
import { AskName } from './components/AskName';
import { AskPromo } from './components/AskPromo';
import { FirebaseContext } from '../../components/Firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

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
  const { profile, setProfile } = useContext(ProfileContext);
  const firebase = useContext(FirebaseContext);

  const onBoardingSteps = [<AskName />, <AskPromo />,];

  // Sync the data with the context
  useEffect(() => {
    const fetchProfile = async () => {
      if (firebase) {
        const currentProfile = await firebase.getCurrentProfile();
        if (currentProfile !== null) {
          setProfile(currentProfile);
        }
      } else
        console.log("No firebase");
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();

  console.log("profile", profile);
  if (profile.onBoarding === onBoardingSteps.length) {
    history.push(ROUTES.MY_PROFILE);
  }
  return (
    <Container component="main" >
      <div className={classes.stepWrapper}>
        {onBoardingSteps[profile.onBoarding]}
      </div>
    </Container>
  );
}

