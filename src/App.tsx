import React, { useContext, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignInPage from './pages/SignInPage';
import Footer from './components/Footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import MyProfilePage from './pages/MyProfilePage';
import FAQPage from './pages/FAQPage';
import ActuPage from './pages/ActuPage';
import ArticlePage from './pages/ArticlePage';
import AdminPage from './pages/AdminPage'
import * as ROUTES from './constants/routes';
import GlobalAppBar from './components/GlobalAppBar';
import WriteArticlePage from './pages/WriteArticle';
import ContactPage from './pages/ContactPage';
import { palette } from './constants/colors';
import FirebaseContext from './components/Firebase/context';

const theme = createMuiTheme({
  typography: {
    "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: palette,
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <GlobalAppBar />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.FAQ} component={FAQPage} />
        <Route path={ROUTES.ACTU_PAGE} component={ActuPage} />
        <Route path={ROUTES.ARTICLE_PAGE} component={ArticlePage} />
        <Route path={ROUTES.WRITE_ARTICLE_PAGE} component={WriteArticlePage} />
        <Route path={ROUTES.CONTACT} component={ContactPage} />
        <LoggedInRoute path={ROUTES.MY_PROFILE} component={MyProfilePage} redirectPath={ROUTES.SIGN_IN} />
        <LoggedInRoute path={ROUTES.ADMIN} component={AdminPage} redirectPath={ROUTES.SIGN_IN} />


      </Router>
      <Footer />
    </ThemeProvider>
  );
}


const LoggedInRoute = ({ component, redirectPath, ...rest }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const firebase = useContext(FirebaseContext);
  if (firebase) {
    firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }
  const routeComponent = (props: any) => (
    isLoggedIn
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: redirectPath }} />
  );
  return <Route {...rest} render={routeComponent} />;
}


export default App;
