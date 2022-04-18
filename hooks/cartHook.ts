import { useEffect, useState } from "react";
import ReactUseCookie from "react-use-cookie";
import useSWR, { useSWRConfig } from "swr";
import api from "../api";
import { CartModel } from "../models/models";


export default function UseCart(): [CartModel, (cart: CartModel) => void]{
    const [cartId, setCartId] = ReactUseCookie("cartId", '0');
    const key = `/cart/${cartId}`;
    const {data: cart, error} = useSWR<CartModel>(key, (key) => api.get<CartModel>(key))
    const {mutate} = useSWRConfig()

    if(cart && cartId && cartId != cart._id){
        setCartId(cart._id);
    }

    const setCart = (cart: CartModel) => {
        //setCookie(JSON.stringify(cart));
        api.patch<CartModel>(`/cart`, cart._id, cart).then((cart) => {
            console.log(cart);
            mutate(key);
        })
    }
    return [cart as CartModel,  setCart];
}