import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SignInSide from './SignIn';
import { useStyles } from './signStyle'
import SignUpSide from './SignUp';
import ForgotPasswordSide from './ForgotPassword'

function Copyright(props) {
    return (
        <Typography variant="body2" color="textSecondary" align="center" className={props.className}>
            {'Copyright © '}
            <Link color="inherit" href=".">
                BFSV
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function GoBackHome(props) {
    return (
        <Typography variant="body2" color="textSecondary" align="center" className={props.className}>
            <Link color="inherit" href=".">
                Retour accueil
                <ArrowForwardIosIcon />
            </Link>{' '}
        </Typography>
    );
}

function CurrentSide(props) {
    switch (props.side) {
        case 0:
            return <SignInSide />
        case 2:
            return <SignUpSide />
        case 1:
            return <ForgotPasswordSide />
        default:
            return <SignInSide />
    }
}



export default function SignSide(props) {
    const classes = useStyles();



    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                <GoBackHome className={classes.goBackHome} />
                <div className={classes.paper}>

                    <CurrentSide side={props.side} />
                </div>

                <Copyright className={classes.copyright} />
            </Grid>
        </Grid>
    );
}