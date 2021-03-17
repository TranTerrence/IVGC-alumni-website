import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlumniLogo from '../components/AlumniLogo';
import GlobalAppBar from '../components/GlobalAppBar';
import { Grid } from '@material-ui/core';
import { FirebaseContext } from '../components/Firebase';
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const [imgURL, setImgURL] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      if (firebase) {
        setImgURL(await firebase.getDownloadURL("static/promos.jpg"));
      }
    }
    fetchImage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalAppBar />

      <Container component="main" maxWidth="md">
        <Typography variant="h2" color="secondary">Présentation</Typography>
        <Grid container direction="row">
          <Grid item style={{ flex: 1 }} sm={5}>
            <img src={imgURL} width="100%" alt="Etudiants" />
          </Grid>
          <Grid item sm={7}>
            <Typography >

              L’institut Villebon - Georges Charpak a permis à plus de 150 élèves de s’épanouir à travers les promotions.
              Sur ce site, tu trouveras :
              - un annuaire des anciens élèves pour garder le contact et t’aider à construire ton projet
              professionnel
              - les prochains événements entre élèves et anciens… et d’autres fonctionnalités à découvrir!
              Toutes les contributions de volontaires pour apporter des nouvelles idées dans ce réseau sont les
              bienvenues également, c’est vous qui apportez de la valeur à cette communauté
</Typography>
          </Grid>

        </Grid>

      </Container>
    </>
  );
}