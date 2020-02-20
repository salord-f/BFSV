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
import api from './../../api'



export default function SignUpSide(props) {
    const classes = useStyles();

    const history = useHistory();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMail, setErrorMail] = useState(false);
    const [errorMailText, setErrorMailText] = useState("");



    const createAnAccount = async () => {
        if (password !== confirmPassword) {
            window.alert("PASSWORD NOT THE SAME")
        } else {

            let payload = {
                mail: email,
                password: password
            };

            setErrorMail(false);
            setErrorMailText("");

            console.log(JSON.stringify(payload));
            await api.createAnAccount(payload).then(res => {
                //window.alert(`TRY TO CREATE ` + JSON.stringify(res));
                history.push("/signIn");
            }).catch((err) => {
                setErrorMail(true);
                setErrorMailText("Cette adresse est deja relié à un compte");
            }
            )
        }

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
                    error={errorMail}
                    helperText={errorMailText}

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