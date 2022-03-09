import { Picture } from "../models/models";
import NextImage from "next/image";
import { MouseEventHandler, useState } from "react";
import { imageConfigDefault } from "next/dist/server/image-config";

interface ImageProps{
    className?: string;
    pictures?: Picture[] | string[];
    local?: boolean;
    multiple?: boolean;
    onClick?: MouseEventHandler;
}

export default function Image(props: ImageProps){
    const [imageNr, setImage] = useState(0)

    const fallBack = (img: any) => {
        img.target.src = `/api/icons/blankImage.svg`;
    }

    //changes image styling depending on if it uses the default blank image or not
    let image;
    if(props.pictures && props.pictures?.length > 0){
        if(typeof props.pictures[imageNr] === "string"){
            const img = props.pictures[imageNr] as string
            image = (
                <NextImage unoptimized={true} 
                    src={img} 
                    alt={"icon"} 
                    className={"place-self-center max-h-full"} 
                    width={1} height={1} layout="responsive" 
                    onClick={props.onClick}/>
                    )}
        else {
            const img = props.pictures[imageNr] as Picture
            image = (
                <NextImage unoptimized={true} 
                    src={img.path} 
                    alt={img.alt} 
                    className={"place-self-center max-h-full"} 
                    width={1} height={1} layout="responsive" 
                    onClick={props.onClick}/>
            )}
    }
    else {
        image = (
            <NextImage unoptimized={true} 
                src={`/api/icons/blankImage.svg`} 
                alt={"Not Found"} 
                className={"place-self-center h-1/6"} 
                width={1} height={1} layout="responsive" 
                onClick={props.onClick}/>
        )}

    return (
        <div className={`relative ${props.onClick && "cursor-pointer"} ${props.className}`} >
            <div className={`absolute bottom-3 w-full flex flex-row justify-center`}>
                {props.multiple && props.pictures && props.pictures.length > 1 && props.pictures.map((image, i) => {
                    return (
                        <div key={i} className="z-10 mix-blend-difference h-3 w-3 drop-shadow-2xl mx-1 rounded-full bg-opacity-50 bg-blue-800 hover:bg-opacity-100" 
                            onClick={(e) => {
                                e.preventDefault()
                                setImage(i);
                            }
                            }>
                        </div>)
                })}
            </div>
            {image}
        </div>
    )
}