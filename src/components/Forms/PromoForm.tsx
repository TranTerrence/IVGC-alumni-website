import { Grid, makeStyles, MenuItem, Select, Theme, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { ProfileContext } from "../Profile/ProfileContext";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    minWidth: theme.spacing(16),
  }
}));


export default function PromoForm() {
  const { basics, changeBasics } = useContext(ProfileContext);
  const getPromoMenuItems = () => {
    const promoItems = [];
    const thisYear = new Date().getFullYear();

    for (let year = 2016; year < thisYear + 3; year++) {
      promoItems.push(<MenuItem value={year} key={year}>{year}</MenuItem>)
    }
    return promoItems;
  }

  return (
    <Grid container direction="row" spacing={2} alignItems="center">
      <Grid item>
        <Typography>Promotion</Typography>
      </Grid>
      <Grid item>
        <Select
          labelId="promotion"
          id="promotion"
          value={basics.promotion}
          onChange={(e) => {
            changeBasics("promotion", e.target.value);
          }}          >
          {getPromoMenuItems()}
        </Select>
      </Grid>
    </Grid>
  )
}
