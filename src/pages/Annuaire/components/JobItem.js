import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid, Button, IconButton } from "@material-ui/core";
import clsx from 'clsx';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import firebase from "firebase";
import 'firebase/analytics';

const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(2),
        width: theme.spacing(120),
    },

    autocomplete: {
        marginTop: theme.spacing(2),
    },

    button: {
        marginRight: theme.spacing(0),
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

    typoDepartment:{
        fontSize: 12,
    },
    typoJob: {
        color: theme.palette.secondary.main,
        fontWeight: 700,
    },
}));

const departmentPicMap = {
    "Business": "/departments/man-walk-1.png",
    "Community": "/departments/community.png",
    "IT Corporate": "/departments/IT1.png",
    "Marketing": "/departments/IT-2.png",
    "IS/IT Digital": "/departments/IT-2.png",
    "Industrial Technology & Science": "/departments/Engineering-1.png",
    "Spontaneous Application": "/departments/Engineering-3.png",
};


export default function JobItem({ jobOffer }) {
    console.log("JobOffer", jobOffer)
    const [expanded, setExpanded] = useState(false); //Expand if its last 
    const classes = useStyles();
    const location_arr = jobOffer.postFormations.map(location => {
        let loc_Str = location.city;
        if (location.iso_3166_1_alpha_2_code !== null) {
            loc_Str += ' ';
        }
        return loc_Str;
    });
    const location_str = location_arr.join(', ');
    const analytics = firebase.analytics();
    return (
        <Card spacing={2} className={classes.card}>
            <Grid container spacing={2}
                justify="center"
                alignItems="center">

                <Grid item container md={2} direction="column">
                    
                    <Grid item md={12}>
                        <Typography align='center' className={classes.typoDepartment}  >
                            {"Promotion " + jobOffer.promotion}
                        </Typography>
                        <Typography align='center' className={classes.typoDepartment}  >
                            {"Spécialité " + jobOffer.postFormations[0].speciality}
                        </Typography>
                    </Grid>


                </Grid>
                <Grid item md={3} xs={12}>
                    <Typography color='secondary' className={classes.typoJob} align='center'>
                        {jobOffer.postFormations[0].school}
                    </Typography>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Typography color='textSecondary' align='center'>
                        {jobOffer.locations !== undefined
                            ? location_str
                            : ''}
                    </Typography>
                </Grid>
                <Grid item md={1}>
                    <Typography color='textSecondary'>
                        {jobOffer.lastName + " " + jobOffer.firstName}
                    </Typography>
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
                                        __html: jobOffer.about_position
                                    }}>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography color='textSecondary'>
                        {"Email : " + jobOffer.email}
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                </Collapse>
            </Grid>
        </Card >

    );


}