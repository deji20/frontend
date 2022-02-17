import { Component, ReactElement } from "react";
import ProductPrice from "./productPrice";
import Img from "../image";
import Link from "next/link";
import { ProductModel } from "../../models/models";
import OffsetButton from "../utilityComponent/offsetButton";

export default function Product(props: {product: ProductModel}){
    let version = props.product?.version[0] || undefined;
    
    return (
        <Link href={"/product/" + props.product._id} passHref>
            <a>
                <div className="flex flex-col shadow-2xl hover:shadow-inner cursor-pointer m-5 rounded-b-lg">
                    <Img className="" multiple pictures={version?.pictures}/>
                    <div className="bg-red-500 bg-opacity-10 w-full">
                        <div className=" bg-gray-100 bg-opacity-20 px-2">
                            <h2 className="text-l text-white">
                                {props.product.name}
                            </h2>
                        </div>
                        <div className="px-2">
                            <p className="text-xs text-white m-1 leading-6 min-w-[250px]">
                                {version?.description}
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-gray-600 bg-opacity-20">
                                <ProductPrice className="rounded-br-2xl" product={props.product}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}