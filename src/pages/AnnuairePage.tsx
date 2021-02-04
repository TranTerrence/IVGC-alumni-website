import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FirebaseContext } from '../components/Firebase';
import { useCollectionData  } from 'react-firebase-hooks/firestore';
import * as FIRESTORE_CONSTS from '../constants/firebase';

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
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value &&
          <>
            {value.map((profile: any) => (
              <div> {profile.email} {profile.firstName} {profile.lastName}  </div>
            ))}
          </>
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
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={name}
          onChange={handleName}
          helperText="Please select the name you're looking for"
        >
          {names.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency-native"
          select
          label="Native select"
          value={firstname}
          onChange={handleFirstname}
          SelectProps={{
            native: true,
          }}
          helperText="Please select firstname"
        >
          {firstnames.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          id="filled-select-currency"
          select
          label="Select"
          value={school}
          onChange={handleSchool}
          helperText="Please select school"
          variant="filled"
        >
          {schools.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
      <Button
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          onClick={handleSearch}
      >
          Search
      </Button>
      </div>
     <FirestoreCollection></FirestoreCollection>
    </form> 
  );
}