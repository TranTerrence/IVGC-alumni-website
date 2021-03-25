import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid, IconButton } from "@material-ui/core";
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import 'firebase/analytics';
import { palette } from '../../../constants/colors'
import Divider from '@material-ui/core/Divider';

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

                <Grid item md={3}>
                    <Typography color='textSecondary' align="center">
                        {User.basics.firstName + " " + User.basics.lastName}
                    </Typography>
                    <Typography align='center' className={classes.typoDepartment}  >
                        {"Promotion " + User.basics.promotion}
                    </Typography>
                </Grid>

                <Grid item md={6} xs={12}>
                    {
                        User.educations.length > 0
                            ? User.educations.map(education =>
                                <Typography color='secondary' className={classes.typoUser} align='center'>
                                    {education.institution}
                                </Typography>)
                            : <Typography color='secondary' className={classes.typoUser} align='center'>Non renseigné</Typography>
                    }
                </Grid>

                <Grid item container md={2} direction="column">
                    <Grid item md={12}>
                        <ul>
                            {User.educations.map(education =>
                                <Typography align='center' className={classes.typoDepartment}  >
                                    {education.area}
                                </Typography>
                            )
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
                        <Grid item xs={12}>
                            <Typography color='#fff'>
                                {User.basics.email}
                            </Typography>
                            <Grid container direction="column" >
                                {
                                    User.educations.map(education =>
                                        <>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {education.institution}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {education.area}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {education.location.city}
                                                </Typography>
                                                <Typography variant="subtitle1">{education.startDate.toDate().getFullYear()}</Typography>
                                            </Grid>
                                            <Divider className={classes.divider} variant="middle" />
                                        </>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Card >

    );


}