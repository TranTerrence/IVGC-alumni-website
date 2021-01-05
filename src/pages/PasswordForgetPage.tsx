import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';
import FormControl from '@material-ui/core/FormControl';
import FirebaseContext from '../components/Firebase/context';
import * as ROUTES from '../constants/routes';

import { isEmailValid } from '../Utils';
import { palette } from '../constants/colors';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
}));

export default function PasswordForgetPage() {
  const classes = useStyles();

  return (
    <>
      <AlumniLogo height={80} width="auto" />

      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>


          <ResetPasswordForm />
          <Link href={ROUTES.SIGN_IN} variant="body2" color="primary">
            {"Revenir à la connexion"}
          </Link>
        </div>

      </Container>
    </>
  );
}



function ResetPasswordForm() {

  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Impossible d'envoyer le lien de confirmation");

  const resetPassword = async function () {
    const emailValid = isEmailValid(email);
    setEmailError(!emailValid);

    if (emailValid && firebase) {
      firebase.doPasswordReset(email).then(function () {
        // Email sent.
        setOpen(true);

      }).catch(function (error) {
        // An error happened.
        if (error.code === "auth/user-not-found") {
          //User not found
          setErrorMsg("Il n'y a pas de compte créé pour cet email")
        }
        console.log("ERROR ", error);

        setOpenError(true);


      });

    }
  }

  const redirectUser = function () { history.push(ROUTES.SIGN_IN) };

  return (

    <FormControl className={classes.form} >
      <Typography color="primary" variant="h5">Mot de passe oublié ?</Typography>
      <Typography>Nous enverrons un lien de récupération à</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"

        name="email"
        error={emailError}
        placeholder="Entre une adresse e-mail"
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
        helperText={emailError
          ? "Veuillez entrer un email valide"
          : ""}
        autoFocus
        className={classes.textField}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={resetPassword}
      >
        Envoyer un lien de récupération
      </Button>
      <ConfirmationDialog open={open} onClose={redirectUser} />
      <Snackbar open={openError}
        autoHideDuration={120000}
        anchorOrigin={{ "horizontal": "center", "vertical": "bottom" }}
        onClose={() => setOpenError(false)}
      >
        <SnackbarContent
          style={{
            backgroundColor: palette.error.main,
          }}
          message={errorMsg}
          action={
            <React.Fragment>
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={() => setOpenError(false)}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        />
      </Snackbar>


    </FormControl >
  );
}

function ConfirmationDialog({ open, onClose }: { open: boolean, onClose: Function }) {

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title" >
        <CheckCircleIcon color="secondary" fontSize={"large"} /> <Typography >Un email de confirmation a été envoyé.</Typography></DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Fermer
          </Button>
      </DialogActions>
    </Dialog>
  );
}

