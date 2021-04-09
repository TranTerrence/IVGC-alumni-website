import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button, Container } from '@material-ui/core';
import { useHistory } from 'react-router';
import * as ROUTES from '../constants/routes';


export default function AlumniLogo({ width = "auto", height = "auto" }: { width: number | string, height: number | string }) {
    const history = useHistory();
    return (
        <Container style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column'
        }}>
            <Button onClick={() => history.push(ROUTES.HOME)}>
                <img src={process.env.PUBLIC_URL + "/img/logo-villebon.png"} alt="logo villebon"
                    width={width}
                    height={height} />
            </Button>
            <Typography component="h1" variant="h5" color="secondary">
                Alumni
            </Typography>
        </Container>)
}