import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Banner from "./components/Banner";
import JobItem from './components/JobItem';
import GlobalAppBar from '../../components/GlobalAppBar';


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
      setJobList(joblist);
      setFullJobList(joblist);
      setIsLoading(false);
    }
    getJobList();
    console.log("Job list", jobList)
  }, [db]);



  return (
    
    <React.Fragment>
      <GlobalAppBar />
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
        
        {(jobList === undefined || isLoading)
          ? null
          : <Grid item xs={12} justify="center" container alignItems='center' >
            <Typography variant="h5" className={classes.nbResult}   >
              {jobList.length + " jobs for your search"}
            </Typography></Grid>
        }

        
        {(jobList === undefined || isLoading)
          ? <Grid item xs={12} container justify="center"><CircularProgress color='secondary' /></Grid>
          : jobList.reverse().slice(0, nbJobsToShow).map((job) => ( //Reverse to change the order and put the last published on top
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

