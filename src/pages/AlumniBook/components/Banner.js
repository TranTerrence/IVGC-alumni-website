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
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: '40px',
        width: theme.spacing(120),
    },
    inputLabel: {
        color: theme.palette.secondary,
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
        color: theme.palette.primary
    }
}));


export default function Banner({ fullUserList, userList, setUserList, setIsLoading }) {

    const classes = useStyles();
    const [citySelected, setCitySelected] = React.useState('');

    const [department, setDepartment] = React.useState('');
    const [promo, setPromo] = React.useState('');
    const [field, setField] = React.useState("");

    let locationList = fullUserList.flatMap(user => user.educations.flatMap(education => education.location ? education.location.city : null));
    locationList = [...new Set(locationList)].sort();

    let departmentList = fullUserList.flatMap(user => user.educations.flatMap(education => education.institution ? education.institution : null));
    departmentList = [...new Set(departmentList)].sort();

    let promoList = fullUserList.flatMap(user => user.basics.promotion ? user.basics.promotion : []);
    promoList = [...new Set(promoList)].sort();

    let fieldList = fullUserList.flatMap(user => user.educations.flatMap(education => education.area ? education.area : null));
    fieldList = [...new Set(fieldList)].sort();

    console.log("fieldlist", fieldList)

    useEffect(() => {
        setIsLoading(true);
        filterUserList(); // This is be executed when `loading` state changes
        setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [promo, citySelected, department, field]);

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
                <InputLabel id="label-city" className={classes.inputLabel}>Ville</InputLabel>
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

    const selectField = function (classes) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="label-field" className={classes.inputLabel} >Domaine</InputLabel>
                <Select
                    labelId="label-field"
                    id="field-select"
                    disableUnderline
                    value={field}
                    onChange={event => {
                        setField(event.target.value);
                    }}
                >
                    <MenuItem value={''}>Tout les domaines</MenuItem>
                    {fieldList.map(field =>
                        <MenuItem key={field} value={field}>{field}</MenuItem>)
                    }
                </Select>
            </FormControl>
        );
    }

    const checkCityInside = function (user) {

        for (const elem of user.educations) {
            if (elem.location && elem.location.city.includes(citySelected)) {
                return true
            }
        }
        return false
    }

    const checkSchoolInside = function (user) {

        for (const elem of user.educations) {
            if (elem.institution.includes(department)) {
                return true
            }
        }
        return false
    }

    const checkFieldInside = function (user) {

        for (const elem of user.educations) {
            if (elem.area.includes(field)) {
                return true
            }
        }
        return false
    }

    const filterUserList = async function () {
        let filteredUserList = await fullUserList.filter(user => {
            return (
                (citySelected === '' || checkCityInside(user))
                && (department === '' || checkSchoolInside(user))
                && (field === '' || checkFieldInside(user))
                && (promo === '' || user.basics.promotion === promo)
            );
        });
        console.log('filtered by ', promo, citySelected, department);
        setUserList(filteredUserList);
    }


    return (
        <Paper className={classes.centerRow} elevation={3}>
            <Grid container spacing={2} >
                <Grid item xs={6} md={3}>
                    {selectPromo(classes)}
                </Grid>
                <Grid item xs={6} md={3}>
                    {selectCity(classes)}
                </Grid>
                <Grid item xs={6} md={3}>
                    {selectDepartment(classes)}
                </Grid>
                <Grid item xs={6} md={3}>
                    {selectField(classes)}
                </Grid>
                <Grid item md={3}>
                    <Typography className={classes.resultTypo} align='center'>{userList.length.toString() + " resultats "}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );


}