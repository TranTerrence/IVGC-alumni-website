import { makeStyles, Theme } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar/Avatar";
import React from "react";

export const MascotAvatar = ({ width = 48, height = 48 }: { width?: number | string, height?: number | string }) => {

  const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
      marginRight: theme.spacing(1),
      width: width,
      height: height,
    }
  }));
  const classes = useStyles();

  return (
    <Avatar className={classes.avatar}
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QCVkDf6qZSjynGijcf47IQHaJg%26pid%3DApi&f=1">G</Avatar>
  );
}