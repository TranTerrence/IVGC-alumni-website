import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';
import GlobalAppBar from '../components/GlobalAppBar';
import TitlePage from '../components/TitlePage';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",


  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function ContactPage() {
  const classes = useStyles();

  return (
    <>
      <GlobalAppBar />
      <TitlePage title="Contact" />


      <Container component="main" maxWidth="xs" >
        <div className={classes.paper}>

          <AlumniLogo height={150} width="auto" />


          <Typography component="h1" variant="h5" color="secondary">
            En construction
        </Typography>



        </div>

      </Container>
    </>
  );
}
