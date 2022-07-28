import { ReactElement, useState } from "react"


export default function UseDialog(element: ReactElement, className?: string): [JSX.Element, () => void]{
    const [visible, setVisibility] = useState<boolean>(false);

    const display = (
            <div 
                className={"fixed w-screen h-screen bg-black bg-opacity-20 m-auto z-[100] " + (visible ? "flex" : "hidden")}
                onClick={(e) => e.currentTarget == e.target && setVisibility(!visible)}>
                    {element}
            </div>)
    
    const toggle = () => {setVisibility(!visible)}; 
    return [display, toggle];
}