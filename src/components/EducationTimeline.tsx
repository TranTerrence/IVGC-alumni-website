
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@material-ui/lab';
import Chip from '@material-ui/core/Chip';
import { EducationType } from './Profile/ProfileContext';
import { Field } from './Firebase/ConstantContext';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  oppositeContent: {
    flex: 0,
  }
}));

type typographyVariant = "inherit" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "srOnly" | undefined;


export default function EducationTimeLine({ educations, size = 'h5' }: { educations: Array<EducationType>, size?: typographyVariant }) {
  return (<Timeline align="left" >
    {educations && educations.map(education =>
      <EducationTimelineItem education={education} size={size} />
    )}
  </Timeline>)
};

function EducationTimelineItem({ education, size = 'h5' }: { education: EducationType, size?: typographyVariant }) {
  const classes = useStyles();
  return (
    <TimelineItem>
      <TimelineOppositeContent className={classes.oppositeContent}>
        <Typography align="center" variant="body2" color="textSecondary" >
          {education?.endDate?.toDate().getFullYear() + " - " + education?.startDate?.toDate().getFullYear()}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant={size}>{education.institution.name + " | " + education.studyType}</Typography>
        {education.fields && education.fields.map((item: Field) =>
          <Chip label={item.field} />
        )}
        <Typography>{education.area}</Typography>
      </TimelineContent>
    </TimelineItem>
  )
};