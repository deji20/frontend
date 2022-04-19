import { Component, ReactElement } from "react";
import ProductPrice from "./productPrice";
import Img from "../image";
import Link from "next/link";
import { ProductModel } from "../../models/models";
import OffsetButton from "../utilityComponent/offsetButton";
import { useSpring, animated } from "react-spring";

interface ProductProps{
    product: ProductModel;
    className?: string;
}

export default function Product(props: ProductProps){
    let version = props.product?.version[0] || undefined;

    return (
        <Link href={"/product/" + props.product._id}>
            <div className={`pb-2 border-opacity-50 hover:scale-105 duration-1000 transform-all cursor-pointer min-w-[250px]  ${props.className}`}>
                <div className="row-span-6 border-l justify-center border-opacity-20 border-black">
                    <Img autoScroll={5000} pictures={props.product.version[0].pictures}/>
                </div>    
                <div className="flex w-full align-bottom">
                    <div className="w-full inline whitespace-normal">
                        <h2 className="text-l text-white">
                            {props.product.name}
                        </h2>
                        <p className="text-xs text-gray-400 leading-6 line-clamp-2">
                            {version?.description}
                        </p>
                    </div>
                    <div className="h-min flex">
                        <ProductPrice className="bg-black mt-auto p-1 bg-opacity-10" product={props.product}/> 
                    </div>
                </div>
            </div>
        </Link>
    )
}