import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Profile, ProfileContext } from '../components/Profile/ProfileContext';
import { ConstantContext } from '../components/Firebase/ConstantContext';
import { FirebaseContext } from '../components/Firebase';
import { Button, Grid, Paper } from '@material-ui/core';
import GlobalAppBar from '../components/GlobalAppBar';
import { BirthdayForm } from '../components/Forms/BirthdayForm';
import { EducationForms } from '../components/Forms/EducationForms';
import * as ROUTES from '../constants/routes';
import { useHistory } from 'react-router';
import PromoForm from '../components/Forms/PromoForm';
import { FirstnameForm } from '../components/Forms/FirstnameForm';
import { LastnameForm } from '../components/Forms/LastnameForm';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  button: {
    marginTop : theme.spacing(2),
    marginRight : theme.spacing(2),
  },
  names: {
    marginBottom: theme.spacing(3),
  },
  mail: {
    marginBottom: theme.spacing(3),
  }
}));



export default function EditProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { basics, setProfile } = useContext(ProfileContext);
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
          <Typography variant="h4" className={classes.names}>{basics.firstName + " " + basics.lastName + " - Promotion " + basics.promotion}
          </Typography>
          <Typography className={classes.mail}>{basics.email}</Typography>
          <Grid container>
          <FirstnameForm/>
          <LastnameForm/>
          <BirthdayForm/>
          <Typography variant = 'h5'>Promotion</Typography>
          <PromoForm />
          <EducationForms/>
        </Grid>
        </Paper>
        <Grid>
          <ButtonCancel/>
          <ButtonSave/>
        </Grid>

      </Container>
    </>
  );
}


const ButtonSave = () => {
  const { profile }: { profile: Profile } = useContext(ProfileContext);
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const save = async () => {
    firebase?.updateProfile(profile);
    history.push(ROUTES.MY_PROFILE);
  };

  return (<Button variant="contained" color="primary" className={classes.button}
    onClick={save}>Sauvegarder</Button>);
}


const ButtonCancel = () => {
  const history = useHistory();
  const classes = useStyles();
  return (<Button variant="outlined" color="primary" className={classes.button}
    onClick={()=> history.push(ROUTES.MY_PROFILE)}>Annuler</Button>);
}


