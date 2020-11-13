import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';
import Firebase from '../components/Firebase';
import FormControl from '@material-ui/core/FormControl';
import FirebaseContext from '../components/Firebase/context';

import { isEmailValid } from '../Utils';
import { palette } from '../constants/colors';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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
}));

export default function SignInPage() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>

        <AlumniLogo height={150} width="auto" />

        <FirebaseContext.Consumer>
          {firebaseClass => <LogInForm firebase={firebaseClass} />}
        </FirebaseContext.Consumer>

        <Grid container>
          <Grid item >
            <Link href="#" variant="body2" >
              Mot de passe oublié ?
              </Link>
          </Grid>
          <Grid item >
            <Link href="/signup" variant="body2" color="secondary">
              {"Pas encore de compte ? S'inscrire"}
            </Link>
          </Grid>
        </Grid>
      </div>

    </Container>
  );
}

function LogInForm({ firebase }: { firebase: Firebase | null }) {

  const classes = useStyles();

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
      firebase.doSignInWithEmailAndPassword(inputValues.email, inputValues.password);
    }
    else {
      setInputErrors({ ...inputErrors, 'passwordError': !inputErrors['passwordError'] });

    }
  }


  return (

    <FormControl className={classes.form} >
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
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Se souvenir de moi"
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