import { Component, useEffect, useState, version } from "react";
import Img from "./image";
import Link from "next/link";
import axios from "axios";
import api from "../api";
import { Picture } from "../models/models";
import useSWR from "swr";

interface CategoryProps{
    name: string;
    className?: string;
    href: string;
}


async function getPictures (category: string){
    const result = await api.get<{ version: { pictures: Picture[] } [] } []>(`/product?filter=categories=${category}&projection=version.pictures`);
    return result.flatMap(version => version.version.flatMap(ver => ver.pictures));
}

export default function FrontCategories(props: CategoryProps){
    const {data: pictures, error} = useSWR<Picture[]>(props.name, getPictures)
    return(
        <Link href={props.href} passHref>
            <a>
                <div className={`relative rounded cursor-pointer flex flex-row bg-gray-600 shadow-2xl ${props.className}`} >
                        <div className="z-50 absolute top-1/2 w-full flex justify-center">
                            <div className="w-full bg-black bg-opacity-50 p-1 mx-4 rounded-lg shadow-2xl">
                                <h1 className="text-center capitalize font-thin text-white text-3xl tracking-widest w-full">
                                    {props.name}
                                </h1>
                            </div>
                        </div>
                        <div className="absolute h-full w-full">
                            <div className="w-full absolute opacity-70 blur-sm">
                                <Img autoScroll={3000 + (Math.random() * 20000)} className="border rounded" pictures={pictures} />
                            </div>
                            <div className="w-full absolute opacity-70 bottom-0 blur-sm">
                                <Img autoScroll={3000 + (Math.random() * 20000)} className="border rounded" pictures={pictures} />
                            </div>
                        </div>
                        <div className="w-full scale-95 place-self-center">
                            <Img autoScroll={3000 + (Math.random() * 20000)} className="rounded" pictures={pictures} />
                        </div>
                    </div>
            </a>
        </Link>
    )
}