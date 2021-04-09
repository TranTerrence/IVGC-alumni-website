import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../components/Profile/ProfileContext';
import { ConstantContext, Field } from '../components/Firebase/ConstantContext';
import Chip from '@material-ui/core/Chip';
import { FirebaseContext } from '../components/Firebase';
import { Avatar, Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GlobalAppBar from '../components/GlobalAppBar';
import * as ROUTES from '../constants/routes';
import TitlePage from '../components/TitlePage';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));



export default function ProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { basics, profileMeta, educations, setProfile } = useContext(ProfileContext);
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
      <TitlePage title="Mon Profil" />

      <Container component="main" maxWidth="md" >
        <Paper className={classes.paper}>
          <Avatar alt={basics.firstName} src={basics?.picture} />
          <Typography variant="h4">{basics?.firstName + " " + basics?.lastName + " - Promotion " + basics?.promotion}
          </Typography>
          <Button color='inherit' component={Link} to={ROUTES.EDIT_PROFILE}>
            Modifier mon profile
        </Button>

          <Typography>{basics?.email}</Typography>
          <Typography variant="h6">OnBoarding Step</Typography>
          <Typography>{profileMeta?.onBoarding}</Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h4">{"Formation"}</Typography>
          {educations && educations.map(education =>
            <>

              <Typography>{education.institution}</Typography>
              {education.fields && education.fields.map((item: Field) =>
                <Chip label={item.field} />
              )}
              <Typography>{education.area}</Typography>
              <Typography>{"Specialité : " + education.studyType}</Typography>


            </>
          )}

        </Paper>
      </Container>
    </>
  );
}
