import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { EducationType, ProfileContext } from '../../components/Profile/ProfileContext';
import { Field } from '../../components/Firebase/ConstantContext';
import Chip from '@material-ui/core/Chip';
import { FirebaseContext } from '../../components/Firebase';
import { Paper } from '@material-ui/core';
import GlobalAppBar from '../../components/GlobalAppBar';
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@material-ui/lab';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  oppositeContent: {
    flex: 0,
  }
}));



export default function ProfilePage() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const { basics, educations, setProfile } = useContext(ProfileContext);

  // Sync the data with the context
  // TODO: Optimization fetch only if context is empty
  useEffect(() => {
    const fetchProfile = async () => {
      if (firebase) {
        const currentProfile = await firebase.getCurrentProfile();
        if (currentProfile !== null) {
          setProfile(currentProfile);
        }
      } else
        console.log("No firebase");
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalAppBar />

      <Container component="main" maxWidth="md" >
        <Paper className={classes.paper}>
          <Typography variant="h4">{basics?.firstName + " " + basics?.lastName + " - Promotion " + basics?.promotion}
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h4">{"Formation"}</Typography>
          <Timeline align="left" >
            {educations && educations.map(education =>
              <EducationTimelineItem education={education} />
            )}
          </Timeline>


        </Paper>
      </Container>
    </>
  );
}


export const EducationTimelineItem = ({ education }: { education: EducationType }) => {
  const classes = useStyles();
  return (
    <TimelineItem>
      <TimelineOppositeContent className={classes.oppositeContent}>
        <Typography align="center" variant="body2" color="textSecondary">
          {education?.endDate?.toDate().getFullYear() + " - " + education?.startDate?.toDate().getFullYear()}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="h5">{education.institution + " | " + education.studyType}</Typography>
        {education.fields && education.fields.map((item: Field) =>
          <Chip label={item.field} />
        )}
        <Typography>{education.area}</Typography>
      </TimelineContent>
    </TimelineItem>
  )
}
