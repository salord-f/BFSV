import React, {useEffect, useState} from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import "../../style/plugin.scss";
import ImageAsync from "react-image-async";
import {baseURL} from "../../api";

export default function Plugin(props) {
    const [image, setImage] = useState('');

    useEffect(() => {
        const image = baseURL + "plugins/" + props.id + "/image";
        setImage(image);
    }, []);

    return (
        <Card className="card" style={{backgroundColor: "gray"}}>
            <CardActionArea className="clickableCard" href={"/plugins/" + props.id}>
                <CardHeader className="title" title={props.name ? props.name : "Your plugin title"}/>
                <CardMedia className="media" style={{display: "flex"}}>
                    <ImageAsync src={image}>
                        {({loaded, error}) =>
                            loaded ? <img className="mediaImage" alt="Loading..." src={image}/> : <div>Loading...</div>
                        }
                    </ImageAsync>
                </CardMedia>

                <CardContent className="descriptionCard">
                    <Typography gutterBottom variant="subtitle1" className="description">
                        {props.description ? props.description : "There should be a description of your plugin here."}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}