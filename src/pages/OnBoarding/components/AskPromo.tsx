import { Box, Grid, Typography, MenuItem, Select } from "@material-ui/core";
import React, { useContext } from "react";
import { ProfileContext } from "../../../components/Profile/ProfileContext";
import { ButtonLast, ButtonNext } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import Fade from "@material-ui/core/Fade";
import { MascotAvatar } from "../../../components/MascotAvatar";
import { MASCOT_NAME } from "../../../constants/names";

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


export const AskPromo = () => {
  const classes = useStyles();
  const { basics, changeBasics } = useContext(ProfileContext);
  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row" >
          <Grid item >
            <MascotAvatar className={classes.avatar} />
          </Grid>
          <Grid item container direction="column" xs>
            <Typography variant="body1" className={classes.speakerName} >{MASCOT_NAME}</Typography>
            <Typography variant="body2" >De quelle promotion es-tu?</Typography>
            <Select
              labelId="promotion"
              id="promotion"
              value={basics.promotion}
              onChange={(e) => {
                changeBasics("promotion", e.target.value);
              }}          >
              {getPromoMenuItems()}
            </Select>


            <Grid item>
              <ButtonNext />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}


const getPromoMenuItems = () => {
  const promoItems = [];
  const thisYear = new Date().getFullYear();

  for (let year = 2016; year < thisYear + 3; year++) {
    promoItems.push(<MenuItem value={year} key={year}>{year}</MenuItem>)
  }
  return promoItems;
}