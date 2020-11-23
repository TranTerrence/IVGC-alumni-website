import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import ProfileContextProvider from './components/Profile/ProfileContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
      <ProfileContextProvider>
        <App />
      </ProfileContextProvider>
    </MuiPickersUtilsProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
