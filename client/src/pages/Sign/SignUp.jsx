import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './signStyle';



export default function SignUpSide(props) {
    const classes = useStyles();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');


    const createAnAccount = () => {


    }

    return (
        <>
            <Avatar className={classes.avatar} >
                <LockOutlinedIcon />
            </Avatar >
            <Typography component="h1" variant="h5">
                Créer un compte
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresse email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}

                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label=" Confirmer votre mot de passe"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => createAnAccount()}
                >
                    Créer un compte
                </Button>
                <Grid container className={classes.bottomGrid}>
                    <Grid item>
                        <Link href="./signIn" variant="body2">
                            Se connecter
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="./forgotPassword" variant="body2">
                            Mot de passe oublié ?
                        </Link>
                    </Grid>
                </Grid>

            </form>
        </>
    );
}