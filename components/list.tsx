import { Component, MouseEvent, ReactElement, useState } from "react";
import Link from "next/link";


interface ListProps{
    headers: string[];
    selected: string;
    className?: string
    onChange?: (selected:string, event: MouseEvent) => void;
};

interface ListState{
    selected: string;
    items: ReactElement[];
}

export default function List(props: ListProps){
    const [selected, changeSelected] = useState(props.selected);

    return(
        <ul className={"grid grid-flow-col overflow-y-hidden overflow-x-auto z-40 " + props.className} >
            {props.headers.map((header) => {
                return (
                    <li className={
                            (header === selected ? "opacity-100" : "opacity-60") + 
                            " flex flex-grow justify-center min-w-[5rem] text-center border-l border-r py-1 border-white border-opacity-40 cursor-pointer tracking-wider transform duration-300"} 
                        key={header}
                        onClick={(event) => {
                            changeSelected(header)
                            let item = (event.target as HTMLLIElement)
                            props.onChange && props.onChange(item.innerText, event);
                        }}>
                        <span className={"tracking-wider m-auto"}>{header}</span>
                    </li>)
            })}
        </ul>
    )
}