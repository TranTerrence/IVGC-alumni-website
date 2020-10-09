
import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function AlumniLogo({ image = "auto", title = "default-title",
  height = 10, PostContent = "default-content", PostTitle = "default-post-title", xs = 4 }: {
    image: string, title: string, height: number | string, PostContent: string, PostTitle: string, xs: any
  }) {
  const classes = useStyles();
  return(
  <Grid item xs={xs}>
    <Paper className={classes.paper}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.img}
              component="img"
              alt={title}
              height={height}
              image={image}
              title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {PostTitle}
                    </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {PostContent}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Paper>
  </Grid>)
};