import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

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
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function AlumniLogo({ image = "auto", title = "default-title", avatar = "auto",
    PostContent = "default-content", PostTitle = "default-post-title", xs = 4, author = "default-author", id = "default-id"}: {
    image: string, title: string, avatar: string, PostContent: string,
    PostTitle: string, xs: any, author: string, id: string
  }) {
  const classes = useStyles();
  return(
    <Grid item xs={xs} sm={6} md={4}>
    <Card className={classes.card}>
        <CardActionArea href={"article?id=" + id}>
        <CardMedia
          className={classes.media}
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
      <CardActions className={classes.cardActions}>
        <Box className={classes.author}>
          <Avatar src={avatar} />
          <Box ml={2}>
            <Typography variant="subtitle2" component="p">
              {author}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              May 14, 2020
            </Typography>
          </Box>
        </Box>
          <IconButton aria-label="share" href={"share?id=" + id}>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="show more" href={"article?id=" + id}>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  </Grid>)
};