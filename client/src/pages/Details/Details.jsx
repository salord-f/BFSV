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
    return <Button style={{ marginLeft: "10px", background: "lightblue" }}>
        <Typography className="categoryText">{props.item}</Typography>
    </Button>
}

function TagItem(props) {
    return <Chip className="tagItem" variant={"outlined"} label={props.item} />
}

function youTube(videoId) {
    if (videoId !== "" && videoId != null) {
        return (
            <div className="detailYoutube">
                <YouTube videoId={videoId} />
            </div>
        )
    }
}





function codeLink(link) {
    if (link !== "" && link != null) {
        return (
            <a href={link}>Source code</a>
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
    const isConnected = !(login.user === undefined);

    const dispatch = useDispatch();

    let x = Date.now();

    const addToCard = async (plugin, dispatch) => {
        let payload = {
            plugin: plugin._id
        }

        await apis.updateCart(login.user._id, payload).then(res => {
            let ADD_ITEM_TO_CART = {
                type: REDUX_KEY.ADD_ITEM,
                value: plugin
            };
            dispatch(ADD_ITEM_TO_CART);
            toast.success("Plugin " + plugin.name + " added to cart.");

        }).catch((err) => {
            console.log(err);
            toast.error("Plugin " + plugin.name + "is no longer available ");
        })
    }

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

    let testplugin = {
        id: 1,
        name: "bASS",
        version: "1.0.1",
        description: "The best bass you will every find... and this should be longer because it is a description lol do you like this text? Such beautiful text much words. Is this enough? Do you think we need more text? We need more ziggurats. Ok I stop now",
        author: "FluidGM",
        image: "bASS.png",
        codeLink: "https://github.com/salord-f/BFSV",
        categories: ["MODULATION", "REVERB"],
        tags: ["tag1", "tag2", "tag3"],
        youtubeLink: "B3WJaC-7g2c",
        likes: ["wesh", "alors", "Jul", "le", "sang"], // user mails
        comments: [{
            authorMail: "jacques.rossel@etu.unice.fr",
            content: "Trop bien, j'adore! wesh alors ok d a fqsfdf fsdgeg loDQ SQ ZEERRZE fdsfsteh fsdgr ssss fgsdgf dgdsg dsgg gsgsd s gsg  gs gsg sggsd gggf bim bam boum a fsfsd hfhghgf kkkgf gd gdfdhfdfg hgfgfhgfhgfh jyuyu dfgdgfd dsgdgfd fghd gdfg gdfgdfgdf hgfghffhg ggdf dqs",
            time: x,
        },
        {
            authorMail: "laurent-jerome.benazet-lacarre@etu.univ-cotedazur.fr",
            content: "ok boomer",
            time: x,
        }],
        /*status: {
            available: {type: Boolean, default: false},
            automaticValidation: {type: Boolean, default: false},
            manualValidation: {type: Boolean, default: false},
        },*/
        tryLink: "https://www.google.be/",
        price: 15.99,
        zipLocation: "not sure what is supposed to be here",
    };

    return (
        error ? <NotFound /> :
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item xs={8}>
                    <Card className="detailCard" variant="outlined">
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <ImageAsync src={plugin.image}>
                                    {({ loaded}) =>
                                        loaded ? <img alt="Loading..." className="detailImage" src={plugin.image} /> : <div>Loading...</div>
                                    }
                                </ImageAsync>
                            </Grid>
                            <Grid item xs={9}>
                                <Grid container justify="flex-start" style={{ marginTop: "20px" }}>
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
                                        <Button variant="contained" disabled={!isConnected} onClick={() => addToCard(plugin, dispatch)}>Add to cart</Button>
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
                                    <Grid item xs={12}>
                                        <Typography color="textSecondary" gutterBottom style={{float: "left"}}>
                                            {"Catégories :"}
                                        </Typography>
                                        {
                                            plugin.categories &&
                                            plugin.categories.map((item, index) => (
                                                <CategoryItem key={index} item={item}/>))
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
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
                        <Button size="small" href={tryURL + plugin.tryLink} target="_blank">Essayer !</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={8} style={{marginTop:"20px",width:"100%"}}>
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
