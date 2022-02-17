import { Component, ReactElement } from "react";
import Product from "./product";
import Link from "next/link";
import { ProductModel } from "../../models/models";

interface GridProps{
        products: ProductModel[];
        className?: string;
}

export default function ProductGrid(props: GridProps){
        let productSquares = props.products?.map((product, index) => {
                return (
                        <Link key={index} href={"/product/" + product._id} passHref> 
                                <Product product={product}/> 
                        </Link>
                )
        }) || [];
        
        let gridCols = [];
        let gridAmount = props.products?.length || 0;
        for(let i = 0; i < gridAmount; i++){
                let amount = productSquares.length / gridAmount;
                gridCols.push(
                        <div key={i}>
                                {productSquares.slice(i * amount, (i+1) * amount)}
                        </div>
                        );
        }
        let grid = <div className={props.className + " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transform duration-500 w-full"}> {gridCols} </div>
        //let grid = <div className="flex flex-col flex-wrap transform duration-500 w-screen">{ productSquares }</div>
        return grid;
}
