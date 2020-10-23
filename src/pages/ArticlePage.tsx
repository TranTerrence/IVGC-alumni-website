import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { FirebaseContext } from '../components/Firebase';

const useStyles = makeStyles((theme) => ({
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

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <FirebaseContext.Consumer>
        {firebase => { 
          console.log(firebase?.getArticle())
          return <div> plouf </div>;
        }}
      </FirebaseContext.Consumer>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" color="primary" >
            Les actualités du moment
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>Titre de l'article id 1</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h6">
          
La formation

La formation s’appuie sur une pédagogie active basée sur l’expérimentation dans l’esprit du programme « main à la pâte » initié par Georges Charpak. Elle a été spécialement adaptée pour développer la confiance des étudiants en leurs capacités, leur donner envie d’apprendre et développer leur créativité. Elle est basée sur des projets interdisciplinaires ancrés dans des applications concrètes et laisse une large place à la formation humaine.

L’Institut Villebon – Georges Charpak propose une licence généraliste « Sciences et Technologies ». Cette licence est co-délivrée par l’Université Paris Saclay (Université Paris-Sud, Université Evry Val d’Essonne) et l’Université Paris Descartes, en partenariat avec les écoles d’ingénieurs de ParisTech et l’Ecole Normale Supérieure Paris-Saclay.

Elle s’adresse à des bacheliers issus de filières scientifiques (S) et technologiques (STi2D, STAV, STL) qui peuvent présenter des fragilités scolaires au moment de leur entrée à l’université mais qui sont fortement intéressés par l’étude des sciences et prêts à s’investir pleinement dans leur apprentissage. L’Institut accueille environ 35 étudiants en première année.

Les enseignements couvrent un large éventail de disciplines et permettent à chaque étudiant d’acquérir un socle de savoirs scientifiques (en mathématiques, physique, biologie, chimie, informatique et ingénierie), tout en complétant sa formation en sciences humaines et sociales et en Anglais.

 
L’interdisciplinarité

 

L’interdisciplinarité fait partie de la pédagogie déployée à l’Institut. En 1ère et 2ème année, la plupart des unités d’enseignement (UE) sont interdisciplinaires et organisées autour de grands thèmes transversaux : lumière, codage et traitement de l’information, bioénergétique, vibrations, etc., contrairement à la plupart des formations où les différentes matières (maths, physique, biologie, histoire…) sont enseignées en parallèle.

Cette démarche a plusieurs avantages : elle apprend à travailler ensemble, avec des points de vue et des compétences différents. Par ailleurs, de plus en plus de domaines scientifiques se développent à l’interface entre plusieurs matières. Par exemple, le biomimétisme, qui est à la source de nombreuses technologies innovantes, mêle biologie, physique, électronique, ingénierie… Voir par exemple le site Asknature .

 
Le développement de compétences transversales

 

La licence « Sciences et Technologies » accorde par ailleurs une large place à l’expérimentation et s’appuie sur une pédagogie active où l’apprentissage par projet et les stages jouent un rôle important.

Leur principal objectif est de permettre le développement de compétences transversales qui peuvent constituer des atouts pour la réussite dans le cycle supérieur et à terme pour l’entrée dans le monde professionnel.

La formation « Sciences et Technologies » de l’Institut Villebon – Georges Charpak repose sur un référentiel de trois grandes compétences transversales :

    savoir résoudre un problème par une approche scientifique et technique
    savoir communiquer de manière correcte et appropriée au contexte
    savoir se former et travailler dans le contexte d’un projet scientifique et technique

Le développement de compétences transversales est suivi et évalué par le biais d’e-portfolios individuels.

Les étudiants acquièrent ainsi de solides connaissances scientifiques élémentaires et des compétences transversales qui constituent des atouts pour une intégration réussie dans les cycles supérieurs d’étude et le monde professionnel.

        </Typography>

        <Grid container spacing={3}>
        </Grid>
      </Container>
    </div>
  );
}

export default App;