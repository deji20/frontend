import { Children, ReactElement } from "react";
import Image from "../image";
import Error from "./error";
import Loading from "./loading";

interface FallbackProps{
    error?: any
    data?: any
    className?: string;
    children?: ReactElement;

}

export default function FallBack(props: FallbackProps){
    if(props.error) return <Error key="error" className={props.className} message={props.error.toString()}/>;
    else if(!props.data) return <Loading key="loading" className={props.className}/>
    else return props.children || null;
}