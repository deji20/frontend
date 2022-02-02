import { Component, ReactElement, useEffect, useState } from "react";
import { ProductModel } from "../../models/models";
import List from "../list";
import ProductGrid from "./productGrid";
import Product from "./product";
import axios from "axios";
import Link from "next/link";

const PUBLIC_API = process.env.NEXT_PUBLIC_API;

type CategoryGridProps = {
    categories: string[];
    categoryProducts: ProductModel[];
    className?: string;
}

export default function ProductCategoriesGrid(props: CategoryGridProps){
    const [category, setCategory] = useState(props.categories[0]);
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        (async () => {
            let products = await getProductsByCategory(category)
            setProducts(products);
        })()
    }, [category]);
    
    return (
        <div className={props.className}>
            <List headers={props.categories} onChange={async (selected, event) => {
                setCategory(selected);
            }} 
            selected={props.categories[0]}/>
            <div className="px-10">
                <ProductGrid products={products} />
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
    let products = await axios.get<ProductModel[]>(PUBLIC_API + `/product?filter=categories=${category}`);
    console.log(products.data);
    return products.data;
}

/*
import { Component, ReactElement, useEffect, useState } from "react";
import { ProductModel } from "../../models/models";
import List from "../list";
import ProductGrid from "./productGrid";
import Product from "./product";
import axios from "axios";
import Link from "next/link";

const PUBLIC_API = process.env.NEXT_PUBLIC_API;

interface GridProps{
    categories: string[];
    categoryProducts: ProductModel[];
}

interface GridState{
    category: string;
    products: ProductModel[];
}

export default class ProductCategoriesGrid extends Component<GridProps, GridState>{
    constructor(props: GridProps){
        super(props);
        this.state = {
            category: props.categories[0],
            products: []
        }
    }
    async componentDidMount(){
        console.log("how often does it mount?")
        this.setState({
            products: await getProductsByCategory(this.state.category)
        })
    }

    render(){
        return (
            <div className="bg-gray-900">
                <List 
                    headers={this.props.categories} 
                    onChange={async (selected, event) => {
                        this.setState({
                            category: selected,
                            products: await getProductsByCategory(selected),
                        });
                    }}
                selected={this.props.categories[0]}/>
                <div className="px-10">
                    <ProductGrid products={this.state.products} />
                </div>
            </div>
        )
    }
}

let getProductsByCategory = async (category: string) => {
    let products = await axios.get<ProductModel[]>(PUBLIC_API + `/product?filter=categories=${category}`);
    return products.data;
}
*/