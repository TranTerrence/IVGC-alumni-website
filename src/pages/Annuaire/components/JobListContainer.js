import React, { useState } from "react";
import JobItem from './JobItem';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function JobListContainer({ jobList }) {


    const [nbJobsToShow, setNBJobsToShow] = useState(20);


    return (
        <>
            {jobList.reverse().slice(0, nbJobsToShow).map((job) => { //Reverse to change the order and put the last published on top
                return <Grid item xs={12} key={job.id + '-grid'} justify="center" container >
                    <JobItem jobOffer={job} />

                </Grid>
            })
            }
            <Grid item xs={12} container justify="center">
                {(nbJobsToShow < jobList.length)
                    ?
                    <Button color='secondary' onClick={() => {
                        const NBjobsToLoad = 20;
                        if (nbJobsToShow + NBjobsToLoad < jobList.length)
                            setNBJobsToShow(nbJobsToShow + 20);
                        else setNBJobsToShow(jobList.length);

                    }}>Load more</Button>

                    : null
                }
            </Grid>
        </>

    );

}
