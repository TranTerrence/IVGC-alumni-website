import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from './Firebase/context';
import LogOutButton from './SignOutButton';
import { ProfileContext } from './Profile/ProfileContext';
import Avatar from '@material-ui/core/Avatar';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      textAlign: "left"
    },
    titleCenter: {
      flexGrow: 1,
      textAlign: "center"
    }
  }),
);

/**
 * App bar used in all pages
 */
export default function GlobalAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsverified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const firebase = useContext(FirebaseContext);

  const { basics } = useContext(ProfileContext);


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
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  }

  const ProfileButton = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const history = useHistory();
    const goTo = (route: string) => {
      history.push(route);
    }
    return (
      <div>
        <Button color='inherit' onClick={handleMenu}
          endIcon={<Avatar />}>
          {basics.firstName}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => goTo(ROUTES.MY_PROFILE)}>Mon profile</MenuItem>
          <MenuItem>
            <LogOutButton setIsLoggedIn={setIsLoggedIn} />
          </MenuItem>
        </Menu>
      </div>
    )
  };

  const AppBarAuth = ({ isVerified }: { isVerified: boolean }) => (
    <Toolbar>
      <TitleAlumni />
      <Button color='inherit' component={Link} to={ROUTES.HOME}>
        Home
          </Button>
      <Button color='inherit' component={Link} to={ROUTES.ACTU_PAGE}>
        Actualité
          </Button>
      <Button color='inherit' component={Link} to={ROUTES.RESOURCES}>
        Ressources
          </Button>
      <Button color='inherit' component={Link} to={ROUTES.CONTACT}>
        Contact
          </Button>
      {isVerified
        && <Button color='inherit' component={Link} to={ROUTES.WRITE_ARTICLE_PAGE}>
          Ecrire un article
           </Button>
      }
      {isVerified
        &&
        <Button color='inherit' component={Link} to={ROUTES.ALUMNI_BOOK_PAGE}>
          Annuaire
        </Button>
      }

      <Button color='inherit' component={Link} to={ROUTES.FAQ}>
        FAQ
          </Button>
      {
        isAdmin
          ? <Button color='inherit' component={Link} to={ROUTES.ADMIN}>
            Admin
              </Button>
          : null
      }

      <ProfileButton />

    </Toolbar>
  );


  if (isLoading) {
    return (<AppBar position="static">
      <TitleAlumni />

    </AppBar>);
  }

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
    <>
      <Typography variant="h6" className={classes.title}>
        Communauté des anciens élèves de l'institut Villebon -
          <Box fontStyle="italic" display='inline'> Georges Charpak</Box>
      </Typography>
    </>
  );

};


const AppBarNonAuth = () => (
  <Toolbar>
    <TitleAlumni />
    <Button color='inherit' component={Link} to={ROUTES.HOME}>
      Home
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.RESOURCES}>
      Ressources
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



