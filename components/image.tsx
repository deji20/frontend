import { Picture } from "../models/models";
import NextImage from "next/image";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useSpring, animated, useTransition, config} from "react-spring";


interface ImageProps{
    imgClass?: string;
    className?: string;
    pictures?: Picture[] | string[];
    local?: boolean;
    autoScroll?: boolean | number;
    clickScroll?: boolean;
    onClick?: MouseEventHandler;
}


export default function Image(props: ImageProps){
    const [imageNr, setImageNr] = useState(0)
    const [image, setImage] = useState(
        props.pictures?.[imageNr] ? 
        getImage(props.pictures?.[imageNr]) :
        getImage("/api/icons/blankImage.svg") 
        );
        
    function getImage(picture: Picture | string){
        if(typeof picture === "string"){
            const img = picture as string
            return <NextImage unoptimized src={img} alt={"icon"} className={props.imgClass} width={1000} height={1000} layout="intrinsic"/>
        }else{
            const img = picture as Picture;
            return <NextImage unoptimized src={img.path} alt={img.alt || "failed to load picture"} className={props.imgClass} width={img.ratio.x} height={img.ratio.y} layout="responsive"/>
        }
    };

    const scroll = useTransition(image, {
        initial: {left: "0%"},
        from: {left: "100%", transform: 'translate3d(100%,0,0)' },
        enter: {left: "0%", transform: 'translate3d(0%,0,0)' },
        leave: {position: "absolute"},
        config:{mass:20, tension:1000, friction:200, clamp:false}
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
                            }}>        
                        </div>
                    )
                })}
            </div>
            <div className=" whitespace-nowrap overflow-hidden w-full h-full">
                {scroll((style, image) => (
                        <div className="relative h-full w-full">
                            <animated.div style={style} className="relative m-auto block h-full w-full">
                                {image}
                            </animated.div> 
                        </div>
                ))}
            </div>
        </div>
    )
}