import { Component, ReactElement } from "react";
import Product, {ProductModel} from "./product";
import ProductHero from "./productHero";

export default function ProductList(props: {products: ProductModel[]}){
        console.log(props);
        var list = props.products.map(product => { 
                return <div className="border-r border-ls" key={product._id}> <ProductHero product={product}/> </div>
        })
        return <div className="w-screen flex flex-row overflow-x-scroll overflow-y-hidden whitespace-nowrap "> {list}</div>
}