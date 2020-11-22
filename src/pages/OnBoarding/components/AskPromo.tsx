import { Box, Grid, Avatar, Typography, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { ProfileContext } from "../../../components/Profile/ProfileContext";
import { ButtonPrevious, ButtonNext } from "./OnboardingButtons";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { palette } from "../../../constants/colors";

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
    <Box>
      <Grid container direction="row" >
        <Grid item  >
          <Avatar className={classes.avatar} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QCVkDf6qZSjynGijcf47IQHaJg%26pid%3DApi&f=1">G</Avatar>
        </Grid>
        <Grid item container direction="column" >
          <Typography variant="body1" className={classes.speakerName} >Georges</Typography>
          <Typography variant="body2" >De quelle promo es-tu?</Typography>
          <TextField
            margin="normal"
            fullWidth
            id="promo"
            label="Promotion"
            name="promo"
            variant="outlined"
            autoFocus
            className={classes.textField}
          />

          <Grid item container direction="row" spacing={2}>
            <Grid item>
              <ButtonPrevious />
            </Grid>
            <Grid item>
              <ButtonNext />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}