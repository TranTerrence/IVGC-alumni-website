
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: theme.spacing(4),

    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Copyright />
        </footer>
    );
}