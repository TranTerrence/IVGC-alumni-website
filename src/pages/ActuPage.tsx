import React from 'react';
import { makeStyles, fade} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BlogPost from '../components/BlogPost';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Actualités
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <BlogPost image="https://images-na.ssl-images-amazon.com/images/I/41DO0HRpsAL._AC_SY400_.jpg"
          title="default-title" height={400} xs={12} PostContent="Vive react !" PostTitle="Bravo" />
        <BlogPost image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Alca_torda_Caithness%2C_Scotland.jpg/1200px-Alca_torda_Caithness%2C_Scotland.jpg"
          title="default-title" height={"auto"} xs={4} PostContent="Vive react !" PostTitle="Bravo" />
        <BlogPost image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Alca_torda_Caithness%2C_Scotland.jpg/1200px-Alca_torda_Caithness%2C_Scotland.jpg"
          title="default-title" height={"auto"} xs={4} PostContent="Vive react !" PostTitle="Bravo" />
        <BlogPost image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Alca_torda_Caithness%2C_Scotland.jpg/1200px-Alca_torda_Caithness%2C_Scotland.jpg"
          title="default-title" height={"auto"} xs={4} PostContent="Vive react !" PostTitle="Bravo" />
      </Grid>
       </div> 
  );
}
