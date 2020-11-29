import { Box, Grid, InputAdornment, TextField, Typography, } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { initPostFormation, PostFormation, } from "../../../components/Profile/PostFormation";
import { ButtonNext, ButtonNextPF } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import { MASCOT_NAME } from "../../../constants/names";
import Fade from "@material-ui/core/Fade";
import { FirebaseContext } from "../../../components/Firebase";
import { MascotAvatar } from "../../../components/MascotAvatar";
import AddIcon from '@material-ui/icons/Add';
import { PostFormationForm } from "../../../components/PostFormationForm";

import Button from "@material-ui/core/Button/Button";
const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: palette.primary.main,
      },
    },
  },
  speakerName: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  }
}));


export const AskPostFormations = () => {
  const classes = useStyles();
  const [postFormations, setPostFormations]: [PostFormation[], Function] = useState([initPostFormation]);
  const firebase = useContext(FirebaseContext);

  // Sync the data with the context
  useEffect(() => {
    const fetchPFs = async () => {
      if (firebase) {
        const postFormations_arr = await firebase.getPostFormations();
        if (postFormations_arr !== null) {
          setPostFormations(postFormations_arr);
        }
      } else
        console.log("No firebase");
    }
    fetchPFs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePostFormation = (index: number, key: keyof PostFormation, newValue: any) => {
    let postFormationsCopy = [...postFormations];
    postFormationsCopy[index][key] = newValue;
    setPostFormations(postFormationsCopy);
    console.log(postFormations);
  };


  const addPostFormation = () => {
    setPostFormations([
      ...postFormations,
      initPostFormation,
    ])
  };

  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row" >
          <Grid item >
            <MascotAvatar />
          </Grid>
          <Grid item container direction="column" xs >
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >Qu'as-tu fais après l'institut ?</Typography>
            {
              postFormations.map((postFormation, index) =>
                <PostFormationForm key={index} postFormation={postFormation} updatePostFormation={updatePostFormation} index={index} />
              )
            }
            <Grid item container justify="center" >
              <Button onClick={addPostFormation} color="primary" variant="outlined"
                startIcon={<AddIcon />}>AJouter une formation</Button>
            </Grid>



            <Grid item>
              <ButtonNextPF postFormations={postFormations} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
