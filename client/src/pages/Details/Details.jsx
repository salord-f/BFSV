import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTube from 'react-youtube';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import FavoriteIcon from '@material-ui/icons/Favorite';


import '../../style/details.scss'
import Comment from "./Comment";

function CategoryItem(props) {
    return <Button style={{marginLeft:"10px",background:"lightblue"}}>
        <Typography className="categoryText">{props.item}</Typography>
    </Button>
}

function TagItem(props) {
    return <Chip className="tagItem" variant={"outlined"} label={props.item}/>
}

function youTube(videoId) {
    if(videoId!=="" && videoId!=null){
        return(
            <div className="detailYoutube">
                <YouTube videoId={videoId}/>
            </div>
        )
    }
}

function Error() {
    return (
        <div style = {{
            width: "100vw",
            "text-align": "center"
        }}>
            <img style={{
                width: "80vh",
                height: "80vh"
            }} src={require("../../assets/img/error.jpg")}
            />
        </div>

    )
}

function addToCard(name){
    toast.success("Plugin "+name+" added to cart.");
}

function codeLink(link) {
    if(link!=="" && link!=null){
        return (
            <a href={link}>Source code</a>
        )
    }
}

function Details(props){

    const [plugin,setPlugin] = useState('');
    const [error,setError] = useState(false);

    let x = Date.now();

    useEffect( () => {
            axios.get("http://localhost:3000/plugins/"+props.match.params.id).then((response)=>{
                setPlugin(response.data.data);
                console.log(response.data.data);
                //axios.get("http://localhost:3000/plugins/5e417f4b56e4d01414d7c151/image").then((response)=>{
                    //console.log("Response oui : "+response)
                //})
            })
                .catch(err => {
                    setError(true);
                })
    }, []);

    let testplugin = {
        name: "bASS",
        version: "1.0.1",
        description: "The best bass you will every find... and this should be longer because it is a description lol do you like this text? Such beautiful text much words. Is this enough? Do you think we need more text? We need more ziggurats. Ok I stop now",
        author: "FluidGM",
        image: "bASS.png",
        codeLink: "https://github.com/salord-f/BFSV",
        categories: ["MODULATION","REVERB"],
        tags: ["tag1","tag2","tag3"],
        youtubeLink: "B3WJaC-7g2c",
        likes: ["wesh","alors","Jul","le","sang"], // user mails
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
        error ? <Error/> :
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item xs={8}>
                <Card className="detailCard" variant="outlined">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            {/*<img className="detailImage" src={require("../assets/images/"+plugin.image)}/>*/}
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container justify="flex-start" style={{marginTop: "20px"}}>
                                <Grid item xs={12}>
                                    <Typography color="textSecondary" gutterBottom style={{float: "left"}}>
                                        Category :
                                    </Typography>
                                    {
                                        plugin.categories &&
                                        plugin.categories.map((item, index) => (
                                            <CategoryItem key={index} item={item} />))
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h2">
                                        {plugin.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography color="textSecondary">
                                        {plugin.author}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" component="p">
                                        {"v"+plugin.version}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        plugin.price &&
                                        <Typography className="detailTitle" color="textSecondary" gutterBottom>
                                            {plugin.price+" €"}
                                        </Typography>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={() => addToCard(plugin.name)}>Add to cart</Button>
                                </Grid>

                                <Grid item xs={12} style={{marginTop: "10px"}}>
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
                                    <FavoriteIcon style={{float:"left",color:"red"}}>9</FavoriteIcon>
                                    <h6 style={{float:"left"}}>{plugin.likes && plugin.likes.length}</h6>
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
                        <Button size="small" href={plugin.tryLink}>Try now</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={8} style={{marginTop:"20px"}}>
                {
                    plugin.comments &&
                    plugin.comments.map((item, index) => (
                    <Comment key={index} comment={item} />))
                }
            </Grid>
        </Grid>
    );
}

export default Details;