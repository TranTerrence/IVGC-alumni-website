import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import BlogPost from '../components/BlogPost'
import { FirebaseContext } from '../components/Firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
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


function ActuPage() {
  const classes = useStyles();
  const firebase = React.useContext(FirebaseContext);

  const FirestoreCollection = () => {
    const [value, loading, error] = useCollectionData(
      firebase?.firestore.collection(FIRESTORE_CONSTS.collections.articles).limit(100),
      {
        idField: "id"
      }
    );
    return (
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value &&
          <>
            <Grid container spacing={3}>
              {value.map((post: any) => (
                <BlogPost image={post.image}
                  title={post.title}
                  avatar={post.avatar}
                  PostContent={post.PostContent}
                  PostTitle={post.PostTitle}
                  xs={12}
                  author={post.author}
                  id={post.id}
                />
              ))}
            </Grid>
          </>
        }
      </div>
    );
  }

  return (
    <div className="App">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Container>
            <Typography variant="h6" color="primary" >
              Les actualités du moment
          </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>Actualités</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Articles
        </Typography>
        <FirestoreCollection></FirestoreCollection>
      </Container>
    </div>
  );
}

export default ActuPage;