import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignInPage from './pages/SignInPage';
import Footer from './components/Footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage'
import ActuPage from './pages/ActuPage'
import ArticlePage from './pages/ArticlePage'
import WriteArticlePage from './pages/WriteArticle';
import AnnuairePage from './pages/AnnuairePage';
import * as ROUTES from './constants/routes';
import GlobalAppBar from './components/GlobalAppBar';


const theme = createMuiTheme({
  typography: {
    "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: {
    primary: {
      light: "#41628b",
      main: "#0B385E",
      dark: "#001234",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#78eec7",
      main: "#41bb96",
      dark: "#008a68",
      contrastText: "#fff",
    },
    background: {
      paper: '#fff',
      default: "#F6FAFF"
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <GlobalAppBar/>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.FAQ} component={FAQPage} />
        <Route path={ROUTES.ACTU_PAGE} component={ActuPage} />
        <Route path={ROUTES.ARTICLE_PAGE} component={ArticlePage} />
        <Route path={ROUTES.WRITE_ARTICLE_PAGE} component={WriteArticlePage} />
        <Route path={ROUTES.ANNUAIRE_PAGE} component={AnnuairePage} />
      </Router>
      <Footer />

    </ThemeProvider>



  );
}

export default App;
