import React, { useContext, useEffect, } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../components/Profile/ProfileContext';
import { FirebaseContext } from '../components/Firebase';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { profile, setProfile } = useContext(ProfileContext);
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
    <Container component="main" maxWidth="md" >
      <div className={classes.paper}>
        <Typography variant="h4">{profile.firstName + " " + profile.lastName + " - Promotion " + profile.promotion}
        </Typography>
        <Typography>{profile.email}</Typography>
        <Typography variant="h6">OnBoarding Step</Typography>
        <Typography>{profile.onBoarding}</Typography>
      </div>
      <div className={classes.paper}>
        <Typography variant="h4">{"Formation"}
        </Typography>
        <Typography>{"MINES ParisTech"}</Typography>
        <Typography>{"Innovation et Entrepreneuriat"}</Typography>
      </div>
    </Container>
  );
}
