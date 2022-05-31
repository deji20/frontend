import { Component, ReactElement, useEffect, useState } from "react";
import { ProductModel } from "../../models/models";
import List from "../list";
import ProductGrid from "./productGrid";
import Product from "./product";
import axios from "axios";
import Link from "next/link";
import api from "../../api";
import useSWR, { useSWRConfig } from "swr";

type CategoryGridProps = {
    categories: string[];
    className?: string;
}

export default function ProductGridList(props: CategoryGridProps){
    const [category, setCategory] = useState<string>(props.categories?.[0]);
    const {data:products, error} = useSWR(`/product?search=categories=${category}`,  (key) => api.get<ProductModel[]>(key))
    const {mutate} = useSWRConfig();

    useEffect(() => {
        mutate(category);
    }, [category]) 
    
    return (
        <div className={props.className}>
            {(typeof props.categories !== "string" && props.categories) && <List 
                headers={props.categories || []} 
                onChange={async (selected, event) => setCategory(selected)}
                selected={props.categories?.[0]}
                className="h-12 bg-white bg-opacity-10 text-white"/>}
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
