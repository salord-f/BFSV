import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import apis from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import REDUX_KEY from '../../../redux/ReduxKeys';


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const dispatch = useDispatch();
    const loginReducer = useSelector(state => state.tokenReducer);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const payMyCart = () => {
        if (loginReducer.user === undefined)
            window.alert("Erreur veuillez-vous reconnecter");
        else {
            apis.payMyCart(loginReducer.user._id);
            dispatch({ type: REDUX_KEY.REMOVE_ALL_ITEMS });
            handleNext();
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (

        <React.Fragment>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                        Merci pour votre commande
                </Typography>
                    <Typography variant="subtitle1">
                        Votre numero de commande est le : #2001539. Vous allez recevoir un mail de confirmation avec la facture de celle-ci.
                </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.onClose}
                            className={classes.button}
                        >
                            Finir
                    </Button>
                    </div>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} className={classes.button}>
                                    Retour
                    </Button>
                            )}
                            {activeStep === steps.length - 1 ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={payMyCart}
                                    className={classes.button}
                                >
                                    Valider votre commande
                            </Button> :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Suivant
                            </Button>
                            }

                        </div>
                    </React.Fragment>
                )}
        </React.Fragment>
    );
}