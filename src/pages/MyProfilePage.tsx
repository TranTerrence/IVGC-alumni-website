import React, { Profiler, useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';
import { FormControl, TextField, FormControlLabel, Checkbox, Button, Grid } from '@material-ui/core';
import { palette } from '../constants/colors';
import { FirebaseContext } from '../components/Firebase';
import { Profile } from '../components/Firebase/firebase_interfaces';

const useStyles = makeStyles((theme: Theme) => ({
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

export default function MyProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const defaultProfile: Profile = {
    uid: "",
    firstName: "",
    lastName: "",
    lastEditDate: new Date(),
  };
  const [profile, setProfile] = useState(defaultProfile);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveChanges = () => {

    firebase?.saveProfile(profile);
  }

  return (
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <FormControl className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                fullWidth
                id="firstName"
                label="Prénom"
                name="firstName"
                autoComplete="fname"
                onChange={handleInputChange}
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
                className={classes.textField}
                onChange={handleInputChange}
              />
            </Grid>


            <Typography component="h3">Email</Typography>
            <Typography>...@test.com</Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveChanges}
            >
              Enregistrer les changements
            </Button>


          </Grid>

        </FormControl >
      </div>
    </Container>
  );
}
