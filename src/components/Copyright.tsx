import React from 'react';
import Typography from '@material-ui/core/Typography';


export default function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © Association Alumni IVGC '}
   
    {new Date().getFullYear()}
    {'.'}
  </Typography>
  );
}