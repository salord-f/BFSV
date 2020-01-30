import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './signStyle';



export default function ForgotPasswordSide(props) {
    const classes = useStyles();

    const [email, setEmail] = useState('');


    return (
        <>
            <Avatar className={classes.avatar} >
                <LockOutlinedIcon />
            </Avatar >
            <Typography component="h1" variant="h5">
                Mot de passe oublié ?
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}

                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                //onClick={onLoginIn}
                >
                    Envoyer un mail de récupération
                </Button>
                <Grid container className={classes.bottomGrid}>
                    <Grid item xs>
                        <Link href="./signIn" variant="body2">
                            Connexion
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="./signUp" variant="body2">
                            Vous n'avez pas de compte ? Créez-en un !
                        </Link>
                    </Grid>
                </Grid>

            </form>
        </>
    );
}