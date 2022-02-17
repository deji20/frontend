import FrontCategories from "../frontCategories";
import { ProductModel } from "../../models/models";
import api from "../../api";
import useSWR from "swr";

interface ProductHeroProps{
    products?: ProductModel[];
}

export default function ProductHero(props: ProductHeroProps){
    let {data: categories, error} = useSWR<string[]>("/category", (cat) => api.get<string[]>(cat));
    if(error) return <p>{error.toString()}</p>;
    if(!error && !categories) return <p>Loading</p>
    return (
        <div className="flex flex-row w-full justify-evenly p-10 pt-20 bg-gray-800">
            {categories && categories.map((category, i) => <FrontCategories key={i} className='h-[15rem] w-20 sm:h-[25rem] md:h-[35rem] sm:w-40 md:w-52 lg:w-80' name={category} href={`/${category}`}/>) } 
        </div>
    )
}