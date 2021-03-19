
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, makeStyles, Theme } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) => ({
  titleContainer: {
    padding: theme.spacing(2),
    backgroundColor: 'white',

  },
  title: {
    marginLeft: theme.spacing(2),
    fontWeight: "bold"
  }
}));

export default function TitlePage({ title }: { title: String }) {

  const classes = useStyles();
  return (
    <div className={classes.titleContainer} >
      <Typography variant="h6" color="primary" className={classes.title}  >
        {title}
      </Typography>
    </div>
  );
}