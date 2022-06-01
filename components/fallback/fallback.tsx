import Error from "next/error";
import { Children, Fragment, ReactElement } from "react";
import Image from "../image";
import ErrorMessage from "./error";
import Loading from "./loading";

interface FallbackProps{
    error?: any
    data?: any
    className?: string;
    children?: ReactElement[] | ReactElement;

}

export default function FallBack(props: FallbackProps){
    if(props.error) return <ErrorMessage key="error" className={props.className} message={props.error.toString()}/>;
    else if(!props.data) return <Loading key="loading" className={props.className}/>
    else return <Fragment>{props.children}</Fragment>;
}