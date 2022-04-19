import useSWR from "swr"
import api from "../../api"
import { ProductModel } from "../../models/models"
import Product from "../products/product"

interface ScollProps{
    category: string
}

export default function CategoryScroll(props: ScollProps){ 
    const {data: products, error} = useSWR<ProductModel[]>(`/product?filter=categories=${props.category}`, (key) => api.get<ProductModel[]>(key))
    console.log(products);
    return (
        <div className="flex flex-col w-full px-4">
            <h2 className="text-white text-2xl">{props.category}</h2>
            <div className="w-full inline-block whitespace-nowrap overflow-x-auto text-white relative">
                <div className="absolute flex w-10 h-full z-50"></div>
                {products?.map((product, index) => <Product key={index} className="w-24 p-2 inline-block overflow-x-none" product={product}/>)}
            </div>
        </div>
    )
}