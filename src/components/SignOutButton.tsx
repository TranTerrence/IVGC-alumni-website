import React, { useContext } from "react";
import Button from '@material-ui/core/Button';
import * as ROUTES from '../constants/routes';
import FirebaseContext from "./Firebase/context";
import { useHistory } from 'react-router-dom';
export default function SignOutButton({ setIsLoggedIn }: { setIsLoggedIn: Function }) {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const SignOutUser = async function () {
    if (firebase) {
      firebase.doSignOut();
      setIsLoggedIn(false);
      history.push(ROUTES.SIGN_IN);
    }
  }

  return (
    <Button color='inherit' onClick={SignOutUser}>
      Se déconnecter
    </Button>
  );
}


