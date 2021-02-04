import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

/**
 * App bar used in all pages
 */
export default function GlobalAppBar() {
  const classes = useStyles();

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"  className={classes.title}>
            Association des anciens élèves de l'institut Villebon – <Box fontStyle="italic" display='inline'>Georges Charpak</Box>
          </Typography>
          <Button color='inherit' component={Link} to={ROUTES.HOME}>
            Home
          </Button>
          <Button color='inherit' component={Link} to={ROUTES.SIGN_IN}>
            Se connecter
          </Button>
          <Button color='inherit' component={Link} to={ROUTES.SIGN_UP}>
            Créer un compte
          </Button>
          <Button color='inherit' component={Link} to={ROUTES.FAQ}>
          FAQ
          </Button>
          <Button color='inherit' component={Link} to={ROUTES.ACTU_PAGE}>
          Actualité
          </Button>
          <Button color='inherit' component={Link} to={ROUTES.WRITE_ARTICLE_PAGE}>
          Ecrire un article
          </Button>
          <Button color='inherit' component={Link} to={ROUTES.ANNUAIRE_PAGE}>
          Annuaire
          </Button>
        
        </Toolbar>
      </AppBar>
  );
}
