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
  const [isVerified, setIsverified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const firebase = useContext(FirebaseContext);
  if (firebase) {
    firebase.auth.onAuthStateChanged(async function (user) {
      if (user) {
        setIsLoggedIn(true);
        const isVerified = await firebase.isVerified();
        const isAdmin = await firebase.isAdmin();
        setIsAdmin(isAdmin);
        setIsverified(isVerified);
      } else {
        // No user is signed in.
      }
    });
  }

  
  const AppBarAuth = ({ isVerified} : {isVerified: boolean}) => (
    <Toolbar>
      <TitleAlumni />
      <Button color='inherit' component={Link} to={ROUTES.HOME}>
        Home
          </Button>
      <Button color='inherit' component={Link} to={ROUTES.ACTU_PAGE}>
        Actualité
          </Button>
      <Button color='inherit' component={Link} to={ROUTES.CONTACT}>
        Contact
          </Button>
      {isVerified
        && <Button color='inherit' component={Link} to={ROUTES.WRITE_ARTICLE_PAGE}>
          Ecrire un article
           </Button>
      }     
      <Button color='inherit' component={Link} to={ROUTES.FAQ}>
        FAQ
          </Button>
      <Button color='inherit' component={Link} to={ROUTES.MY_PROFILE}>
        Mon Profile
          </Button>
      {
        isAdmin
          ? <Button color='inherit' component={Link} to={ROUTES.ADMIN}>
              Admin
              </Button>
          : null
      }
      

      <LogOutButton setIsLoggedIn={setIsLoggedIn} />
    </Toolbar>
  );

  return (
    <AppBar position="static">
      {
        isLoggedIn 
          ? <AppBarAuth isVerified={isVerified} />
          : <AppBarNonAuth />
      }
    </AppBar>
  );
}

const TitleAlumni = () => {
  const classes = useStyles();
  return (
    <Typography variant="h6"  className={classes.title}>
      Communauté des anciens élèves de l'institut Villebon - <Box fontStyle="italic" display='inline'>Georges Charpak</Box>
    </Typography>
  );

};

const AppBarNonAuth = () => (
  <Toolbar>
    <TitleAlumni />
    <Button color='inherit' component={Link} to={ROUTES.HOME}>
      Home
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.ACTU_PAGE}>
      Actualité
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.CONTACT}>
      Contact
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.FAQ}>
      FAQ
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.SIGN_IN}>
      Se connecter
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.SIGN_UP}>
      Créer un compte
        </Button>
  </Toolbar>
);
