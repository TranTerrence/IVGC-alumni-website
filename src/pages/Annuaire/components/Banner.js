import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";



const useStyles = makeStyles(theme => ({

    centerRow: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

        borderRadius: '24px',
        backgroundColor: theme.palette.primary.main,
    },
    searchBar: {
        width: '100%',
        margin: theme.spacing(2),
    },

    buttonSearch: {
        margin: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        minWidth: '300px',

    },

    inputLabel: {
        color: theme.palette.secondary.main,
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: '100px',
        width: '95%',

    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },

   
    resultTypo: {
        margin: theme.spacing(1),
        paddingTop: theme.spacing(2),
    }


}));

const groupBy = function (objectArray, property) {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
    }, {});
}
/**
 * Handle all the filters and update the jobList accordingly
 * 
 */
export default function Banner({ fullJobList, jobList, setJobList, setIsLoading }) {

    const classes = useStyles();
    const [citySelected, setCitySelected] = React.useState([]);

    const [department, setDepartment] = React.useState('');
    const [promo, setPromo] = React.useState('');

    let locationList = fullJobList.flatMap(job => job.educations[0].location.city);
    locationList = [...new Set(locationList)].sort();

    let departmentList = fullJobList.flatMap(job => job.educations[0].institution);
    departmentList = [...new Set(departmentList)].sort();

    let promoList = fullJobList.flatMap(job => job.basics.promotion);
    promoList = [...new Set(promoList)].sort();

    console.log("promo list", promoList)
    console.log("FJ list", fullJobList)

    // On change on those values, execute filterJob
    useEffect(() => {
        setIsLoading(true);
        filterJobList(); // This is be executed when `loading` state changes
        setIsLoading(false);
    }, [promo,  citySelected, department]);

    const selectPromo = function (classes) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="label-promo" className={classes.inputLabel} >Promo</InputLabel>
                <Select
                    labelId="label-promo"
                    id="promo-select"
                    disableUnderline
                    value={promo}
                    onChange={event => {
                        setPromo(event.target.value);
                    }}
                >
                    <MenuItem value={''}>Toutes les promos</MenuItem>
                    {promoList.map(promo =>
                        <MenuItem key={promo} value={promo}>{promo}</MenuItem>)
                    }

                </Select>
            </FormControl>
        );
    }

    const selectCity = function (classes) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="label-city" className={classes.inputLabel} >Ville</InputLabel>
                <Select
                    labelId="label-city"
                    id="city-select"
                    disableUnderline
                    value={citySelected}
                    onChange={event => {
                        setCitySelected(event.target.value);
                    }}
                >
                    <MenuItem value={''}>Toutes les villes</MenuItem>
                    {locationList.map(city =>
                        <MenuItem key={city} value={city}>{city}</MenuItem>)
                    }

                </Select>
            </FormControl>
        );
    }

    const selectDepartment = function (classes) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="label-department" className={classes.inputLabel} >Ecole</InputLabel>
                <Select
                    labelId="label-department"
                    id="department-select"
                    disableUnderline
                    value={department}
                    onChange={event => {
                        setDepartment(event.target.value);
                    }}
                >
                    <MenuItem value={''}>Toutes les écoles</MenuItem>
                    {departmentList.map(department =>
                        <MenuItem key={department} value={department}>{department}</MenuItem>)
                    }

                </Select>
            </FormControl>
        );
    }

    const filterJobList = async function () {
        let filteredJobList = await fullJobList.filter(job => {
            console.log("JOB : ", job)
            return (
                (citySelected === '' || job.educations[0].location.city.includes(citySelected))
                && (department === '' || job.educations[0].institution.includes(department))
                && (promo === '' || job.basics.promotion == promo)
            );
        });
        console.log('filtered by ', promo, citySelected, department);
        setJobList(filteredJobList);
    }

    return (

        <Paper className={classes.centerRow} elevation={3}>
            <Grid container spacing={2} >
                <Grid item xs={6} md={2}>
                    {selectPromo(classes)}
                </Grid>
                <Grid item xs={6} md={2}>
                    {selectCity(classes)}
                </Grid>
                <Grid item xs={6} md={2}>
                    {selectDepartment(classes)}
                </Grid>
                <Grid item container xs={12} md={4} spacing={2} >
                    <Grid item md={2}>
                        <Typography color='secondary' className={classes.resultTypo} align='center'>{jobList.length.toString() + " results "}</Typography>
                    </Grid>
                </Grid>

            </Grid>


        </Paper>


    );


}