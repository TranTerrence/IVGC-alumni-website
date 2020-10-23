import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as ROUTES from '../constants/routes';
import AlumniLogo from '../components/AlumniLogo';
import Firebase from '../components/Firebase';
import { useState } from 'react';

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const isEmailValid = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const isPasswordValid = (password: string) => {
  if (password.length < 6)
    return false;
  else
    return true;
  
}
export default function SignUpPage() {
  const classes = useStyles();
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    passwordCheck: ''
  });

  const [inputErrors, setInputErrors] = useState({
    emailError: false,
    passwordError: false,
    passwordCheckError: false
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const checkErrors = (inputs : {
    email: string,
    password: string,
    passwordCheck: string
  }) => {
    
    setInputErrors({ 
      emailError: !isEmailValid(inputs.email),
      passwordError: !isPasswordValid(inputs.password),
      passwordCheckError: inputs.password !== inputs.passwordCheck
    });
  
  
  }

  const sumbitUser = function (event: object) {
    console.log('test');
    console.log(inputValues);
    checkErrors(inputValues);
  }

  return (
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>


        <AlumniLogo height={150} width="auto" />
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={inputErrors.passwordError}

            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            helperText={inputErrors.passwordError
              ? "Le mot de passe doit faire plus de 6 caractères."
            : ""}

          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={inputErrors.passwordCheckError}
            name="passwordCheck"
            label="Répéter le mot de passe"
            type="password"
            id="passwordCheck"
            helperText={inputErrors.passwordCheckError
              ? "Veuillez entrer le même mot de passe"
            : ""}
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sumbitUser}
          >
            S'inscrire
          </Button>
        </FormControl>

        <Grid container>
          <Grid item>
            <Link href={ROUTES.SIGN_IN} variant="body2" color="secondary">
              {"Déjà un compte ? Se connecter"}
            </Link>
          </Grid>
        </Grid>
      </div>

    </Container>
  );
}