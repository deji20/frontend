import { Component } from "react";
import Image from "next/image";
import Pricetag from "../pricetag";
import { ProductModel } from "../../models/models";

interface PriceProps{
    product: ProductModel;
    className?: string;
}

export default function ProductPrice(props: PriceProps){
    return(
            <Pricetag className={props.className} price={props.product.price}/>
    )
}