import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './signStyle';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import api from './../../api'
import REDUX_KEY from '../../redux/ReduxKeys';
import jwt from 'jsonwebtoken'

const validateEmail = (email) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}

export default function SignInSide(props) {
    const style = useStyles();

    const history = useHistory();

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const [errorMail, setErrorMail] = useState(false);
    const [errorMailText, setErrorMailText] = useState("");

    const [password, setPassword] = useState('');

    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordText, setErrorPasswordText] = useState("");

    const onLoginIn = async () => {
        if (email === "" || !validateEmail(email)) {
            setErrorMail(true);
            setErrorMailText("Veuillez entrer une adresse valide");
            return;
        } else {
            setErrorMail(false);
            setErrorMailText("");
        }
        if (password === "") {
            setErrorPassword(true);
            setErrorPasswordText("Veuillez entrer un mot de passe");
            return;
        } else {
            setErrorPassword(false);
            setErrorPasswordText("");
        }
        let payload = {
            mail: email,
            password: password
        };

        console.log(JSON.stringify(payload));
        await api.connectToAccount(payload).then(res => {
            console.log(JSON.stringify(res));
            const decodedToken = jwt.verify(res.data, 'BaPtIsTeLeGaY');
            decodedToken.user.token = res.data;
            let update = {
                type: REDUX_KEY.LOGIN,
                value: decodedToken.user
            };
            dispatch(update);
            history.push("/");

        }).catch((err) => {
            setErrorPassword(true);
            setErrorPasswordText("Mot de passe ou adresse invalide");

        })


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
                    error={errorMail}
                    helperText={errorMailText}

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
                    error={errorPassword}
                    helperText={errorPasswordText}
                    onKeyPress={(event) => { event.key === 'Enter' ? onLoginIn() : event.stopPropagation() }}
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
