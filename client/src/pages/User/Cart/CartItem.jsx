import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import "../../../style/cart.scss"
import { Link } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import { useDispatch } from "react-redux";
import REDUX_KEY from "../../../redux/ReduxKeys";
import ImageAsync from 'react-image-async';


const CartItemCard = (props) => {
    //alert(JSON.stringify(props))

    const dispatch = useDispatch();

    const removeItemFromCard = () => {
        let request = {
            type: REDUX_KEY.REMOVE_ITEM,
            value: props.plugin.id
        }
        dispatch(request)

    }

    const imageURL = "http://localhost:3000/plugins/" + props.plugin.id + "/image";

    return (
        <Card className="cart-card" style={{ backgroundColor: "#80808029" }}>
            <ImageAsync src={imageURL}>
                {({ loaded, error }) =>
                    loaded ? <img alt="Loading..." className="cart-mediaImage" src={imageURL} /> : <div className="cart-mediaImage">Loading...</div>
                }
            </ImageAsync>

            <CardContent className="cart-descriptionCard">

                <Link href={"/plugins/" + props.plugin.id}>
                    <Typography gutterBottom variant="h5" className="cart-title">
                        {props.plugin.name ? props.plugin.name : ""}
                    </Typography>
                </Link>
                <Typography gutterBottom className="cart-descriptionText" noWrap>
                    {props.plugin.description}
                </Typography>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography className="cart-descriptionText" noWrap style={{ alignSelf: "center" }}>
                        Auteur : {props.plugin.author} {"\t"}
                    </Typography>
                    {
                        props.plugin.codeLink ?
                            <IconButton
                                edge="start"
                                style={{ marginLeft: "2em" }}
                                //className={classes.menuButton}
                                aria-label="open drawer"
                                href={props.plugin.codeLink}
                            >
                                <GitHubIcon />
                            </IconButton> : ""
                    }


                </div>
            </CardContent>



            <CardContent className="cart-removeItemCard">
                <Typography className="cart-priceItem">
                    {props.plugin.price}
                </Typography>
                <IconButton
                    //className={classes.menuButton}
                    aria-label="open drawer"
                    onClick={() => removeItemFromCard()}
                >
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    )
}

export default CartItemCard
