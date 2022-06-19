import { Picture } from "../models/models";
import NextImage from "next/image";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useSpring, animated, useTransition} from "react-spring";
import config from "../config"


interface ImageProps{
    imgClass?: string;
    className?: string;
    pictures?: Picture[] | string[];
    local?: boolean;
    autoScroll?: boolean | number;
    onScroll?: (index: number) => void; 
    clickScroll?: boolean;
    onClick?: MouseEventHandler;
}


export default function Image(props: ImageProps){
    const [imageNr, setImageNr] = useState(0)
    const [image, setImage] = useState(
        props.pictures?.[imageNr] ? 
        getImage(props.pictures?.[imageNr]) :
        getImage("/icons/blankImage.svg") 
        );
        
    function getImage(picture: Picture | string){
        if(picture){
            if(typeof picture === "string"){
                const img = !props.local ? config.imageApi + picture : picture as string
                return <NextImage src={img} alt={"icon"} blurDataURL="/assets/loading.svg" className={props.imgClass} width={1000} height={1000} layout="intrinsic"/>
            }else{
                const img = picture as Picture;
                return <NextImage src={!props.local ? config.imageApi + img.path : config.api + img.path} alt={img.alt || "failed to load picture"} className={props.imgClass} blurDataURL="/assets/loading.svg" width={img.ratio.x} height={img.ratio.y} layout="responsive"/>
            }
        }
    };

    const scroll = useTransition(image, {
        initial: {left: "0%"},
        from: {left: "100%", transform: 'translate3d(100%,0,0)' },
        enter: {left: "0%", transform: 'translate3d(0%,0,0)' },
        leave: {position: "absolute"},
        config:{mass:60, tension:1000, friction:300, clamp:true}
    });

    useEffect(() => {
        props.pictures?.[imageNr] && setImage(getImage(props.pictures?.[imageNr]));
    }, [imageNr])

    //if auto scroll 
    useEffect(() => {
        if(props.autoScroll && props.pictures && props.pictures.length > 1){
            let i = 0;
            setInterval(() => {
                    if(props.pictures) i = (i+1) % props.pictures.length
                    setImageNr(i);
                    props.onScroll && props.onScroll(i)
                }, Number.isInteger(props.autoScroll) ? Number.parseInt(props.autoScroll.toString()) : 5000)
        };
    }, []);
        
    return (
        <div className={`relative ${props.onClick && "cursor-pointer"} ${props.className}`} >
            <div className={`absolute bottom-3 w-full flex flex-row justify-center overflow-hidden`}>
                {props.clickScroll &&
                props.pictures && props.pictures.length > 1 && props.pictures.map((image, i) => {
                    return (
                        <div key={i} 
                            className="z-10 mix-blend-difference h-3 w-3 drop-shadow-2xl mx-1 rounded-full bg-opacity-50 bg-white hover:bg-opacity-100" 
                            onClick={(e) => {
                                e.preventDefault()
                                setImageNr(i);
                                props.onScroll && props.onScroll(i)
                            }}>        
                        </div>
                    )
                })}
            </div>
            <div className=" whitespace-nowrap overflow-hidden w-full h-full">
                {props.pictures && props.pictures?.length > 1 ? scroll((style, image) => (
                        <div className="relative h-full w-full">
                            <animated.div style={style} className="relative m-auto block h-full w-full">
                                {image}
                            </animated.div> 
                        </div>
                )) : image}
            </div>
        </div>
    )
}