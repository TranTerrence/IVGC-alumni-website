import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from './Firebase/context';
import LogOutButton from './SignOutButton';
import { ProfileContext } from './Profile/ProfileContext';
import Avatar from '@material-ui/core/Avatar';
import { Menu, MenuItem, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    white: {
      color: 'white',
      backgroundColor: 'white',
      padding: theme.spacing(0.3),
    },
    fill: {
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
      <LogoAlumni />
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
      <SpaceFill />
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
      <LogoAlumni />

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

const LogoAlumni = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <IconButton type="button" onClick={() => history.push(ROUTES.HOME)} >
      <Avatar className={classes.white} alt="Logo Institut" src="/img/favicon-96x96.png" >
      </Avatar>
    </IconButton>
  );

};

const SpaceFill = () => {
  const classes = useStyles();
  return (
    <div className={classes.fill} />
  );
};

const AppBarNonAuth = () => (
  <Toolbar>
    <LogoAlumni />
    <Button color='inherit' component={Link} to={ROUTES.ACTU_PAGE}>
      Actualité
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.RESOURCES}>
      Ressources
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.CONTACT}>
      Contact
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.FAQ}>
      FAQ
        </Button>
    <SpaceFill />
    <Button color='inherit' component={Link} to={ROUTES.SIGN_IN}>
      Se connecter
        </Button>
    <Button color='inherit' component={Link} to={ROUTES.SIGN_UP}>
      Créer un compte
        </Button>
  </Toolbar>
);



