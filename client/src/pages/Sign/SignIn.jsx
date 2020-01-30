import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './signStyle';



export default function SignInSide(props) {
    const style = useStyles();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');


    const onLoginIn = () => {


    }

    return (
        <>
            <Avatar className={style.avatar} >
                <LockOutlinedIcon />
            </Avatar >
            <Typography component="h1" variant="h5">
                Connexion
            </Typography>
            <form className={style.form} noValidate>
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button

                    className={style.submit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onLoginIn}
                >
                    Se connecter
                </Button>
                <Grid container className={style.bottomGrid}>
                    <Grid item>
                        <Link href="./forgotPassword" variant="body2">
                            Mot de passe oublié ?
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