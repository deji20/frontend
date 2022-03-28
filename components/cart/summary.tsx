import { useState } from "react";
import { ProductModel } from "../../models/models"
import Image from "../image";
import Pricetag from "../pricetag";

interface SummaryProps{
    products: {amount: number, product: ProductModel}[];
    className?: string;
}

export default function Summary(props: SummaryProps){
    return (
        <div className={`text-gray-300 flex flex-col ${props.className}`}>
            <div>
                <table className="w-full">
                    <thead className="text-center text-sm text-gray-300">
                        <tr className="border-b bg-white bg-opacity-20 border-gray-500">
                            <th className="px-10 py-5"></th>
                            <th className="border-r border-gray-500 px-4">Navn</th>
                            <th className="border-r border-gray-500 px-4">Mængde</th>
                            <th className="px-4">Pris</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light text-gray-300">
                        {
                        props.products.map((line) => {
                            return (
                                    <tr className="border-b border-gray-500 last:border-none">
                                        <td>
                                            <a href={`/product/${line.product._id}`}>
                                                <Image pictures={line.product.version[0].pictures}/>
                                            </a>
                                        </td>
                                        <td className="px-1 border-r border-gray-500">{line.product.name}</td>
                                        <td className="text-center border-r border-gray-500">{line.amount}</td>
                                        <td className="text-center">{line.product.price * line.amount}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex flex-row flex-grow"></div>
            <div className="p-1 px-3 flex justify-between bg-gray-900 bg-opacity-25">
                <span className="tracking-widest text-lg"> Total: </span> 
                <p className="tracking-wide text-lg">{props.products.reduce<number>((prev, cur) => prev += cur.product.price, 0)}<sub>kr</sub></p>
            </div>
        </div>
    )
}