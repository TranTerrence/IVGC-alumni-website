import { Box, Grid, Avatar, Typography, TextField, MenuItem, Select } from "@material-ui/core";
import React, { useContext } from "react";
import { ProfileContext } from "../../../components/Profile/ProfileContext";
import { ButtonPrevious, ButtonNext, ButtonLast } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";
import Slide from '@material-ui/core/Slide';
import Fade from "@material-ui/core/Fade";

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
  const { profile, changeKey } = useContext(ProfileContext);
  return (
    <Fade in={true} timeout={1000} >
      <Box>
        <Grid container direction="row" >
          <Grid item  >
            <Avatar className={classes.avatar} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QCVkDf6qZSjynGijcf47IQHaJg%26pid%3DApi&f=1">G</Avatar>
          </Grid>
          <Grid item container direction="column" >
            <Typography variant="body1" className={classes.speakerName} >Georges</Typography>
            <Typography variant="body2" >De quelle promo es-tu?</Typography>
            <Select
              labelId="promotion"
              id="promotion"
              value={profile.promotion}
              onChange={(e) => {
                changeKey("promotion", e.target.value);
              }}          >
              {getPromoMenuItems()}
            </Select>


            <Grid item>
              <ButtonLast />
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
    promoItems.push(<MenuItem value={year}>{year}</MenuItem>)
  }
  return promoItems;
}