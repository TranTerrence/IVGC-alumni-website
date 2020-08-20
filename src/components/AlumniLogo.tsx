import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';


export default function AlumniLogo({ width = "auto", height = "auto" }: { width: number | string, height: number | string }) {

    return <Container style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
    }}><img src={process.env.PUBLIC_URL + "/img/logo-villebon.png"} alt="logo villebon"
        width={width}
        height={height} />

        <Typography component="h1" variant="h5" color="secondary">
            Alumni
        </Typography>
    </Container>
}