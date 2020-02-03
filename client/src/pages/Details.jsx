import React, {Component} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import '../style/details.scss'

toast.configure({
    autoClose:6000,
    draggable:false
    });

class Details extends Component{

    addToCard = (pluginName) => toast.success("Plugin "+pluginName+" added to cart.");

    render() {
        return (
            <Card className="card" variant="outlined">
                <div className="wrapper">
                    <CardContent className="leftCard">
                        <CardMedia
                            className="media"
                            title="Contemplative Reptile">
                            <img src={require("../assets/images/bASS.png")}/>
                        </CardMedia>
                    </CardContent>
                    <CardContent className="rightCard">
                        <Typography color="textSecondary" gutterBottom>
                            Category : instruments
                        </Typography>
                        <Typography variant="h5" component="h2">
                            FluidGM Bass
                        </Typography>
                        <Typography variant="body2" component="p">
                           Some dope bass
                        </Typography>
                        <Typography className="title" color="textSecondary" gutterBottom>
                            15,99 €
                        </Typography>
                        <Button variant="contained" onClick={() => this.addToCard("FluidGM")}>Add to cart</Button>
                    </CardContent>
                </div>
                <CardContent>
                    <Typography className="title" color="textSecondary" gutterBottom>
                        Description
                    </Typography>
                    <Typography variant="body2" component="p">
                        The best bass you will every find... and this should be longer because it is a description lol do you like this text?
                        Such beautiful text much words.
                        Is this enough? Do you think we need more text? We need more ziggurats.
                        Ok I stop now
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Try now</Button>
                </CardActions>
            </Card>
        );
    }
}

export default Details;