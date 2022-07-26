import { KeyboardEventHandler, MouseEventHandler, ReactElement, useEffect, useRef, useState } from "react";
import Img from "../image";

interface PredictProps{
    children?: JSX.Element
    predictFunc:  (searchText: string) => any | Promise<any[]>;
    placeholder?: string;
    className?: string;
    dropdown?: (model: any) => ReactElement
    onClick?: MouseEventHandler<HTMLLIElement>;
    onEnter?: KeyboardEventHandler<HTMLInputElement>;
    ref?: any;

}

export default function PredictInput(props: PredictProps){
    const inputRef = useRef();
    const [results, setResults] = useState<string[]>([])
    const [visible, isVisible] = useState(false); 


    let timeOutId: any;
    const onBlurHandler = () => {
        timeOutId = setTimeout(() => {
            isVisible(false);
          });
    }
    const onFocusHandler = () => {
        clearTimeout(timeOutId);
    }

    let dropdown = (
        <div className="w-7 h-7 rounded-full bg-opacity-50 m-auto">
            <Img className={`transform transition-all duration-500 ${visible && results.length > 0 ? "-" : ""}rotate-180`} local={true} pictures={["/assets/icons/arrow-white.svg"]}/>
        </div>)
    return(
        <div className={`flex flex-col align-middle flex-grow ${props.className}`} onBlur={onBlurHandler} onFocus={onFocusHandler}>
            <div className={`relative flex flex-grow place-items-center`}>
                <input type="text" className={`p-1 px-3  h-full w-full bg-transparent`} placeholder={props.placeholder}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault();
                            isVisible(false)
                            props.onEnter && props.onEnter(e)
                        }
                    }} 
                    onChange={async (event) => {
                        const results = await props.predictFunc(event.target.value)
                        if(props.dropdown){ 
                            isVisible(true);
                            setResults(results)
                        }
                    }
                }/>
                {props.dropdown && 
                    (<div className="w-7 h-7 rounded-full bg-opacity-50 m-auto">
                        <Img className={`transform transition-all duration-500 ${visible && results.length > 0 ? "-" : ""}rotate-180`} local={true} pictures={["/assets/icons/arrow-white.svg"]}/>
                    </div>
                )}
            </div>
            {props.dropdown && (
                <div className="relative w-full z-50">
                    <ul className="absolute w-full max-h-80 overflow-y-auto overflow-x-hidden">
                        {visible && results.map((res, i) => {
                            return (
                                <li key={i} className="text-white text-bold tracking-widest cursor-pointer transition-all duration-200 hover:scale-x-[99%]" 
                                onClick={ (event) => {
                                    props.onClick && props.onClick(event)
                                }}>
                                    {props.dropdown && props.dropdown(res)}
                                </li>)
                        })}
                    </ul>
                </div>
            )}
        </div>
    )

}