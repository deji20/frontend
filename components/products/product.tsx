import { Component, ReactElement } from "react";
import ProductPrice from "./productPrice";
import Img from "../image";
import Link from "next/link";
import { ProductModel } from "../../models/models";
import OffsetButton from "../utilityComponent/offsetButton";
import { useSpring, animated } from "react-spring";

export default function Product(props: {product: ProductModel}){
    let version = props.product?.version[0] || undefined;

    return (
        <Link href={"/product/" + props.product._id}>
            <div className="pb-2 border-opacity-50 hover:scale-105 duration-1000 transform-all cursor-pointer min-w-[250px]">
                <div className="row-span-6 border-l justify-center border-opacity-20 border-black">
                    <Img autoScroll={5000} pictures={props.product.version[0].pictures}/>
                </div>    
                <div className="flex align-bottom">
                    <div className="flex flex-col flex-grow">
                        <h2 className="text-l text-white">
                            {props.product.name}
                        </h2>
                        <div className="">
                            <p className="text-xs text-white leading-6">
                                {version?.description}
                            </p>
                        </div>
                    </div>
                    <div className="h-min flex">
                        <ProductPrice className="bg-black mt-auto p-1 bg-opacity-10" product={props.product}/> 
                    </div>
                </div>
            </div>
        </Link>
    )
}