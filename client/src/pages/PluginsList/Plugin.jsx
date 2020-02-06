import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import "../../style/plugin.scss"

class Plugin extends React.Component {
    render() {
        return (
            <Card className="card" style={{backgroundColor: "gray"}}>
                <CardActionArea href={"http://localhost:8000/plugins/" + this.props.id}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" className="title">
                            {this.props.title ? this.props.title : "Your plugin title."}
                        </Typography>
                    </CardContent>

                    <CardMedia className="media">
                        <img className="mediaImage"
                             src={this.props.image ? require('../../assets/images/' + this.props.image + '.png') : ""}
                             alt=""/>
                    </CardMedia>

                    <CardContent className="descriptionCard">
                        <Typography gutterBottom variant="subtitle1" className="description">
                            {this.props.description ? this.props.description : "There should be a description of your plugin here."}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

export default Plugin