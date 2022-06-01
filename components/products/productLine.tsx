import { Component, ReactElement, useEffect, useRef, useState } from "react";
import api from "../../api";
import { ProductModel } from "../../models/models";
import Img from "../image";
import ProductHero from "../category/categoryHero";
import Link from "next/link";
import Pricetag from "../pricetag";
import UseCart from "../../hooks/cartHook";
import useSWR from "swr";

interface ProductLineProps{
    product: ProductModel;
    amount: number;
    className? : string;
    onDelete?: (product: ProductModel) => void;
}

export default function ProductLine( props: ProductLineProps ){
    return (
        <li className={props.className}>
            <Link href={`/product/${props.product._id}`} passHref>
                <a className="cursor-pointer">
                    <div className="flex bg-white bg-opacity-20 border-2 border-opacity-20 rounded-lg hover:shadow-inner shadow-2xl drop-shadow-2xl text-white tracking-wider text-center font-light">
                        <div className="w-24">
                            {props.product.version && <Img imgClass="rounded-l-lg" className="shadow-2xl" pictures={props.product.version[0].pictures}/> }
                        </div>
                        <div className="px-2 flex flex-grow place-items-center ">
                            {props.product.name}
                        </div>

                        <div className="flex flex-shrink justify-center">
                            <div onClick={(e) => {
                                e.preventDefault() 
                                props.onDelete && props.onDelete(props.product)
                            }} 
                            className="flex flex-col text-center h-full justify-between place-items-end">
                                <Img 
                                    className="w-6 h-6 bg-red-700 bg-opacity-70 rounded-tr-lg " 
                                    imgClass="transform-all duration-300 hover:scale-125" 
                                    pictures={["/icons/delete.svg"]}/>
                                <p className="text-center w-full pt-1">{props.amount}</p>
                                <Pricetag className="rounded-tl text-white font-bold bg-white bg-opacity-20" price={props.product?.price || 0}/>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
        )
}