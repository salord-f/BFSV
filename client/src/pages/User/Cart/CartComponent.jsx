import React, { useEffect, useState } from 'react';

import CartItemCard from './CartItem'
import { useSelector } from 'react-redux';
import { Typography, Card, CardContent, Button } from '@material-ui/core';


export default function Profile(props) {

    const cartReducer = useSelector(state => state.cartReducer);

    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        let tempArray = [];
        tempArray = cartReducer.cart.map((value) => value.price);
        if (tempArray.length) {
            setTotalPrice(tempArray.reduce((accumulator, currentValue) => accumulator + currentValue))
        } else {
            setTotalPrice(0)
        }
    }, [cartReducer])

    return (
        <>
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
                    <Button variant="contained" color="primary">
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
                Prix total : {props.price}
            </CardContent>
        </Card>
    );
}