import { ReactElement, useState } from "react"


export default function UseDialog(element: ReactElement): [JSX.Element, () => void]{
    const [visible, setVisibility] = useState<boolean>(false);

    const display = (
            <section 
                className={"fixed w-screen h-screen bg-black bg-opacity-20 m-auto z-[100] " + (visible ? "flex" : "hidden")}
                onClick={() => setVisibility(!visible)}>
                <div className="m-auto w-1/2 h-1/2 bg-white">
                    {element}
                </div>
            </section>)
    
    const toggle = () => {setVisibility(!visible)}; 
    return [display, toggle];
}