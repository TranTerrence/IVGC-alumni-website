import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid, IconButton } from "@material-ui/core";
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import 'firebase/analytics';
import { palette } from '../../../constants/colors'
import EducationTimeline from '../../../components/EducationTimeline';
import Divider from '@material-ui/core/Divider';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(2),
        width: theme.spacing(120),
    },

    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    autocomplete: {
        marginTop: theme.spacing(2),
    },

    button: {
        marginRight: theme.spacing(0),
    },
    container: {
        backgroundColor: palette.primary.main,
        borderRadius: "8px"
    },
    dropdown: {
        transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.short
        }),
    },
    dropdownOpen: {
        transform: "rotate(-180deg)"
    },
    dropdownClosed: {
        transform: "rotate(0)"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    typoDepartment: {
        fontSize: 12,
    },
    typoUser: {
        color: theme.palette.secondary.main,
        fontWeight: 700,
    },
    userPic: {
        height: theme.spacing(8),
        width: theme.spacing(8),
      }
}));

export default function UserItem({ User }) {
    console.log("User", User)
    const [expanded, setExpanded] = useState(false); //Expand if its last 
    const classes = useStyles();
    return (
        <Card spacing={2} className={classes.card}>
            <Grid container spacing={2}
                justify="center"
                alignItems="center">
                <Grid item md={1}>
                <Avatar alt={User.basics.firstName} src={User.basics.picture} className={classes.userPic} >{User.basics ? User?.basics?.firstName?.charAt(0) : null}</Avatar>

                </Grid>

                <Grid item md={3}>
                    <Typography color='textSecondary' align="center">
                        {User.basics ? User.basics.firstName + " " + User.basics.lastName : "Inconnu(e)"}
                    </Typography>
                    <Typography align='center' className={classes.typoDepartment}  >
                        {User.basics ? "Promotion " + User.basics.promotion : "Inconnu(e)"}
                    </Typography>
                </Grid>

                <Grid item md={5} xs={12}>
                    {
                        User.educations ? User.educations.length > 0
                            ? User.educations.map(education =>
                                <Typography color='secondary' className={classes.typoUser} align='center'>
                                    {education.institution}
                                </Typography>)
                            : <Typography color='secondary' className={classes.typoUser} align='center'>Non renseigné</Typography> : "Undefined"
                    }
                </Grid>

                <Grid item container md={2} direction="column">
                    <Grid item md={12}>
                        <ul>
                            {User.educations ? User.educations.map(education =>
                                <Typography align='center' className={classes.typoDepartment}  >
                                    {education.area}
                                </Typography>
                            ) : "Undefined"
                            }
                        </ul>
                    </Grid>
                </Grid>

                <Grid item md align='center'>
                    <IconButton onClick={() => setExpanded(!expanded)} className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })} aria-expanded={expanded}
                        aria-label="Show more">
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>

                <Collapse in={expanded}>
                    < Grid item align='center' container spacing={2}>
                        <Grid item xs={12} >
                            <Box marginLeft={4} marginRight={4}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: User.about_position
                                    }}>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Button
                                variant="contained"
                                color="default"
                                startIcon={<ContactMailIcon></ContactMailIcon>}
                                href={User.basics ? "mailto:" + User.basics.email : "Undefined"}
                            >
                                {User.basics ? "Contacter " + User.basics.firstName + " " + User.basics.lastName : "Undefined"}
                            </Button>
                            <Divider style={{ width: '100%' }} />
                            <Grid container direction="column" >
                                {
                                    User.educations ?
                                        <EducationTimeline
                                            educations={User.educations}
                                            size="subtitle2" />
                                        : "Undefined"
                                }
                            </Grid>
                            <IconButton onClick={() => setExpanded(!expanded)} className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })} aria-expanded={expanded}
                                aria-label="Show more">
                                <ExpandMoreIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Card >

    );
}
