import React, { useContext, useEffect, useState, } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../components/Profile/ProfileContext';
import { FirebaseContext } from '../components/Firebase';
import { PostFormation, initPostFormation } from '../components/Profile/PostFormation';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),


  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [postFormations, setPostFormations]: [PostFormation[], Function] = useState([initPostFormation]);

  // Sync the data with the context
  // TODO: Optimization fetch only if context is empty
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
    const fetchPFs = async () => {
      if (firebase) {
        const postFormations_arr = await firebase.getPostFormations();
        if (postFormations_arr !== null) {
          setPostFormations(postFormations_arr);
        }
      } else
        console.log("No firebase");
    }
    fetchPFs();
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Container component="main" maxWidth="md" >
      <Paper className={classes.paper}>
        <Typography variant="h4">{profile.firstName + " " + profile.lastName + " - Promotion " + profile.promotion}
        </Typography>
        <Typography>{profile.email}</Typography>
        <Typography variant="h6">OnBoarding Step</Typography>
        <Typography>{profile.onBoarding}</Typography>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h4">{"Formation"}</Typography>
        {postFormations.map(postFormation =>
          <>
            <Typography>{postFormation.school}</Typography>
            <Typography>{postFormation.title}</Typography>
            <Typography>{postFormation.city}</Typography>
            <Typography>{postFormation.startDate.toDate().toDateString() + " - " + postFormation.endDate.toDate().toDateString()}</Typography>

          </>
        )}

      </Paper>
    </Container>
  );
}
