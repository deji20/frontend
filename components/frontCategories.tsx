import { Component, useEffect, useState, version } from "react";
import Img from "./image";
import Link from "next/link";
import axios from "axios";
import api from "../api";
import { Picture } from "../models/models";

interface CategoryProps{
    name: string;
    className?: string;
    href: string;
}

export default function FrontCategories(props: CategoryProps){
    const [pictures, setPictures] = useState<Picture[]>()
    useEffect(() => {
        getPictures()
    }, [])
    
    function getPictures(){
        api.get<{ version: { pictures: Picture[] } [] } []>(`/product?filter=categories=${props.name}&projection=version.pictures`).then((res) => {
            if(res) {
                let pictures = res.flatMap(version => version.version.flatMap(ver => ver.pictures))
                setPictures(pictures);
            }
        });
    }

    return(
        <Link href={props.href} passHref>
            <a>
                <div className={"relative rounded cursor-pointer flex flex-row bg-gray-600 shadow-2xl " + props.className} onClick={getPictures}>
                        <div className="z-50 absolute top-1/2 w-full flex justify-center">
                            <div className="w-full bg-black bg-opacity-50 p-1 mx-2">
                                <h1 className="text-center capitalize font-thin text-white text-3xl tracking-widest w-full">
                                    {props.name}
                                </h1>
                            </div>
                        </div>
                        <div className="absolute h-full w-full">
                            <div className="w-full absolute opacity-70 blur-sm">
                                <Img className="border rounded" pictures={pictures} />
                            </div>
                            <div className="w-full absolute opacity-70 bottom-0 blur-sm">
                                <Img className="border rounded" pictures={pictures} />
                            </div>
                        </div>
                        <div className="w-full place-self-center">
                            <Img className="border rounded" pictures={pictures} />
                        </div>
                    </div>
            </a>
        </Link>
    )
}