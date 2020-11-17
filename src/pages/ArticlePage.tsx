import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { FirebaseContext } from '../components/Firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import queryString from 'query-string'
import * as FIRESTORE_CONSTS from '../constants/firebase';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: "#fff"
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://paristech.fr/sites/default/files/styles/carrousel/public/images/institut_villeboncthecounciloftheeuropeanunion_0.jpg?itok=jR7zgYcR')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    }
  },
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
}));


function ArticlePage() {
  const classes = useStyles();
  const firebase = React.useContext(FirebaseContext);
  const parsedId = queryString.parse(window.location.search).id

  const FirestoreDocument = () => {
    const [value, loading, error] = useDocumentData(
      firebase?.firestore.doc(FIRESTORE_CONSTS.collections.articles + '/' + parsedId));

    return (
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value &&
          <><Box style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${value.image})`,
            height: "500px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "4rem",
          }}>
            <Box>{value.PostTitle}</Box>
          </Box>
            <Container maxWidth="lg" className={classes.blogsContainer}>
              <Grid container spacing={3}>
                <Typography> {value.PostContent} </Typography>
              </Grid>
            </Container></>
        }
      </div>
    );
  };

  return (
    <div className="App">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" color="primary" >
            Les actualités du moment
          </Typography>
        </Toolbar>
      </AppBar>
      <FirestoreDocument></FirestoreDocument>
    </div>
  );
}

export default ArticlePage;