import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import { FirebaseContext } from '../components/Firebase';
import { useCollectionData  } from 'react-firebase-hooks/firestore';
import * as FIRESTORE_CONSTS from '../constants/firebase';
import { Container } from '@material-ui/core';
import GlobalAppBar from '../components/GlobalAppBar';

const names = [
  {
    value: 'GEFFROY',
    label: 'GEFFROY',
  },
];

const firstnames = [
  {
    value: 'Thomas',
    label: 'Thomas',
  },
];

const schools = [
  {
    value: 'ENSTA',
    label: 'ENSTA',
  },
  {
    value: 'X',
    label: 'X',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

export default function MultilineTextFields() {
  const classes = useStyles();
  const firebase = React.useContext(FirebaseContext);
  
  const FirestoreCollection = () => {
    const [value, loading, error] = useCollectionData(
      firebase?.firestore.collection(FIRESTORE_CONSTS.collections.profiles).limit(100),
      {
        idField: "id"
      }
    );
    return (
      <div>
        <GlobalAppBar />

        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value &&
          <Container component="main" >
          <List className={classes.root}>
          <>
            {value.map((profile: any) => (
              <Container> 
                <ListItem>
                  <ListItemText primary={profile.lastName + " " + profile.firstName}
                    secondary={"Promotion : " + profile.promotion + ", post formation : " + profile.postFormations[0].school + ", " + profile.postFormations[0].city} />
                </ListItem>
                <div> voir </div>
              </Container>
            ))}
          </>
          </List>
          </Container>
        }
      </div>
    );
  }
  const [name, setName] = React.useState('Doe');
  const [firstname, setFirstname] = React.useState('John');
  const [school, setSchool] = React.useState('ENSTA ParisTech');
  
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  
  const handleFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  
  const handleSchool = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchool(event.target.value);
  };
  
  const handleSearch = (event: React.MouseEvent<HTMLElement>) => {
    setSchool("X");
    console.log(school);
  };

  return (
     <FirestoreCollection></FirestoreCollection>
  );
}