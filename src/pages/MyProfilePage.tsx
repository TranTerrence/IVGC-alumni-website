import React, { useContext, } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ProfileContext } from '../components/Profile/ProfileContext';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    backgroundColor: 'white',
    borderRadius: "2px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  },
}));

export default function MyProfilePage() {
  const classes = useStyles();
  const { profile, } = useContext(ProfileContext);


  return (
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <Typography variant="h6">Prénom</Typography>
        <Typography>{profile.firstName + " " + profile.lastName}</Typography>
        <Typography variant="h6">Email</Typography>
        <Typography>{profile.email}</Typography>
        <Typography variant="h6">Promotion</Typography>
        <Typography>{profile.promotion}</Typography>
        <Typography variant="h6">OnBoarding Step</Typography>
        <Typography>{profile.onBoarding}</Typography>
      </div>
    </Container>
  );
}
