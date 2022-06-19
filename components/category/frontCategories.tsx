import { Component, Fragment, useEffect, useState, version } from "react";
import Img from "../image";
import Link from "next/link";
import axios from "axios";
import api from "../../api";
import { Picture } from "../../models/models";
import useSWR from "swr";
import Loading from "../fallback/loading";
import Error from "../fallback/error";
import FallBack from "../fallback/fallback";

interface CategoryProps{
    name: string;
    className?: string;
    href: string;
}


async function getPictures (category: string){
    const result = await api.get<{ 
        name: string,
        price: string,
        version: { 
            pictures: Picture[] 
        }[] 
    }[]>(`/product?filter=categories=${category}&projection=version.pictures,name,price`);

    return (
        result.flatMap(
            product => product.version.flatMap(
                version => 
                    version.pictures.flatMap(picture => ({ 
                    name: product.name, 
                    price: product.price, 
                    pic: picture
                }))
            )
        )
    )
}
export default function FrontCategories(props: CategoryProps){
    const {data: pictures, error} = useSWR<{name: string, price: string, pic: Picture}[]>(props.name, getPictures)
    console.log(pictures);

    return(
        <Link href={props.href} passHref>
            <a>
                <div className={`relative rounded cursor-pointer flex flex-row bg-[#60a5fa] shadow-2xl ${props.className}`} >
                        <div className="z-50 absolute top-1/2 w-full flex justify-center">
                            <div className="w-full  p-1 mx-4 rounded-lg shadow-2xl">
                                <div className="text-center capitalize font-light text-white text-3xl tracking-widest px-2">
                                    <span className="w-min p-2 px-4 rounded-xl bg-black bg-opacity-50">
                                        {props.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <FallBack data={pictures} error={error}>
                            <div className="absolute h-full w-full">
                                <div className="w-full absolute opacity-70 blur-sm">
                                    <Img autoScroll={3000 + (Math.random() * 20000)} className="border rounded" pictures={pictures?.map(pic => pic.pic)} />
                                </div>
                                <div className="w-full absolute opacity-70 bottom-0 blur-sm">
                                    <Img autoScroll={3000 + (Math.random() * 20000)} className="border rounded" pictures={pictures?.map(pic => pic.pic)} />
                                </div>
                            </div>
                            <div className="w-full scale-95 place-self-center">
                                <Img autoScroll={3000 + (Math.random() * 20000)} className="rounded" pictures={pictures?.map(pic => pic.pic)} />
                            </div>
                        </FallBack>
                    </div>
            </a>
        </Link>
    )
}