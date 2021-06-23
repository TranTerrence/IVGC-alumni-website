import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container } from '@material-ui/core';
import GlobalAppBar from '../components/GlobalAppBar';
import TitlePage from '../components/TitlePage';
import * as FIRESTORE_CONSTS from '../constants/firebase';
import { FirebaseContext } from '../components/Firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),

  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function FAQPage() {
  const classes = useStyles();
  const firebase = React.useContext(FirebaseContext);
  console.log(FIRESTORE_CONSTS.collections.questions)
  const FirestoreCollection = () => {
    const [value, loading, error] = useCollectionData(
      firebase?.firestore.collection(FIRESTORE_CONSTS.collections.questions).limit(100),
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
        <Container component="main" maxWidth="xl" >
        <div className={classes.paper}>
          {value.map((question: any) => (
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading} >{question.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {question.question}
        </Typography>
          </AccordionDetails>
        </Accordion>
          ))
          }
          </div>
        </Container>
          </>
        }
      </div>
    );
  }
  return (
    <>
      <GlobalAppBar />
      <TitlePage title="FAQ" />
      <FirestoreCollection></FirestoreCollection>
    </>
  );
}
