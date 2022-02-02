import { Component, ReactElement } from "react";
import Image from "next/image";
import HeroImage from "../heroImage";
import Pricetag from "../pricetag";
import ProductPrice from "./productPrice";
import { ProductModel } from "../../models/models";

export default function ProductDescription(props: {product: ProductModel}){
    let version = props.product.version[0];
    return (
            <div className="h-full flex flex-col bg-purple-900 bg-opacity-20 overflow-ellipsis">
                <div className="px-10 border-b border-gray-700 text-xl text-white">
                    <h3>{props.product.name}</h3>
                </div>
                <div className="overflow-hidden flex flex-1 place-items-center">
                        <p className="text-sm px-10 text-white overflow-ellipsis">{version.description}</p>
                </div>
                <div className="flex justify-end">
                    <div className="bg-white bg-opacity-10 rounded-tl-lg px-2">
                        <Pricetag price={props.product.price}/> 
                    </div>
                </div>
            </div>
    )
}