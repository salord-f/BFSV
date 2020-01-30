import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',

    },
    image: {
        backgroundImage: 'url(https://helpx.adobe.com/content/dam/help/en/audition/how-to/multichannel-audio-workflows/_jcr_content/main-pars/image/multichannel-audio-workflows_900x506.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        height: '80%',
        margin: theme.spacing(0, 4),
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    bottomGrid: {
        justifyContent: 'space-between',
    },
    copyright: {
        margin: theme.spacing(5, 0, 0, 0),

    },
    goBackHome: {
        margin: theme.spacing(2),
        textAlign: 'end',
        position: 'static'

    },
}));