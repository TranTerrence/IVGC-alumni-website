import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../components/Profile/ProfileContext';
import { ConstantContext } from '../components/Firebase/ConstantContext';
import Chip from '@material-ui/core/Chip';
import { FirebaseContext } from '../components/Firebase';
import { Paper } from '@material-ui/core';
import GlobalAppBar from '../components/GlobalAppBar';
import { Field } from '../components/Profile/PostFormation';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));



export default function EditProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { profile, setProfile } = useContext(ProfileContext);
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
          <Typography variant="h4">{profile.firstName + " " + profile.lastName + " - Promotion " + profile.promotion}
          </Typography>
          <Typography>{profile.email}</Typography>
          <Typography variant="h6">OnBoarding Step</Typography>
          <Typography>{profile.onBoarding}</Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h4">{"Formation"}</Typography>
          {profile.postFormations && profile.postFormations.map(postFormation =>
            <>

              <Typography>{postFormation.school}</Typography>
              {postFormation.fields && postFormation.fields.map((item: Field) =>
                <Chip label={item.field} />
              )}
              <Typography>{postFormation.title}</Typography>
              <Typography>{"Specialité : " + postFormation.speciality}</Typography>
              <Typography>{postFormation.city}</Typography>
              <Typography>{postFormation.startDate.toDate().toDateString() + " - " + postFormation.endDate.toDate().toDateString()}</Typography>

            </>
          )}

        </Paper>
      </Container>
    </>
  );
}
