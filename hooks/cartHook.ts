import { useEffect, useState } from "react";
import ReactUseCookie from "react-use-cookie";
import { CartModel } from "../models/models";


export default function UseCart(): [CartModel, (cart: CartModel) => void]{
    const [cookie, setCookie] = ReactUseCookie("cart", '{"products":[]}');
    if(!cookie) setCookie('{"products":[]}');   
    const cart = JSON.parse(cookie);
    const [cartState, setCartState] = useState<CartModel>(cart)
    
    const setCart = (cart: CartModel) => {
        setCookie(JSON.stringify(cart));
        setCartState(cart)
    }
    return [cart, setCart];
}