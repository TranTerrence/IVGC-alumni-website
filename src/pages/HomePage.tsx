import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GlobalAppBar from '../components/GlobalAppBar';
import { Grid } from '@material-ui/core';
import { FirebaseContext } from '../components/Firebase';
import { useEffect } from 'react';


export default function HomePage() {
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
        <Grid container direction="row" spacing={2}>
          <Grid item style={{ flex: 1 }} sm={5} >
            <img src={imgURL} width="100%" alt="Etudiants" />
          </Grid>
          <Grid item sm={7}>
            <Typography >
              L’institut Villebon - Georges Charpak a permis à plus de 150 élèves de s’épanouir à travers les promotions.
              Sur ce site, tu trouveras :
            </Typography>
            <Typography>
              <li >
                Un annuaire des anciens élèves pour garder le contact et t’aider à construire ton projet
                professionnel
            </li>
              <li >
                les prochains événements entre élèves et anciens… et d’autres fonctionnalités à découvrir!
                Toutes les contributions de volontaires pour apporter des nouvelles idées dans ce réseau sont les
                bienvenues également, c’est vous qui apportez de la valeur à cette communauté
            </li>
              <li >
                Toutes les contributions de volontaires pour apporter des nouvelles idées dans ce réseau sont les bienvenues également, c’est vous qui apportez de la valeur à cette communauté
            </li>
            </Typography>
          </Grid>

        </Grid>

      </Container>
    </>
  );
}