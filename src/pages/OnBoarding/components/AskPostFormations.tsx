import { Box, Grid, Typography, } from "@material-ui/core";
import React, { useContext } from "react";
import { initPostFormation, PostFormation, } from "../../../components/Profile/PostFormation";
import { ButtonLast } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import { MASCOT_NAME } from "../../../constants/names";
import Fade from "@material-ui/core/Fade";
import { MascotAvatar } from "../../../components/MascotAvatar";
import AddIcon from '@material-ui/icons/Add';
import { PostFormationForm } from "../../../components/PostFormationForm";

import Button from "@material-ui/core/Button/Button";
import { Profile, ProfileContext } from "../../../components/Profile/ProfileContext";
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
  //const [postFormations, setPostFormations]: [PostFormation[], Function] = useState([initPostFormation]);
  const { profile, changeKey }: { profile: Profile, changeKey: Function } = useContext(ProfileContext);

  if (!profile.postFormations) {
    const initCPFcopy = { ...initPostFormation };
    changeKey("postFormations", [initCPFcopy]);
  }


  const updatePostFormation = (index: number, key: keyof PostFormation, newValue: any) => {
    let postFormationsCopy = [...profile.postFormations];
    postFormationsCopy[index][key] = newValue;
    changeKey("postFormations", postFormationsCopy);
  };

  const removePostFormation = (index: number) => {
    let postFormationsCopy = [...profile.postFormations];
    postFormationsCopy.splice(index, 1);
    console.log("REMOVE PF");
    changeKey("postFormations", postFormationsCopy);
  };


  const addPostFormation = () => {
    const initCPFcopy = { ...initPostFormation };
    changeKey("postFormations", [
      ...profile.postFormations,
      initCPFcopy,
    ]);
  };

  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row" >
          <Grid item >
            <MascotAvatar className={classes.avatar} />
          </Grid>
          <Grid item container direction="column" xs >
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >Qu'as-tu fais après l'institut ?</Typography>
            {
              profile.postFormations && profile.postFormations.map((postFormation, index) =>
                <PostFormationForm key={index} postFormation={postFormation} updatePostFormation={updatePostFormation} removePostFormation={removePostFormation} index={index} />
              )
            }
            <Grid item container justify="center" >
              <Button onClick={addPostFormation} color="primary" variant="outlined"
                startIcon={<AddIcon />}>Ajouter une formation</Button>
            </Grid>
            <Grid item>
              <ButtonLast />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
