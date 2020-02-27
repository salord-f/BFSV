import React, {useCallback, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTube from 'react-youtube';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


import ImageAsync from 'react-image-async';


import './../../style/details.scss'
import {useDispatch, useSelector} from 'react-redux';
import REDUX_KEY from '../../redux/ReduxKeys';

import Comment from "./Comment";
import apis, {tryURL,baseURL} from "../../api";
import {NotFound} from "../NotFound";

function CategoryItem(props) {
    return <Button disabled style={{ marginLeft: "10px", background: "lightblue", width:"100%" }}>
        <Typography className="categoryText">{props.item}</Typography>
    </Button>
}

function TagItem(props) {
    return <Chip className="tagItem" variant={"outlined"} label={props.item} />
}

function youTube(videoId) {
    if (videoId !== "" && videoId != null) {
        const id = videoId.split('=').pop();
        return (
            <div className="detailYoutube">
                <YouTube videoId={id} />
            </div>
        )
    }
}

function codeLink(link) {
    if (link !== "" && link != null) {
        return (
            <Button variant="contained" href={link}>Code source</Button>
        )
    }
}





function Details(props) {

    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    function like(bool) {
        let plug = plugin;
        let likes = plug.likes;
        let email = {email: login.user.mail};
        if(bool){
            apis.addLike(props.match.params.id, email);
            likes.push(login.user.mail);
        } else {
            apis.deleteLike(props.match.params.id, email);
            likes = likes.filter(like => like !== login.user.mail);
        }
        plug.likes = likes;
        setPlugin(plug);
        forceUpdate();
    }

    function handleCommentChange(e) {
        setComment(e.target.value);
    }

    function addComment() {
        let plug = plugin;
        let comments = plug.comments;
        let x = Date.now();
        let newCom = {
            authorMail: login.user.mail,
            content: comment,
            time: x,
        };


        apis.addComment(props.match.params.id, newCom);

        comments.push(newCom);
        plug.comments = comments;
        setPlugin(plug);
        setComment('');
    }

    const [plugin, setPlugin] = useState('');
    const [error, setError] = useState(false);
    const [comment, setComment] = useState('');
    const login = useSelector(state => state.tokenReducer);
    const cartReducer = useSelector(state => state.cartReducer);
    const isConnected = !(login.user === undefined);

    const dispatch = useDispatch();

    let x = Date.now();

    const addToCard = async (plugin, dispatch) => {
        if (cartReducer.cart.filter(cartPlugin => cartPlugin._id === plugin._id).length) {
            toast.error("Ce plugin : " + plugin.name + " est déjà dans votre panier.");
            return;
        }
        let payload = {
            plugin: plugin._id
        };

        await apis.updateCart(login.user._id, payload).then(res => {
            let ADD_ITEM_TO_CART = {
                type: REDUX_KEY.ADD_ITEM,
                value: plugin
            };
            dispatch(ADD_ITEM_TO_CART);
            toast.success("Plugin " + plugin.name + " a été ajouté à votre panier.");

        }).catch((err) => {
            console.log(err);
            toast.error("Plugin " + plugin.name + "n'est plus disponible");
        })
    };

    useEffect(() => {
        apis.getPlugin(props.match.params.id).then((response) => {
            console.log(response.data.data);
            let plugin = response.data.data;
            plugin.image = baseURL+"plugins/" + plugin._id + "/image";
            setPlugin(plugin);
            console.log(plugin);
        })
            .catch(err => {
                setError(true);
            });
    }, [props.match.params.id]);

    return (
        error ? <NotFound /> :
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item xs={8} style={{width:"100%"}}>
                    <Card className="detailCard" variant="outlined">
                        <Grid container spacing={10} style={{marginLeft:"40px",marginRight:"40px"}}>
                            <Grid item xs={3}>
                                <Grid container spacing={0}
                                      alignItems="center"
                                      justify="center"
                                      >
                                    <ImageAsync src={plugin.image} >
                                        {({ loaded}) =>
                                            loaded ? <img alt="Loading..." className="detailImage" src={plugin.image} /> : <div>Loading...</div>
                                        }
                                    </ImageAsync>
                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={3} justify="flex-start" style={{ marginTop: "20px" }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" component="h2">
                                            {plugin.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="textSecondary">
                                            Auteur : {plugin.author}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" component="p">
                                            {"version : " + plugin.version}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            <Typography className="detailTitle" color="textSecondary" gutterBottom>
                                                {plugin.price + " €"}
                                            </Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" disabled={!isConnected} onClick={() => addToCard(plugin, dispatch)}>Ajouter au panier</Button>
                                    </Grid>

                                    <Grid item xs={12} style={{ marginTop: "10px" }}>
                                        {
                                            plugin.tags &&
                                            plugin.tags.map((item, index) => (
                                                <TagItem key={index} item={item} />))
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {codeLink(plugin.codeLink)}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            !isConnected && <FavoriteIcon fontSize="large" style={{ float: "left", color: "grey" }}/>
                                            || isConnected && plugin && plugin.likes.includes(login.user.mail) && <FavoriteIcon onClick={() => like(false)} fontSize="large" style={{ float: "left", color: "red" }}/>
                                            || isConnected && plugin && !plugin.likes.includes(login.user.mail) && <FavoriteBorderIcon onClick={() => like(true)} fontSize="large" style={{ float: "left", color: "red" }}/>
                                        }
                                        <Typography variant="h6" component="p" style={{ float: "left", margin:"3px"}}>
                                            {plugin.likes && plugin.likes.length}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3} style={{ marginTop: "20px" }}>
                                <Grid container direction="column" spacing={1} alignItems="stretch">
                                    <Grid item >
                                        <Typography color="textSecondary" gutterBottom style={{float: "left"}}>
                                            {"Catégories :"}
                                        </Typography>
                                    </Grid>
                                    {
                                        plugin.categories &&
                                        plugin.categories.map((item, index) => (
                                            <Grid item xs={8} key={index}>
                                                <CategoryItem key={index} item={item}/>
                                            </Grid>))
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={11}>
                                <CardContent>
                                    <Typography className="detailTitle" color="textSecondary" gutterBottom>
                                        Description
                                </Typography>
                                    <Typography variant="body2" component="p">
                                        {plugin.description}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12}>
                                {youTube(plugin.youtubeLink)}
                            </Grid>
                        </Grid>
                        <CardActions>
                            <Button size="large" variant="contained" href={tryURL + plugin.tryLink} target="_blank">Essayer !</Button>
                        </CardActions>
                        {
                            login.user !== undefined &&  login.user.mail === plugin.author ? <CardActions>
                                <Button size="large" variant="contained" href={tryURL + '/webaudio/testers/mocha.html?plugin=' + plugin.tryLink} target="_blank">Tester !</Button>
                            </CardActions> : ''
                        }
                    </Card>
                </Grid>
                <Grid item xs={8} style={{ marginTop: "20px", width: "100%" }}>
                    {
                        plugin.comments &&
                        plugin.comments.map((item, index) => (
                            <Comment key={index} comment={item} />))
                    }
                </Grid>
                <Grid item xs={8} style={{ marginTop: "20px", width: "100%" }}>
                    <TextField id="commentField" disabled={!isConnected} multiline fullWidth variant="outlined" placeholder="Commentaire" value={comment} onChange={handleCommentChange} />
                    <Button variant="contained" disabled={!isConnected} style={{ float: "right", marginTop: "5px" }} onClick={() => addComment()}>Ajouter commentaire</Button>
                </Grid>
            </Grid>
    );
}

export default Details;
