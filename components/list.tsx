import { Component, MouseEvent, ReactElement, useState } from "react";
import Link from "next/link";


interface ListProps{
    headers: string[];
    selected: string;
    onChange?: (selected:string, event: MouseEvent) => void;
};

interface ListState{
    selected: string;
    items: ReactElement[];
}

export default function List(props: ListProps){
    const [selected, changeSelected] = useState(props.selected);

    return(
        <ul className="grid grid-flow-col shadow-xl text-gray-200 bg-black bg-opacity-30 overflow-y-hidden overflow-x-auto z-40" >
            {props.headers.map((header) => {
                return (
                    <li className="flex flex-grow justify-center min-w-[5rem] text-center border-l border-r py-1 border-white hover:opacity-100 opacity-60 border-opacity-40 cursor-pointer tracking-wider transform duration-300" 
                        key={header}
                        onClick={(event) => {
                            changeSelected(header)
                            let item = (event.target as HTMLLIElement)
                            props.onChange && props.onChange(item.innerText, event);
                        }}>
                        <span className={"text-sm tracking-wider" + ((selected === header && "opacity-90") || "opacity-40")}>{header}</span>
                    </li>)
            })}
        </ul>
    )
}