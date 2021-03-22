import React from 'react';
import Typography from '@material-ui/core/Typography';

import { CircularProgress, Grid, } from '@material-ui/core';


export default function LoadingPage() {
  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography >Chargement ...</Typography>
        <CircularProgress />
      </Grid>
    </>
  );
}