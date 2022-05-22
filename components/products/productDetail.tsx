import { Component, Fragment, useState } from "react";
import Img from "../image";
import ProductPrice from "./productPrice";
import { ProductModel } from "../../models/models";
import Dialog from "../baseComponents/baseDialog";
import OffsetButton from "../utilityComponent/offsetButton";
import AddToCart from "../cart/addToCart";
import Loading from "../fallback/loading";

export default function ProductDetail(props: {product: ProductModel}){
    const [dialog, dialogOpen] = useState(false)
    const [dialogImage, changeImage] = useState(0)
    if(!props.product?.version?.[0]) return <Loading/>
    let version = props.product.version?.[0]

    const imageDialog = (
        <Dialog onClose={() => dialogOpen(false)} darken={true}>
            <div className="h-full w-full relative">
                <Img imgClass="rounded" className="shadow-xl rounded" pictures={version?.pictures} />
            </div>
        </Dialog>
        )

    return(
        <Fragment>
            {dialog && imageDialog}
            <div className="flex flex-grow flex-row justify-evenly relative self-center gap-5">
                <div className="cursor-pointer hover:scale-105 transition-transform pt-16" onClick={() => dialogOpen(true)}>
                    <Img className="rounded w-96" pictures={version?.pictures} />
                </div>
                <div className="relative flex flex-col flex-grow font-light max-w-4xl text-white bg-opacity-20">
                    <h1 className="p-2 text-center text-3xl">{props.product.name}</h1>
                    <div className="flex flex-row gap-3">
                        <p className="p-2 text-sm opacity-80 text-left">{version?.description}</p>
                        <div className="flex flex-col min-w-[20rem] rounded-lg ">
                            <h2 className="p-2 px-5 rounded-t-lg bg-white text-white text-center bg-opacity-20">Details</h2>
                            <table className="">
                                <tbody className="text-sm">
                                {version.attributes.map((attribute, i) => {
                                    const css = "text-center border-r border-b border-opacity-10 p-1 px-2 " + (i % 2 != 0 && "bg-white bg-opacity-10")
                                    return (
                                        <tr key={i} className="">
                                            <td className={css}>{attribute.name}</td>
                                            <td className={css}>{attribute.value}</td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex w-full h-full align-bottom">
                        <div className="flex flex-col m-auto mr-0 mb-0">
                            <ProductPrice product={props.product} className="text-right w-full pb-2"/>
                            <AddToCart className="ml-auto mr-0 h-max" id={props.product._id}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}