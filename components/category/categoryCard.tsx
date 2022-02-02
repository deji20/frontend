import { Component, ReactElement } from "react";
import Img from "../image";
import Link from "next/link";
import { ProductModel } from "../../models/models";
import OffsetButton from "../utilityComponent/offsetButton";
import CategoryPage from "../../pages/product/category/[category]";
import FrontCategories from "../frontCategories";

export default function CategoryCard(props: {category: string}){  

    return (
            <div>
                <Link href={`/product/category/${props.category}`} passHref>
                    <FrontCategories className='h-[25rem] w-80 m-5' name={props.category}/>
                </Link>
            </div>
    )
    /*
    return (
        <Link href={`/product/category/${props.category}`} passHref>
            <div className="flex flex-col shadow-2xl hover:shadow-inner cursor-pointer m-5 rounded-b-lg">
                <Img className="" pictures={[]}/>
                <div className="bg-red-500 bg-opacity-10 w-full">
                    <div className=" bg-gray-100 bg-opacity-20 px-2">
                        <h2 className="text-l text-white">
                            {props.category}
                        </h2>
                    </div>
                    <div className="px-2">
                        <p className="text-xs text-white m-1 leading-6 min-w-[250px]">
                            {}
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-gray-600 bg-opacity-20">
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
    */
}