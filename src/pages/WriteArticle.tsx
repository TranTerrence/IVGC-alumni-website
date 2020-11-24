import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';
import FirebaseContext from '../components/Firebase/context';
import { useState } from 'react';
import Firebase from '../components/Firebase';
import Typography from '@material-ui/core/Typography';
import * as FIRESTORE_CONSTS from '../constants/firebase';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: "8px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  textField: {
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const [formSubmmited, setFormSubmmited] = useState<boolean>(false);

  return (
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <AlumniLogo height={150} width="auto" />
        {formSubmmited
          ? <SubmissionConfirmation />
          : <FirebaseContext.Consumer>
            {firebaseClass => <SignUpForm firebase={firebaseClass} setFormSubmmited={setFormSubmmited} />}
          </FirebaseContext.Consumer>
        }
      </div>
    </Container>
  );
}

function SubmissionConfirmation() {
  return (<Typography component="h1" variant="h5" color="primary">{"Article soumis pour vérification !"}</Typography>
  );
}

function SignUpForm({ firebase, setFormSubmmited }: { firebase: Firebase | null, setFormSubmmited: Function }) {
  const classes = useStyles();
  const defaultInputs = {
    author: '',
    PostContent: '',
    PostTitle: '',
    avatar: '',
    image: '',
    title: ''
  };

  const [inputValues, setInputValues] = useState(defaultInputs);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const sumbitUser = function () {
    if (firebase) {
      firebase.firestore.collection(FIRESTORE_CONSTS.collections.articles).add(inputValues)
      setInputValues(defaultInputs);
      setFormSubmmited(true);
    }
  }

  return (
    <FormControl className={classes.form} >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="author"
        label="author"
        name="author"
        onChange={handleInputChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="PostContent"
        label="Contenu de l'article"
        type="PostContent"
        id="PostContent"
        onChange={handleInputChange}
        multiline
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="PostTitle"
        label="PosTtitle"
        name="PostTitle"
        onChange={handleInputChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="avatar"
        label="avatar"
        name="avatar"
        onChange={handleInputChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="image"
        label="image"
        name="image"
        onChange={handleInputChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="title"
        name="title"
        onChange={handleInputChange}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={sumbitUser}
      >
        S'inscrire
      </Button>
    </FormControl>
  );
}

