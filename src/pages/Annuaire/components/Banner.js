import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import ListSubheader from '@material-ui/core/ListSubheader';

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
    const [countrySelected, setCountrySelected] = React.useState([]);
    const [citySelected, setCitySelected] = React.useState([]);

    const [department, setDepartment] = React.useState('');
    const [employmentType, setEmploymentType] = React.useState('');
    const [searchKeywords, setSearchKeywords] = React.useState([]);


    let locationList = fullJobList.flatMap(job => job.postFormations[0].city);
    locationList = locationList.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).sort(); //Filter by unique ids

    let locationMap = groupBy(locationList, 'country');

    let countryList = Object.keys(locationMap).sort();
    countryList = countryList.filter(function (country) {
        return country !== null && country !== 'null';
      });
    console.log('Country', countryList);
    let departmentList = fullJobList.flatMap(job => job.postFormations[0].speciality);
    departmentList = [...new Set(departmentList)].sort();

    let employmentTypeList = fullJobList.flatMap(job => job.postFormations[0].title);
    employmentTypeList = [...new Set(employmentTypeList)].sort();

    // On change on those values, execute filterJob
    useEffect(() => {
        setIsLoading(true);
        filterJobList(); // This is be executed when `loading` state changes
        setIsLoading(false);
    }, [countrySelected, citySelected, department, employmentType, searchKeywords]);

    const selectCountry = function (classes) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="label-countrySelected" className={classes.inputLabel}  >Country</InputLabel>
                <Select
                    labelId="label-countrySelected"
                    id="countrySelected-select"
                    multiple
                    disableUnderline
                    input={<Input id="select-multiple-chip-country" key='select-multiple-chip-country' multiline />}
                    value={countrySelected}
                    onChange={(event) => { setCountrySelected(event.target.value) }}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                >
                    {
                        countryList.map(country =>
                            <MenuItem key={country} value={country}>{country}</MenuItem>)
                    }

                </Select>
                {countrySelected.length > 0
                    ? <Button onClick={() => setCountrySelected([])}>Clear</Button>
                    : null
                }

            </FormControl>
        );
    }



    const selectCity = function (classes) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="label-citySelected" className={classes.inputLabel}  >City</InputLabel>
                <Select
                    labelId="label-citySelected"
                    id="citySelected-select"
                    multiple
                    disableUnderline
                    input={<Input id="select-multiple-chip-city" key='select-multiple-chip-city' multiline />}
                    value={citySelected}
                    onChange={(event) => { setCitySelected(event.target.value) }}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                >

                    {getCityItems()}


                </Select>
                {citySelected.length > 0
                    ? <Button onClick={() => setCitySelected([])}>Clear</Button>
                    : null
                }

            </FormControl>
        );
    }

    const getCityItems = function () {
        let menuList = [];
        const onlyCountries = countrySelected.length > 0
            ? countrySelected
            : countryList;
        onlyCountries.forEach(country => {
            menuList.push(<ListSubheader key={country}>{country}</ListSubheader>);
            let cityList = [];
            locationMap[country].forEach(loc =>
                cityList.push(loc.city)
            );
            cityList = [...new Set(cityList)].sort();
            cityList.forEach(city =>
                menuList.push(<MenuItem key={city + '-' + country} value={city}>{city}</MenuItem>)
            );
        })

        return menuList;
    }

    const selectDepartment = function (classes) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="label-department" className={classes.inputLabel} >Department</InputLabel>
                <Select
                    labelId="label-department"
                    id="department-select"
                    disableUnderline
                    value={department}
                    onChange={event => {
                        setDepartment(event.target.value);
                    }}
                >
                    <MenuItem value={''}>All departments</MenuItem>
                    {departmentList.map(department =>
                        <MenuItem key={department} value={department}>{department}</MenuItem>)
                    }

                </Select>
            </FormControl>
        );
    }

    const selectEmploymentType = function (classes) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="label-employment" className={classes.inputLabel} >Contract</InputLabel>
                <Select
                    labelId="label-employment"
                    id="employment-select"
                    disableUnderline
                    value={employmentType}
                    onChange={event => {
                        setEmploymentType(event.target.value);
                    }}
                >
                    <MenuItem value={''}>All contracts</MenuItem>
                    {employmentTypeList.map(employmentType =>
                        <MenuItem key={employmentType} value={employmentType}>{employmentType}</MenuItem>)
                    }
                </Select>
            </FormControl>
        );
    }



    const searchBar = function (classes) {
        return (
            <Autocomplete
                multiple
                id="search-barr"
                value={searchKeywords}
                filterSelectedOptions={true}
                freeSolo
                options={[]}
                className={classes.searchBar}
                onChange={(event, values) => setSearchKeywords(values)}
                getOptionLabel={option => option}
                renderInput={(params) => (
                    <TextField {...params} label={'Search Keywords'} helperText={"Press enter to add a keywords"} placeholder={"Type here"} />
                )}
            />
        );
    }



    const filterJobList = async function () {
        let filteredJobList = await fullJobList.filter(job => {
            // Locations
            let inCountry = true;
            if (countrySelected.length > 0) {
                inCountry = countrySelected.some(function (country) {
                    return job.locations.some(function (loc) {
                        if (loc.country !== null) {
                            return loc.country.includes(country)
                        }
                        else {
                            return false;
                        }
                    });
                });
            }
            let inCity = true;
            if (citySelected.length > 0) {
                inCity = citySelected.some(function (city) {
                    return job.locations.some(function (loc) {
                        if (loc.city !== null) {
                            return loc.city.includes(city)
                        }
                        else {
                            return false;
                        }
                    });
                });
            }


            return (
                inCountry
                && inCity
                && (department === '' || job.department.includes(department))
                && (employmentType === '' || job.employment_type.includes(employmentType))
            );
        });
        console.log('filtered by ', countrySelected, citySelected, department, employmentType);
        filteredJobList = filterByKeywords(filteredJobList);
        setJobList(filteredJobList);
    }

    const filterByKeywords = (jobListInput) => {
        if (searchKeywords.length === 0) {
            return jobListInput;
        }
        const jobListFiltered = jobListInput.filter((job) => {
            for (var i = 0; i < searchKeywords.length; i++) {
                const word = searchKeywords[i];
                if (!job.about_position.toLowerCase().includes(word.toLowerCase())
                && !job.name.toLowerCase().includes(word.toLowerCase())) {
                    return false;
                }
            }
            return true;
        });
        return (jobListFiltered);

    }


    return (

        <Paper className={classes.centerRow} elevation={3}>
            <Grid container spacing={2} >
                <Grid item xs={6} md={2}>
                    {selectCountry(classes)}
                </Grid>
                <Grid item xs={6} md={2}>
                    {selectCity(classes)}
                </Grid>
                <Grid item xs={6} md={2}>
                    {selectDepartment(classes)}
                </Grid>
                <Grid item xs={6} md={2}>
                    {selectEmploymentType(classes)}
                </Grid>
                <Grid item container xs={12} md={4} spacing={2} >
                    <Grid item xs={8}>
                        {searchBar(classes)}

                    </Grid>
                    <Grid item xs={4}>
                        <Typography color='secondary' className={classes.resultTypo} align='center'>{jobList.length.toString() + " results "}</Typography>

                    </Grid>
                </Grid>

            </Grid>


        </Paper>


    );


}