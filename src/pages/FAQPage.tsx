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

import CircularProgress from '@material-ui/core/CircularProgress';

export interface QuestionType {
  question: string, // Pour qui est destiné le site?
  answer: string, // Tous les étudiants et personnels de l'institut
}

const useStyles = makeStyles((theme: Theme) => ({

  faqItem: {
    width: '100%',
  },

}));

export default function FAQPage() {
  const classes = useStyles();
  const firebase = React.useContext(FirebaseContext);
  console.log(FIRESTORE_CONSTS.collections.questions)
  const FirestoreCollection = () => {
    const [value, loading, error] = useCollectionData<QuestionType>(
      firebase?.firestore.collection(FIRESTORE_CONSTS.collections.questions).limit(100),
      {
        idField: "id"
      }
    );
    return (
      <div>

        <Container component="main" maxWidth="md" >
          {error && <strong>Erreur: {JSON.stringify(error)}</strong>}
          {loading && <CircularProgress color="secondary" />}
          {value &&
            <>
              {value.map((faq: QuestionType) => (
                <Accordion className={classes.faqItem}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5" >{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))
              }
            </>
          }
        </Container>

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
