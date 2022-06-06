import Link from 'next/link'
import Img from "../image";
import PredictInput from "../utilityComponent/predict";
import api from "../../api";
import { ProductModel } from "../../models/models";
import Pricetag from "../pricetag";

interface SearchBarProps{
    className?: string;
}

export default function SearchBar(props: SearchBarProps){
    return (
        <PredictInput  
            placeholder="Search" 
            className="px-3 bg-dark text-white w-full flex flex-grow tracking-widest"
            onClick={(e) => e.preventDefault()}
            listItemFunc={(result: ProductModel) => {
                return (
                    <Link href={`/product/${result.id}`} passHref>
                        <a>
                            <div className="grid grid-cols-12 place-items-center p-1 border-b font-thin border-gray-500 bg-gray-800 overflow-x-hidden">
                                <div className="col-span-1 w-full">
                                    <div className="max-w-[3rem]">
                                        <Img className="w-full h-full" pictures={result.version[0].pictures}/>
                                    </div>
                                </div>
                                <div className="col-span-5">
                                    {result.name}
                                </div>
                                <div className="col-span-5">
                                    <Pricetag price={result.price}/>
                                </div>
                            </div>
                        </a>
                    </Link>
                    )
            }}
            predictFunc={async (search) => {
                let result = await api.get<ProductModel[]>(`/product?search=name=${search}`)
                return result;
        }}/>
    )
}