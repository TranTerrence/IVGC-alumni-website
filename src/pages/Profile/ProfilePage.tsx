import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../../components/Profile/ProfileContext';
import { FirebaseContext } from '../../components/Firebase';
import { Paper } from '@material-ui/core';
import GlobalAppBar from '../../components/GlobalAppBar';
import EducationTimeline from '../../components/EducationTimeline';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  oppositeContent: {
    flex: 0,
  }
}));



export default function ProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { basics, educations, setProfile } = useContext(ProfileContext);

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
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalAppBar />

      <Container component="main" maxWidth="md" >
        <Paper className={classes.paper}>
          <Typography variant="h4">{basics?.firstName + " " + basics?.lastName + " - Promotion " + basics?.promotion}
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h4">{"Formation"}</Typography>
          <EducationTimeline educations={educations} />
        </Paper>
      </Container>
    </>
  );
}
