import { Component, ReactElement } from "react";
import Product from "./product";
import Link from "next/link";
import { ProductModel } from "../../models/models";

interface GridProps{
        products: ProductModel[];
        className?: string;
}

export default function ProductGrid(props: GridProps){
        return (
                <div className={`${props.className} grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-5 transform duration-500 w-full`}> 
                        { props.products?.map((product, index) => <Product key={index} product={product}/>)} 
                </div>
        )
}
