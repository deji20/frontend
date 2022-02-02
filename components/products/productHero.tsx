import FrontCategories from "../frontCategories";
import { ProductModel } from "../../models/models";
import { useEffect, useState } from "react";
import Api from "../../api";

interface ProductHeroProps{
    products?: ProductModel[];
}

export default function ProductHero(props: ProductHeroProps){
    const [categories, setCategories] = useState<string[]>([])
    useEffect(() => {
        Api.get<string[]>("/category").then(res => {
            setCategories(res)
        })
    }, []);
    
    return (
        <div className="flex flex-row w-full justify-evenly p-10 pt-20 bg-gray-800">
            { categories.map((category, i) => <FrontCategories key={i} className='h-[15rem] w-20 sm:h-[25rem] md:h-[35rem] sm:w-40 md:w-52 lg:w-80' name={category} href={`/${category}`}/>) }
        </div>
    )
}