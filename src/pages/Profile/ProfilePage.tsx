import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../../components/Profile/ProfileContext';
import { FirebaseContext } from '../../components/Firebase';
import { Button, Grid, Paper } from '@material-ui/core';
import GlobalAppBar from '../../components/GlobalAppBar';
import EducationTimeline from '../../components/EducationTimeline';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  oppositeContent: {
    flex: 0,
  },
  profilePic: {
    height: theme.spacing(16),
    width: theme.spacing(16),
  },
  name: {
    marginTop: theme.spacing(3),
  },
  modification: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(5),
  },
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
          <Grid container direction="row">
            <Grid item xs={2}>
              <Avatar alt={basics.firstName} src={basics?.picture} className={classes.profilePic} />

            </Grid>
            <Grid container item direction="column" xs={7} className={classes.name}>
              <Typography variant="h4">{basics?.firstName + " " + basics?.lastName}</Typography>
              <Typography variant="h6">{"Promotion " + basics?.promotion}
              </Typography>
            </Grid>
            <Grid xs={3}>
              <Button component={Link} to={ROUTES.EDIT_PROFILE} className={classes.modification} startIcon={<EditIcon />} color="primary">
                Modifier mon profile
              </Button>
            </Grid>


          </Grid>

        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h4">{"Formation"}</Typography>
          <EducationTimeline educations={educations} />
        </Paper>
      </Container>
    </>
  );
}
