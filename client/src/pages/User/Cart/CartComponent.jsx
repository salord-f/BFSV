import React, { useEffect, useState } from 'react';

import CartItemCard from './CartItem'
import { useSelector } from 'react-redux';
import { Typography, Card, CardContent, Button, Modal } from '@material-ui/core';
import Checkout from '../Payment/Checkout';
import { useHistory } from 'react-router-dom';


export default function Cart() {

    const cartReducer = useSelector(state => state.cartReducer);

    const loginReducer = useSelector(state => state.tokenReducer);

    const history = useHistory();

    const [totalPrice, setTotalPrice] = useState(0);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [i, setI] = useState(0);

    useEffect(() => {
        let tempArray = [];
        tempArray = cartReducer.cart.map((value) => value.price);
        if (tempArray.length) {
            setTotalPrice(tempArray.reduce((accumulator, currentValue) => accumulator + currentValue))
        } else {
            setTotalPrice(0)
        };
        if (i > 0) {
            if (loginReducer.user === undefined)
                history.push("/")
        } else {

            setTimeout(() => setI(1), 100)
        }

    }, [cartReducer, loginReducer, i])


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={{ width: '80%', height: '80%', backgroundColor: "white", padding: "3em", marginLeft: "10%", marginTop: "5%" }}>

                    <Checkout />
                </div>
            </Modal>
            <Typography style={{
                textAlign: "center",
                padding: "1em",
                fontSize: "2rem"
            }}>
                Mon panier
        </Typography>
            <div style={{ paddingLeft: '10%', paddingRight: '10%' }}>

                {
                    cartReducer.cart.map((value, index) =>

                        <CartItemCard key={index} plugin={value} />
                    )
                }

                <BottomCartComponent nbItems={cartReducer.cart.length} price={totalPrice} />

                <div style={{ textAlign: "right", padding: "2em" }}>
                    <Button variant="contained" disabled={!cartReducer.cart.length} color="primary" onClick={() => handleOpen()}>
                        Payer
                </Button>

                </div>



            </div>
        </>
    );
}


const BottomCartComponent = (props) => {


    return (
        <Card style={{
            backgroundColor: "#80808029", flexDirection: "row", display: "flex", justifyContent: "space-between"
        }}>
            <CardContent>
                Nombre d'articles total : {props.nbItems}
            </CardContent>
            <CardContent>
                Prix total : {props.price === 0 ? "Gratuit" : props.price + "€"}
            </CardContent>
        </Card>
    );
}