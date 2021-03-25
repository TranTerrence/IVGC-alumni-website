import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../components/Profile/ProfileContext';
import { ConstantContext } from '../components/Firebase/ConstantContext';
import { FirebaseContext } from '../components/Firebase';
import { Paper } from '@material-ui/core';
import GlobalAppBar from '../components/GlobalAppBar';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));


export default function EditProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { basics, profileMeta, setProfile } = useContext(ProfileContext);
  const fieldList = useContext(ConstantContext);

  console.log("FIELD LIST", fieldList);
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
          <Typography variant="h4">{basics.firstName + " " + basics.lastName + " - Promotion " + basics.promotion}
          </Typography>
          <Typography>{basics.email}</Typography>
          <Typography variant="h6">OnBoarding Step</Typography>
          <Typography>{profileMeta.onBoarding}</Typography>
        </Paper>
      </Container>
    </>
  );
}
