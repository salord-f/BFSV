import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import "../../style/plugin.scss";
import ImageAsync from "react-image-async";
import { baseURL } from "../../api";
import { createStyles, makeStyles } from "@material-ui/core/styles";

export default function Plugin(props) {
    const image = baseURL + "plugins/" + props.id + "/image";

    const useStyles = makeStyles(() =>
        createStyles({
            clickableCard: {
                height: "100%",
                "&:hover": {
                    textDecoration: "none",
                    backgroundColor: "#e0e0e0",
                }
            }
        }));

    const classes = useStyles();

    return (
        <Card className="card" style={{ backgroundColor: "#F3F3F3", border: 0 }}>
            <CardActionArea className={classes.clickableCard} href={props.href ? props.href : "/plugins/" + props.id}>
                <CardHeader className="title" title={props.name ? props.name : "Your plugin title"} />
                <CardMedia className="media" style={{ display: "flex" }}>
                    <ImageAsync src={image}>
                        {({ loaded, error }) =>
                            loaded ? <img className="mediaImage" alt="Loading..." src={image} /> : <div>Loading...</div>
                        }
                    </ImageAsync>
                </CardMedia>

                <CardContent className="descriptionCard">
                    {props.description ? props.description : "There should be a description of your plugin here."}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
