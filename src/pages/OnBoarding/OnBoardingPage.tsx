import React, { useContext, } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../../components/Profile/ProfileContext';
import { AskName } from './components/AskName';
import { AskPromo } from './components/AskPromo';


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
  const { profile } = useContext(ProfileContext);

  const onBoardingSteps = [<AskName />, <AskPromo />,];

  console.log("profile", profile);
  return (
    <Container component="main" >
      <div className={classes.stepWrapper}>
        {onBoardingSteps[profile.onBoarding]}
      </div>
    </Container>
  );
}

