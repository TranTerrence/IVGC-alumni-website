import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Banner from "./components/Banner";
import UserItem from './components/UserItem';
import GlobalAppBar from '../../components/GlobalAppBar';

const useStyles = makeStyles(theme => ({

  appBar: {
    position: "relative",
  },
  logo: {
    maxHeight: 42,
  },

  nbResult: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(120)
  },
  layout: {
    width: "auto",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  appBarButton: {
    magin: theme.spacing(2),
  },
  copyright: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  titleBlue: {
    fontSize: 42,
    fontWeight: 700,
    fontFamily: "rocaone",
  },


}));


export default function AnnuairePage() {
  const db = firebase.firestore();

  const classes = useStyles();
  //HOOKS
  const [userList, setUserList] = useState([]); //Job list to show eventually filtered
  const [nbUsersToShow, setNBUsersToShow] = useState(20);

  const [fullUserList, setFullUserList] = useState([]); // The whole jobList without filtering
  const [isLoading, setIsLoading] = useState(true);

  // This effect runs one time for each session
  useEffect(() => {
    setIsLoading(true);
    async function getUserList() {
      const usersRef = db.collection('profiles');
      const snapshot = await usersRef.get();

      let userlist = [];
      snapshot.forEach(doc => {
        let user = doc.data();
        user.id = doc.id;
        if (user.educations) {
          for (const elem of user.educations) {
            if (elem.institution) {
              userlist.push(user);
              break;
            }
          }
        }
      });
      setUserList(userlist);
      setFullUserList(userlist);
      setIsLoading(false);
    }
    getUserList();
  }, [db]);



  return (

    <React.Fragment>
      <GlobalAppBar />
      <CssBaseline />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        className={classes.layout}
        spacing={2}
      >
        <Grid item xs={12} justify="center" container alignItems='center' >
          <Banner fullUserList={fullUserList} userList={userList} setUserList={setUserList} setIsLoading={setIsLoading} />

        </Grid>

        {(userList === undefined || isLoading)
          ? null
          : <Grid item xs={12} justify="center" container alignItems='center' >
            <Typography variant="h5" className={classes.nbResult}   >
              {userList.length + " résultat(s)"}
            </Typography></Grid>
        }


        {(userList === undefined || isLoading)
          ? <Grid item xs={12} container justify="center"><CircularProgress color='secondary' /></Grid>
          : userList.reverse().slice(0, nbUsersToShow).map((user) => ( //Reverse to change the order and put the last published on top
            <Grid item xs={12} key={user.id} justify="center" container >
              <UserItem User={user} />
            </Grid>))
        }
        {(nbUsersToShow < userList.length)

          ? <Grid item xs={12} container justify="center">
            <Button color='secondary' onClick={() => {
              const NBusersToLoad = 20;
              if (nbUsersToShow + NBusersToLoad < userList.length)
                setNBUsersToShow(nbUsersToShow + 20);
              else setNBUsersToShow(userList.length);

            }}>Load more</Button>
          </Grid>
          : null
        }

      </Grid>

    </React.Fragment>
  );
}

