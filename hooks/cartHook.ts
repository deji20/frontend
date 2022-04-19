import { useEffect, useState } from "react";
import ReactUseCookie from "react-use-cookie";
import useSWR, { useSWRConfig } from "swr";
import api from "../api";
import { CartModel, ProductModel } from "../models/models";


export default function UseCart(){
    const [cartId, setCartId] = ReactUseCookie("cartId", '0');
    const key = `/cart/${cartId}`;
    const {data: cart, error} = useSWR<CartModel>(key, (key: string) => api.get<CartModel>(key))
    //mutate updates all components which use the hook when the cart updates
    const {mutate} = useSWRConfig()

    if(cart && cartId && cartId != cart._id) setCartId(cart._id);
    //updates cart 
    const setCart = (cart: CartModel) => api.patch<CartModel>(`/cart`, cart._id, cart).then((cart) => mutate(key));
    //retrives the full details for products in cart 
    const getProducts = () => {
        const prodCall = cart?.products?.map(async (product: any) => {
            let res = await api.get<ProductModel>(`product/${product.id}`);
            return {amount: product.amount, product:  res};
        })
        if(prodCall) return Promise.all(prodCall);
    } 

    return {
        cart: cart,  
        setCart,
        getProducts
    };
}