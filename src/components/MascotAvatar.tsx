import { makeStyles, Theme, withStyles, createStyles } from "@material-ui/core/styles";
import Avatar, { AvatarProps } from "@material-ui/core/Avatar/Avatar";
import React from "react";
import { StyledBadge } from "./StyledBadge";

export const MascotAvatar: React.FunctionComponent<AvatarProps> = (props) => {

  return (
    <StyledBadge
      overlap="circle"
      className={props.className}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
    >
      <Avatar {...props}
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QCVkDf6qZSjynGijcf47IQHaJg%26pid%3DApi&f=1">G</Avatar>
    </StyledBadge>
  );
}