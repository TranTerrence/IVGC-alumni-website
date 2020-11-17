
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Copyright from './Copyright';

const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        marginTop: theme.spacing(4),

    },
}));
/**
 * Footer used in the whole app
 */
export default function StickyFooter() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Copyright />
        </footer>
    );
}