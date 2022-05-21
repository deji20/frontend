import { Component } from "react";

interface PriceProps{
    price: number;
    className?: string;
}

export default function Pricetag(props: PriceProps){
    return (
        <div className={"p-1 px-2 text-white font " + props.className }>
            <div className="flex flex-row w-min h-min"><p>{props.price}<sub>kr</sub></p></div>
        </div>
    )
}