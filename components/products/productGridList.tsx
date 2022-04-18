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

export default function ProductGridList(props: CategoryGridProps){
    const [category, setCategory] = useState<string>(props.categories?.[0]);
    const [products, setProducts] = useState<ProductModel[]>([])

    useEffect(() => {
        getProductsByCategory(category).then(res => setProducts(res));
    }, [category]) 

    console.log(props.categories);
    return (
        <div className={props.className}>
            <List 
                headers={props.categories || []} 
                onChange={async (selected, event) => setCategory(selected)}
                selected={props.categories?.[0]}/>
            <div className="px-10 py-5">
                <ProductGrid products={products || []} />
            </div>
            <div className="mx-auto pb-5 justify-center flex">
                <Link passHref href={`/product/category/${category}`} >
                    <div className="shadow-2xl rounded-2xl p-1 px-3 text-white text-center bg-black bg-opacity-20 hover:shadow-inner hover:bg-opacity-30 cursor-pointer">
                        <span className="font-light">Show More</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

let getProductsByCategory = async (category: string) => {
    let products = await api.get<ProductModel[]>(`/product?category=${category}`);
    return products;
}
