import { EventHandler, useState } from "react";

interface ScrollProps{
    amount: number;
    onChange?: (event: ScrollEvent) => void;
}

interface ScrollEvent{
    focused: number;
}

export default function DotScroll(props: ScrollProps){
    const [focused, changeFocus] = useState(0);
    let dots = []

    //changes focus to clicked dot and executes callback
    function change(seq: number){
        let event: ScrollEvent = {
            focused: seq
        }
        changeFocus(seq);
        props.onChange && props.onChange(event);
    }

    //creates an array of dots specified in the properties 
    for(let i = 0; i < props.amount; i++){
        let dot = (
            <div className={((i === focused && " bg-white bg-opacity-80") || " bg-gray-500 bg-opacity-20") + " rounded-full p-2 mx-1 hover:opacity-90"} 
                onClick={() => change(i)} />
        )
        dots.push(dot);
    }

    return (
        <ul className="absolute bottom-0 w-full flex justify-center mb-2">
            {dots}
        </ul>
    )
}