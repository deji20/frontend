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
        <div className={`text-white flex flex-col ${props.className}`}>
            <div>
                <table className="w-full">
                    <thead className="text-center text-sm tracking-wider">
                        <tr className=" bg-black bg-opacity-75 border-white font-light border-opacity-25">
                            <th className="px-10 py-5"></th>
                            <th className="border-r border-white border-opacity-25 px-4">Navn</th>
                            <th className="border-r border-white border-opacity-25 px-4">Mængde</th>
                            <th className="px-4">Pris</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light text-gray-200 text-center">
                        {
                        props.products.map((line, i) => {
                            return (
                                    <tr key={i} className="border-b bg-black bg-opacity-50 border-white border-opacity-25 last:border-none">
                                        <td>
                                            <a href={`/product/${line.product.id}`}>
                                                <Image pictures={line.product.version[0].pictures}/>
                                            </a>
                                        </td>
                                        <td className="px-1 border-r border-white border-opacity-25">{line.product.name}</td>
                                        <td className="text-center border-r border-white border-opacity-25">{line.amount}</td>
                                        <td className="text-center">{line.product.price * line.amount}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex flex-row flex-grow"></div>
            <div className="p-1 px-3 flex rounded-b justify-between bg-black bg-opacity-60">
                <span className="tracking-widest text-lg"> Total: </span> 
                <p className="tracking-wide text-lg">{props.products.reduce<number>((prev, cur) => prev += cur.product.price * cur.amount, 0)}<sub>kr</sub></p>
            </div>
        </div>
    )
}