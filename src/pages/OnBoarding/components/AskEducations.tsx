import { Box, Grid, Typography, } from "@material-ui/core";
import React, { useContext } from "react";
import { ButtonLast } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import { MASCOT_NAME } from "../../../constants/names";
import Fade from "@material-ui/core/Fade";
import { MascotAvatar } from "../../../components/MascotAvatar";
import AddIcon from '@material-ui/icons/Add';


import Button from "@material-ui/core/Button/Button";
import { EducationType, initEducation, ProfileContext } from "../../../components/Profile/ProfileContext";
import { EducationForms } from "../../../components/Forms/EducationForms";
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

export interface updateEducationProps {
  index: number, key: keyof EducationType, newValue: any
}

export const AskEducations = () => {
  const classes = useStyles();
  //const [educations, setEducationTypes]: [EducationType[], Function] = useState([initEducationType]);
  const { educations, setEducations } = useContext(ProfileContext);

  if (!educations) {
    const initCPFcopy = { ...initEducation };
    setEducations([initCPFcopy]);
  }

  const updateEducation = (index: number, key: keyof EducationType, newValue: any) => {
    let educationsCopy = [...educations];
    educationsCopy[index][key] = newValue;
    setEducations(educationsCopy);
  };

  const removeEducation = (index: number) => {
    let educationsCopy = [...educations];
    educationsCopy.splice(index, 1);
    console.log("REMOVE PF");
    setEducations(educationsCopy);
  };


  const addEducation = () => {
    const initCPFcopy = { ...initEducation };
    setEducations([
      ...educations,
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
            <EducationForms/>
            <Grid item>
              <ButtonLast />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}
