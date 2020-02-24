import React, {useEffect} from 'react';
import {createStyles, fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Logo from './../assets/img/logo/logo2.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useHistory} from "react-router-dom";
import REDUX_KEY from '../redux/ReduxKeys';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) =>
    createStyles({
        grow: {
            flexGrow: 1,

        },
        tabNav: {
            backgroundColor: "#F3F3F3",
            color: "#303942"
        },
        menuButton: {
            width: "5%",
            height: "100%",
            "&:hover": {
                backgroundColor: "transparent",
                borderColor: 'transparent',
            }
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            "&:hover": {
                backgroundColor: "#F3F3F3"
            }
        },
        inputRoot: {
            color: 'inherit',
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
                flex: 0.7,
                justifyContent: 'space-evenly',
                alignItems: 'center'

            },
        },

        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade("#F3F3F3", 0.15),
            '&:hover': {
                backgroundColor: fade("#F3F3F3", 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(5),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 5),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
            borderBottom: "1px solid black"
        }
    }),
);


export default function PrimarySearchAppBar() {

    const menuId = 'primary-search-account-menu';

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const loginReducer = useSelector(state => state.tokenReducer);

    const cartReducer = useSelector(state => state.cartReducer);

    const dispatch = useDispatch();

    const history = useHistory();

    const [isConnected, setIsConnected] = React.useState(!(loginReducer.user === undefined));

    const isMenuOpen = Boolean(anchorEl);

    const [search, setSearch] = React.useState("");
    const [hasSearched, setHasSearched] = React.useState(false);


    useEffect(() => {
        console.log(loginReducer.user);
        if (loginReducer.user === undefined)
            setIsConnected(false);
        else
            setIsConnected(true);

    }, [loginReducer.user, cartReducer]);


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (route) => {
        setAnchorEl(null);
        history.push(route)
    };

    const renderCart = (
        <IconButton onClick={() => history.push("/user/cart")} aria-label="show 17 items presents on cart"
                    color="inherit">
            <Badge badgeContent={cartReducer.cart.length} color="secondary">
                <ShoppingCartIcon/>
            </Badge>
        </IconButton>
    );

    const connectedMenu = (
        [
            <MenuItem key={"PROFIL"} onClick={() => handleMenuClose('/user/profile')}>Mon profil</MenuItem>,
            <MenuItem key={"PLUGINS"} onClick={() => handleMenuClose('/user/plugins')}>Mes plugins</MenuItem>,
            <MenuItem key={"CART"} onClick={() => handleMenuClose('/user/cart')}>Mon panier</MenuItem>,
            <MenuItem key={"DISCONNEXION"} onClick={() => {
                dispatch({type: REDUX_KEY.LOGIN, value: undefined});
                dispatch({type: REDUX_KEY.REMOVE_ALL_ITEMS});
                setAnchorEl(null);
            }}>Se deconnecter</MenuItem>
        ]


    );

    const disconnectedMenu = (
        [
            <MenuItem key={"CONNEXION"} onClick={() => history.push('/signIn')}>Se connecter</MenuItem>,
            <MenuItem key={"CREATE"} onClick={() => history.push('/signUp')}>Créer un compte</MenuItem>
        ]

    );

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            {
                isConnected ? connectedMenu : disconnectedMenu
            }

        </Menu>
    );

    const cleanSearch = () => {
        setSearch("");
    };


    return (
        <div className={classes.grow}>
            {hasSearched && <Redirect to={{
                pathname: '/',
                state: {search: search}
            }}
            />}
            <AppBar className={classes.tabNav} position="static">
                <Toolbar>
                    <IconButton
                        href={"/"}
                        onClick={() => cleanSearch()}
                        edge="start"
                        className={classes.menuButton}
                        aria-label="open drawer"
                    >
                        <CardMedia image={Logo} style={{height: 50, width: "100%", backgroundSize: "contain"}}/>
                    </IconButton>
                    <Button size={"medium"} className={classes.title} onClick={() => cleanSearch()} href={"/"}>
                        BFSV
                    </Button>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                                value={search}
                                onChange={event => {                                 //adding the onChange event
                                    setHasSearched(true);
                                    setSearch(event.target.value);
                                }}
                            />
                        </div>
                        {
                            isConnected ? renderCart : ""
                        }

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}
