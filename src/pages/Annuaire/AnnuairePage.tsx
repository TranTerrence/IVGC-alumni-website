import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from '@material-ui/core/Button';
import Banner from "./components/Banner";
import JobItem from './components/JobItem';
import GlobalAppBar from "../../components/GlobalAppBar";


const useStyles = makeStyles(theme => ({

  appBar: {
    position: "relative",
  },
  logo: {
    maxHeight: 42,
  },

  nbResult: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(120)
  },
  layout: {
    width: "auto",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  appBarButton: {
    magin: theme.spacing(2),
  },
  copyright: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  titleBlue: {
    fontSize: 42,
    fontWeight: 700,
    fontFamily: "rocaone",
  },


}));





export default function AnnuairePage() {
  const db = firebase.firestore();

  const classes = useStyles();
  //HOOKS
  const [jobList, setJobList] = useState([]); //Job list to show eventually filtered
  const [nbJobsToShow, setNBJobsToShow] = useState(20);

  const [fullJobList, setFullJobList] = useState([]); // The whole jobList without filtering
  const [isLoading, setIsLoading] = useState(true);

  // This effect runs one time for each session
  useEffect(() => {
    setIsLoading(true);
    async function getJobList() {
      const jobsRef = db.collection('profiles');
      const snapshot = await jobsRef.get();

      let joblist = [];
      snapshot.forEach(doc => {
        let job = doc.data();
        job.id = doc.id;
        joblist.push(job);
      });


      console.log(joblist);
      

    }
    getJobList();
  }, [db]);



  return (
    
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        className={classes.layout}
        spacing={2}
      >
        <Grid item xs={12} justify="center" container alignItems='center' >
          <Banner fullJobList={fullJobList} jobList={jobList} setJobList={setJobList} setIsLoading={setIsLoading} />

        </Grid>
        <Grid item xs={12} justify="center" container alignItems='center' >
          <Typography color='secondary' className={classes.titleBlue}  >
            It's time to join the adventure
                        </Typography>
        </Grid>
        <Grid item xs={12} justify="center" container alignItems='center' >
          <Typography  >
            And to unleash your potential <span role="img" aria-label="Spaceship emoji"> 🚀</span>
          </Typography>
        </Grid>
        <Grid item xs={12} justify="center" container align='right' spacing={4}>
          <Grid item xs={6} align='right' >
            <Link color="secondary" href="https://www.ekkiden.com/about" target="_blank" rel="noopener noreferrer">
              See our values
                            </Link>
          </Grid>
          <Grid item xs={6} align='left' >
            <Link color="secondary" href="https://www.ekkiden.com/career" target="_blank" rel="noopener noreferrer">
              Discover our teams
                            </Link>
          </Grid>
        </Grid>
        {(jobList === undefined || isLoading)
          ? null
          : <Grid item xs={12} justify="center" container alignItems='center' >
            <Typography variant="h5" className={classes.nbResult}   >
              {jobList.length + " jobs for your search"}
            </Typography></Grid>
        }


        {(jobList === undefined || isLoading)
          ? <Grid item xs={12} container justify="center"><CircularProgress color='secondary' /></Grid>
          : jobList.reverse().slice(0, nbJobsToShow).map((job, index) => ( //Reverse to change the order and put the last published on top
            <Grid item xs={12} key={job.id} justify="center" container >
              <JobItem jobOffer={job} />
            </Grid>))
        }
        {(nbJobsToShow < jobList.length)

          ? <Grid item xs={12} container justify="center">
            <Button color='secondary' onClick={() => {
              const NBjobsToLoad = 20;
              if (nbJobsToShow + NBjobsToLoad < jobList.length)
                setNBJobsToShow(nbJobsToShow + 20);
              else setNBJobsToShow(jobList.length);

            }}>Load more</Button>
          </Grid>
          : null
        }

      </Grid>

    </React.Fragment>
  );
}

