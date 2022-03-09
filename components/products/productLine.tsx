import { Component, ReactElement, useEffect, useRef, useState } from "react";
import api from "../../api";
import { ProductModel } from "../../models/models";
import Img from "../image";
import ProductHero from "./productHero";
import Link from "next/link";
import Pricetag from "../pricetag";
import UseCart from "../../hooks/cartHook";
import useSWR from "swr";

interface ProductLineProps{
    id: string;
    amount: number;
}

export default function ProductLine( props: ProductLineProps ){
    const {data, error} = useSWR<ProductModel>(`product/${props.id}`,(url) => api.get<ProductModel>(url));
    const [cart, setCart] = UseCart();
    
    const product = data;
    return (
        <Link href={`/product/${props.id}`} passHref>
            <a className="cursor-pointer">
                <div className="grid grid-cols-12 bg-gray-100 bg-opacity-40 m-5 p-1 min-h-[50px] rounded hover:shadow-inner shadow-2xl drop-shadow-2xl text-white text-center font-extralight">
                    <div className="col-span-2">
                        {product?.version && <Img className="shadow-2xl" pictures={product?.version[0].pictures}/> }
                    </div>
                    <div className="col-span-4 flex justify-center place-items-center">
                        {product?.name}
                    </div>
                    <div className="col-span-1 flex justify-center place-items-center">
                        {props.amount}
                    </div>
                    <div className="col-span-4 flex justify-center place-items-center">
                        <div className="flex flex-grow h-full justify-end place-items-end">
                            <Pricetag className="rounded bg-green-900 bg-opacity-40" price={product?.price || 0}/>
                        </div>
                    </div>
                    <div className="flex flex-grow justify-end" onClick={(event) => {
                            event.preventDefault()
                            cart.products = cart.products.filter(prod => prod.id !== props.id);
                            setCart(cart);
                        }} >
                        <Img className="h-full w-5 transition-all duration-300 hover:w-6" pictures={["/api/icons/trash.svg"]}/>
                    </div>
                </div>
            </a>
        </Link>
        )
}