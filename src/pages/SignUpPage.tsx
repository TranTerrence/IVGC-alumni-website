import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as ROUTES from '../constants/routes';
import AlumniLogo from '../components/AlumniLogo';
import FirebaseContext from '../components/Firebase/context';
import { useState } from 'react';
import { palette } from '../constants/colors';
import { isEmailValid, isPasswordValid } from '../Utils';
import Typography from '@material-ui/core/Typography';

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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const [formSubmmited, setFormSubmmited] = useState<boolean>(false);

  return (
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <AlumniLogo height={150} width="auto" />
        {formSubmmited
          ? <SubmissionConfirmation />
          : <SignUpForm setFormSubmmited={setFormSubmmited} />
        }
        <SignInLink />
      </div>
    </Container>
  );
}

function SubmissionConfirmation() {
  return (<Typography component="h1" variant="h5" color="primary">{"Nous allons vérifier votre email, et nous t'enverrons un email quand ton compte sera activé."}</Typography>
  );
}

function SignUpForm({ setFormSubmmited }: { setFormSubmmited: Function }) {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const defaultInputs = {
    email: '',
    password: '',
    passwordCheck: ''
  };
  const [inputValues, setInputValues] = useState(defaultInputs);
  const [inputErrors, setInputErrors] = useState({
    emailError: false,
    passwordError: false,
    passwordCheckError: false
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const checkErrors = (inputs: {
    email: string,
    password: string,
    passwordCheck: string
  }) => {
    const emailValid = isEmailValid(inputs.email);
    const passwordValid = isPasswordValid(inputs.password);
    const samePassword = inputs.password === inputs.passwordCheck;
    setInputErrors({
      emailError: !emailValid,
      passwordError: !passwordValid,
      passwordCheckError: !samePassword
    });
    return emailValid && passwordValid && samePassword;
  }

  const sumbitUser = async function () {
    const formIsValid = checkErrors(inputValues);
    if (formIsValid && firebase) {
      firebase.doCreateUserWithEmailAndPassword(inputValues.email, inputValues.password);
      setInputValues(defaultInputs);
      setFormSubmmited(true);
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
        className={classes.textField}
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
  );
}

function SignInLink() {
  return (
    <span style={{ float: "left", width: "100%" }}>
      <Link href={ROUTES.SIGN_IN} variant="body2" color="secondary" >
        {"Déjà un compte ? Se connecter"}
      </Link>
    </span>
  );
}
