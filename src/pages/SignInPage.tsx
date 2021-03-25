import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';
import FormControl from '@material-ui/core/FormControl';
import FirebaseContext from '../components/Firebase/context';
import * as ROUTES from '../constants/routes';

import { isEmailValid } from '../Utils';
import { palette } from '../constants/colors';
import { useHistory } from 'react-router-dom';
import { ProfileContext } from '../components/Profile/ProfileContext';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
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
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: palette.primary.main,
      },

    },
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  }
}));

export default function SignInPage() {
  const classes = useStyles();

  return (
    <>
      <AlumniLogo height={100} width="auto" />

      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>


          <LogInForm />

          <Divider className={classes.divider} style={{ width: '100%' }} />


          <Grid container>
            <Grid item >
              <Link href={ROUTES.PASSWORD_FORGET} variant="body2" >
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid item >
              <Link href={ROUTES.SIGN_UP} variant="body2" color="secondary">
                {"Pas encore de compte ? S'inscrire"}
              </Link>
            </Grid>
          </Grid>
        </div>

      </Container>
    </>
  );
}

function LogInForm() {

  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { setProfile } = useContext(ProfileContext);

  const history = useHistory();

  const defaultInputs = {
    email: '',
    password: '',
  };
  const [inputValues, setInputValues] = useState(defaultInputs);
  const [inputErrors, setInputErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };


  const logInUser = async function () {
    const emailValid = isEmailValid(inputValues.email);

    setInputErrors({ ...inputErrors, 'emailError': !emailValid });

    if (emailValid && firebase) {
      const user = await firebase.doSignInWithEmailAndPassword(inputValues.email, inputValues.password);
      if (user !== undefined && ('uid' in user)) {
        const idToken = await user.getIdTokenResult();
        console.log(idToken.claims);

        // Refresh the profile context
        const currentProfile = await firebase.getCurrentProfile();
        let goTo = ROUTES.ONBOARDING;
        if (currentProfile) {
          await setProfile({
            currentProfile
          });
          if (currentProfile.metadata.onBoarding >= 2) {
            goTo = ROUTES.MY_PROFILE;
          }

        }
        history.push(goTo);

      }
    }
    else {
      setInputErrors({ ...inputErrors, 'passwordError': !inputErrors['passwordError'] });
    }
  }


  return (

    <FormControl className={classes.form} >
      <Typography color="primary" variant="h5" align="center">Se connecter</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        error={inputErrors.emailError}
        autoComplete="email"
        onChange={handleInputChange}
        helperText={inputErrors.emailError
          ? "Veuillez entrer un email valide"
          : ""}
        autoFocus
        className={classes.textField}
      />
      <TextField
        name="password"
        label="Mot de passe"
        type="password"
        id="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        error={inputErrors.passwordError}
        className={classes.textField}
        autoComplete="current-password"
        onChange={handleInputChange}
        helperText={inputErrors.passwordError
          ? "Le mot de passe entré n'est pas correct."
          : ""}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={logInUser}
      >
        Se connecter
      </Button>
    </FormControl >
  );
}