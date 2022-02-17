import { Component, ReactElement, useEffect, useState } from "react";
import { ProductModel } from "../../models/models";
import List from "../list";
import ProductGrid from "./productGrid";
import Product from "./product";
import axios from "axios";
import Link from "next/link";
import api from "../../api";
import useSWR from "swr";

type CategoryGridProps = {
    categories: string[];
    className?: string;
}

export default function ProductCategoriesGrid(props: CategoryGridProps){
    const [category, setCategory] = useState(props.categories[0]);
    const {data: products, error} = useSWR<ProductModel[]>(category, getProductsByCategory);
    
    if(error) return <p>{error.toString()}</p>
    if(!products) return <p>Loading</p> 


    return (
        <div className={props.className}>
            <List headers={props.categories} onChange={async (selected, event) => {
                setCategory(selected);
            }} 
            selected={props.categories[0]}/>
            <div className="px-10">
                <ProductGrid products={products || []} />
            </div>
            <div className="bg-gray-900 mx-auto pb-5 justify-center flex">
                <Link passHref href={`/product/category/${category}`} >
                    <div className="shadow-2xl rounded-2xl p-1 px-3 text-white text-center bg-blue-400 bg-opacity-30 cursor-pointer">
                        <span className="font-light">Show More</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

let getProductsByCategory = async (category: string) => {
    console.log("category",category)
    let products = await api.get<ProductModel[]>(`/product?filter=categories=${category}`);
    console.log(products)
    return products;
}