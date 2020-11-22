import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';
import { Box, Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { palette } from '../constants/colors';
import Avatar from '@material-ui/core/Avatar/Avatar';

const useStyles = makeStyles((theme: Theme) => ({
  stepWrapper: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: palette.primary.main,
      },
    },
  },
  buttonNext: {
    marginTop: theme.spacing(2),
    alignItems: "left",

  },
  speakerName: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  avatar: {
    marginRight: theme.spacing(1),
  }
}));

export default function OnBoardingPage() {
  const classes = useStyles();

  return (
    <Container component="main" >
      <div className={classes.stepWrapper}>
        {AskName()}
      </div>
    </Container>
  );
}

const AskName = () => {
  const classes = useStyles();

  return (

    <Box>
      <Grid container direction="row">
        <Grid item alignItems="center">
          <Avatar className={classes.avatar}>G</Avatar>
        </Grid>
        <Grid container direction="column" xs={10}>
          <Typography variant="body1" className={classes.speakerName} >Georges</Typography>
          <Typography variant="body2" >Salut! Je suis Georges</Typography>
          <Typography variant="body2" >On va créer ton profile en quelques étapes.</Typography>
          <Typography variant="body2" >Comment tu t'appelles ?</Typography>

          <Grid container spacing={2} direction="row">
            <Grid item xs={6}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="Prénom"
                name="firstName"
                autoComplete="fname"
                variant="outlined"
                autoFocus
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Nom"
                type="lName"
                id="lastName"
                margin="normal"
                autoFocus
                variant="outlined"
                className={classes.textField}
              />
            </Grid>
          </Grid>
          <Grid item >
            <Button variant="contained" color="primary" className={classes.buttonNext}
            >Suivant</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}