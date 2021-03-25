import React, { useContext, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignInPage from './pages/SignInPage';
import Footer from './components/Footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/Profile/ProfilePage';
import FAQPage from './pages/FAQPage';
import ActuPage from './pages/ActuPage';
import ArticlePage from './pages/ArticlePage';
import AdminPage from './pages/AdminPage'
import * as ROUTES from './constants/routes';
import WriteArticlePage from './pages/WriteArticle';
import ContactPage from './pages/ContactPage';
import OnBoardingPage from './pages/OnBoarding/OnBoardingPage';

import { palette } from './constants/colors';
import FirebaseContext from './components/Firebase/context';
import { frFR } from '@material-ui/core/locale';
import ResourcesPage from './pages/ResourcesPage';
import PasswordForgetPage from './pages/PasswordForgetPage';
import EditProfilePage from './pages/EditProfilePage';
import LoadingPage from './pages/LoadingPage';
const theme = createMuiTheme({
  typography: {
    "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: palette,
}, frFR);

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.FAQ} component={FAQPage} />
        <Route path={ROUTES.ACTU_PAGE} component={ActuPage} />
        <Route path={ROUTES.ARTICLE_PAGE} component={ArticlePage} />
        <Route path={ROUTES.WRITE_ARTICLE_PAGE} component={WriteArticlePage} />
        <Route path={ROUTES.CONTACT} component={ContactPage} />
        <Route path={ROUTES.RESOURCES} component={ResourcesPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

        <LoggedInRoute path={ROUTES.MY_PROFILE} component={ProfilePage} redirectPath={ROUTES.SIGN_IN} />
        <Route path={ROUTES.EDIT_PROFILE} component={EditProfilePage} redirectPath={ROUTES.SIGN_IN} />
        <LoggedInRoute path={ROUTES.ONBOARDING} component={OnBoardingPage} redirectPath={ROUTES.ONBOARDING} />
        <AdminRoute path={ROUTES.ADMIN} component={AdminPage} redirectPath={ROUTES.MY_PROFILE} />

      </Router>
      <Footer />
    </ThemeProvider>
  );
}

const LoggedInRoute = ({ component, redirectPath, path, ...rest }: { component: React.FC, redirectPath: string, path: string, rest?: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // let some time to firebase to retrieve the user state

  const firebase = useContext(FirebaseContext);
  if (firebase) {
    firebase.auth.onAuthStateChanged(function (user) {
      setIsLoggedIn(firebase.isLoggedIn());
      setIsLoading(false);
    });
  }

  let routeComponent = (props: any) => (
    isLoggedIn && !isLoading
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: redirectPath }} />
  );
  return isLoading
    ? <LoadingPage />
    : < Route {...rest} path={path} render={routeComponent} />
}

/**
 * 
 * Should be logged in and admin!
 */
const AdminRoute = ({ component, redirectPath, path, ...rest }: { component: React.FC, redirectPath: string, path: string, rest?: any }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const firebase = useContext(FirebaseContext);
  if (firebase) {
    firebase.auth.onAuthStateChanged(async function (user) {
      if (user) {
        // User is logged In
        const isAdmin = await firebase.isAdmin();
        setIsAdmin(isAdmin);
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);

    });
  }
  const routeComponent = (props: any) => (
    isAdmin && !isLoading
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: redirectPath }} />
  );
  return isLoading
    ? <LoadingPage />
    : <Route {...rest} path={path} render={routeComponent} />;
}


export default App;
