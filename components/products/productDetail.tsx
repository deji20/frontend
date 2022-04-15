import { Component, Fragment, useState } from "react";
import Img from "../image";
import ProductPrice from "./productPrice";
import { ProductModel } from "../../models/models";
import Dialog from "../baseComponents/baseDialog";
import OffsetButton from "../utilityComponent/offsetButton";
import AddToCart from "../cart/addToCart";

export default function ProductDetail(props: {product: ProductModel}){
    const [dialog, dialogOpen] = useState(false)
    const [dialogImage, changeImage] = useState(0)

    let version = props.product.version[0]

    const imageDialog = (
        <Dialog onClose={() => dialogOpen(false)} darken={true}>
            <div className="h-full w-full relative">
                <Img imgClass="rounded" className="shadow-xl rounded" pictures={version.pictures} />
            </div>
        </Dialog>
        )

    return(
        <Fragment>
            {dialog && imageDialog}
            <div className="flex flex-grow flex-row relative self-center rounded-xl shadow-2xl bg-gray-700">
                <div className="grid grid-rows-2 h-full w-80">
                    <div className="w-full p-10 cursor-pointer hover:p-1 hover:scale-105 transition-transform" onClick={() => dialogOpen(true)}>
                        <div className="relative h-full w-full hover:p-10">
                            <Img className="rounded" pictures={version.pictures} />
                        </div>
                    </div>
                    <div className="flex flex-grow align-middle justify-center">
                        <div className="m-3 p-2 h-20 place-self-center bg-gray-800 bg-opacity-20 rounded-xl shadow-xl">
                            <p className="font-light text-white">
                                {version.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-grow h-full">
                    <ProductPrice product={props.product}/>
                </div>
                <AddToCart id={props.product._id}/>
            </div>
        </Fragment>
    )
}