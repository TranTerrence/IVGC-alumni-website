import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: "2px",
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
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>

        <AlumniLogo height={150} width="auto" />


        <Typography component="h1" variant="h5" color="secondary">
          Contact
        </Typography>

        <Typography component="h4" variant="h6" color="secondary">
          Adresse : 
          Mail : 
        </Typography>

      </div>

    </Container>
  );
}
