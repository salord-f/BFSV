import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import "../../style/plugin.scss"

export default function Plugin(props) {
    return (
        <Card className="card" style={{backgroundColor: "gray"}}>
            <CardActionArea href={"http://localhost:8000/plugins/" + props.id}>
                <CardHeader className="title" title={props.name ? props.name : "Your plugin title"}/>

                <CardMedia className="media">
                    <img className="mediaImage"
                         src={props.image ? require('../../assets/' + props.image) : ""}
                         alt=""/>
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