import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from './Firebase/context';
import LogOutButton from './SignOutButton';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

/**
 * App bar used in all pages
 */
export default function GlobalAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const firebase = useContext(FirebaseContext);
  if (firebase) {
    firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
      } else {
        // No user is signed in.
      }
    });
  }
  const AppBarAuth = () => (
    <Toolbar>
      <TitleAlumni />
      <Button color='inherit' component={Link} to={ROUTES.HOME}>
        Home
        </Button>
      <Button color='inherit' component={Link} to={ROUTES.MY_PROFILE}>
        Mon Profile
        </Button>
      <Button color='inherit' component={Link} to={ROUTES.CONTACT}>
        Contact
          </Button>
      <Button color='inherit' component={Link} to={ROUTES.WRITE_ARTICLE_PAGE}>
        Ecrire un article
        </Button>
      <Button color='inherit' component={Link} to={ROUTES.FAQ}>
        FAQ
        </Button>
      <Button color='inherit' component={Link} to={ROUTES.ACTU_PAGE}>
          Actualité
          </Button>
      <LogOutButton setIsLoggedIn={setIsLoggedIn} />
    </Toolbar>
  );

  return (
    <AppBar position="static">
      {
        isLoggedIn
          ? <AppBarAuth />
          : <AppBarNonAuth />
      }
    </AppBar>
  );
}

const TitleAlumni = () => {
  const classes = useStyles();
  return (
    <Typography variant="h6"  className={classes.title}>
      Association des anciens élèves de l'institut Villebon – <Box fontStyle="italic" display='inline'>Georges Charpak</Box>
    </Typography>
  );

};


const AppBarNonAuth = () => (
  <Toolbar>
    <TitleAlumni />
    <Button color='inherit' component={Link} to={ROUTES.HOME}>
      Home
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.SIGN_IN}>
      Se connecter
          </Button>
    <Button color='inherit' component={Link} to={ROUTES.SIGN_UP}>
      Créer un compte
          </Button>
    <Button color='inherit' component={Link} to={ROUTES.CONTACT}>
      Contact
       </Button>
    <Button color='inherit' component={Link} to={ROUTES.FAQ}>
      FAQ
      </Button>
      <Button color='inherit' component={Link} to={ROUTES.ACTU_PAGE}>
          Actualité
          </Button>
          

  </Toolbar>
);
