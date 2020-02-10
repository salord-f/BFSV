import React, {Component} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTube from 'react-youtube';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import '../style/details.scss'

toast.configure({
    autoClose:6000,
    draggable:false
    });

function CategoryItem(props) {
    return <Card className="categoryItem1">
        <CardContent className="categoryItem2">
            <Typography className="categoryText">{props.item}</Typography>
        </CardContent>
    </Card>
}

function TagItem(props) {
    return <Chip className="tagItem" color={"primary"} variant={"outlined"} label={props.item}/>
}

function youTube(videoId) {
    if(videoId!==""){
        return(
            <div className="detailYoutube">
                <YouTube videoId={videoId}/>
            </div>
        )
    }
}

function addToCard(name){
    toast.success("Plugin "+name+" added to cart.");
}

function Details(){

    let testplugin = {
        name: "bASS",
        version: "1.0.1",
        description: "The best bass you will every find... and this should be longer because it is a description lol do you like this text? Such beautiful text much words. Is this enough? Do you think we need more text? We need more ziggurats. Ok I stop now",
        author: "FluidGM",
        image: "bASS.png",
        //next are optional
        //codeLink: String,
        categories: ["MODULATION","REVERB"],
        tags: ["tag1","tag2","tag3"],
        youtubeLink: "B3WJaC-7g2c",
        //likes: [String], // user mails
        //comments: [{type: mongoose.Schema.ObjectId, ref: 'comments'}],
        /*status: {
            available: {type: Boolean, default: false},
            automaticValidation: {type: Boolean, default: false},
            manualValidation: {type: Boolean, default: false},
        },*/
        tryLink: "https://www.google.be/",
        price: 15.99,
        zipLocation: "not sure what is supposed to be here",
    };

    let plugin = testplugin;

    return (
        <Card className="detailCard" variant="outlined">
            <div className="detailWrapper">
                <CardContent className="leftCard">
                    <CardMedia className="detailMedia">
                        <img src={require("../assets/images/"+plugin.image)}/>
                    </CardMedia>
                </CardContent>
                <CardContent className="rightCard">
                    <Typography color="textSecondary" gutterBottom style={{float: "left"}}>
                        Category :
                    </Typography>
                    {plugin.categories.map((item, index) => (
                        <CategoryItem key={index} item={item} />))
                    }
                    <Typography variant="h5" component="h2">
                        {plugin.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"v"+plugin.version}
                    </Typography>
                    <Typography className="detailTitle" color="textSecondary" gutterBottom>
                        {plugin.price+" €"}
                    </Typography>
                    <Button variant="contained" onClick={() => addToCard(plugin.name)}>Add to cart</Button>
                    <div style={{marginTop: "10px"}}>
                        {plugin.tags.map((item, index) => (
                            <TagItem key={index} item={item} />))
                        }
                    </div>
                </CardContent>
            </div>
            <CardContent>
                <Typography className="detailTitle" color="textSecondary" gutterBottom>
                    Description
                </Typography>
                <Typography variant="body2" component="p">
                    {plugin.description}
                </Typography>
            </CardContent>
            {youTube(plugin.youtubeLink)}
            <CardActions>
                <Button size="small" href={plugin.tryLink}>Try now</Button>
            </CardActions>
        </Card>
    );
}

export default Details;