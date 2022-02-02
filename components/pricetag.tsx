import { Component } from "react";

interface PriceProps{
    price: number;
    className?: string;
}

export default function Pricetag(props: PriceProps){
    return (
        <div className={props.className + " px-2 text-white font-thin"}>
            <p className="text-sm w-max">{props.price} <sub> Kr </sub></p>
        </div>
    )
}