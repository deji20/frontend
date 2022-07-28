import Link from 'next/link'
import Img from "../image";
import PredictInput from "../utilityComponent/predict";
import api from "../../api";
import { ProductModel } from "../../models/models";
import Pricetag from "../pricetag";
import { useState } from 'react';

interface SearchBarProps{
    className?: string;
}

export default function SearchProducts(props: SearchBarProps){
    const [products, setProducts] = useState<ProductModel[]>([]);

    return (
            <div className='w-1/2 h-1/2 m-auto'>

                <PredictInput  
                    placeholder="Search" 
                    className={"bg-white bg-opacity-20 text-white w-full h-10 flex flex-grow tracking-widest " + props.className}
                    onClick={(e) => e.preventDefault()}
                    predictFunc={async (search) => {
                        let result = await api.get<ProductModel[]>(`/product?search=name=${search}`)
                        setProducts(result)
                    }}/>
                <div className='bg-white flex w-full h-full flex-col'>
                    { products.map(result => (
                        <Link href={`/product/${result.id}`}>
                                <div className="
                                    cursor-pointer place-items-center border-b font-light border-gray-500 bg-black bg-opacity-10 overflow-x-hidden
                                    flex flex-row justify-between
                                ">
                                    <div className="min-w-[5rem]">
                                        <Img className="w-full" pictures={result.version[0].pictures}/>
                                    </div>
                                    <div className="">
                                        {result.name}
                                    </div>
                                    <div className="">
                                        <Pricetag className="text-black" price={result.price}/>
                                    </div>
                                </div>
                        </Link>
                    ))}
                </div>
            </div>
        // listItemFunc={(result: ProductModel) => {
        //     return (
        //         <Link href={`/product/${result.id}`} passHref>
        //             <a>
        //                 <div className="grid grid-cols-12 place-items-center p-1 border-b font-thin border-gray-500 bg-gray-800 overflow-x-hidden">
        //                     <div className="col-span-1 w-full">
        //                         <div className="max-w-[3rem]">
        //                             <Img className="w-full h-full" pictures={result.version[0].pictures}/>
        //                         </div>
        //                     </div>
        //                     <div className="col-span-5">
        //                         {result.name}
        //                     </div>
        //                     <div className="col-span-5">
        //                         <Pricetag price={result.price}/>
        //                     </div>
        //                 </div>
        //             </a>
        //         </Link>
        //         )
        // }}
    )
}