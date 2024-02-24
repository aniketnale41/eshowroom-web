import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [ allProducts, setAllProducts] = useState([]);
    const [ cartCount, setCount] = useState(0);

    useEffect(() => {
        axios.get("/api/products")
            .then((res) => {
                let cart = {};
                // for (let index = 0; index < res.data.length + 1; index++) {
                //     cart[index] = 0;
                // }
                setAllProducts(res.data);
                // console.log("all items: ", res.data)
            }).catch((err) => {
                console.log(err)
            });
    }, []);

    const addToCart = (itemId) => {
        console.log("adding", itemId)
        // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if(!cartItems[itemId]){
            setCount((oldCount) => oldCount + 1);
        }
        setCartItems((oldItems) => ({ ...oldItems, [itemId]: oldItems[itemId] ?  oldItems[itemId] + 1 : 1}));
        console.log("cart: ",cartItems)
    }

    const removeFromCart = (itemId) => {
        if(cartItems[itemId] == 1){
            setCount((oldCount) => oldCount - 1);
        }
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (let item in cartItems) {

            console.log(cartItems[item]);
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find((product) => product.id === Number(item))
                console.log("item Info",itemInfo)
                totalAmount += itemInfo.newPrice * cartItems[item];
            }
        }
        return totalAmount;
    }


    const contextValue = { getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart, cartCount};


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;