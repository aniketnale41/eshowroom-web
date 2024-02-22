import React, { createContext } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const[cartItems,setCartItems] = useState(getDefaultCart());
   
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))   
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () =>{
        let totalAmount= 0;
       // console.log(cartItems);
        for(let item  in cartItems)
        {
           
            console.log(cartItems[item]);
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount +=itemInfo.new_price * cartItems[item];
            }
            return totalAmount;
        }
    }
   
   
    const contextValue = {getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;