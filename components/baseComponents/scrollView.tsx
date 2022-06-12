import { Children, MouseEvent, useEffect, useRef, useState } from "react";
import Image from "../image";

interface ScrollProps{
    children: JSX.Element[];
}

export default function ScrollView(props: ScrollProps){
    const [step, setStep] = useState(0);
                
    return (
        <div className="flex flex-col flex-grow justify-center pt-24 bg-[#60a5fa]">
            <div className="flex justify-center gap-5 w-full p-5">
                {props.children.map((o, i) => {
                    return (<div key={i} onClick={() => setStep(i)} className={`p-[6px] w-min rounded-full bg-white transition-all duration-500 bg-opacity-10 hover:bg-opacity-20 ${step == i ? "bg-opacity-50" : ""}`}></div>)
                })}
            </div>
            <div className='w-5/6 justify-center mx-auto'>
                {props.children[step]}
            </div>
            <div className='m-10 justify-center gap-4 p-5 flex text-gray-300'>
                {step > 0 && <button 
                onClick={() => setStep((step - 1) % props.children.length)}
                className='bg-blue-800 bg-opacity-70 text-gray-300 hover:text-white shadow-2xl hover:shadow-inner rounded-full p-2'>
                    <Image className="w-6 h-6 -rotate-90" local pictures={["/assets/icons/arrow-white.svg"]}/>
                </button>}
                {(step + 1 < props.children.length) && <button 
                onClick={() => setStep((step + 1) % props.children.length)}
                className='bg-green-800 bg-opacity-70 text-gray-300 hover:text-white shadow-2xl hover:shadow-inner rounded-full p-2'>
                    <Image className="w-6 h-6 rotate-90" local pictures={["/assets/icons/arrow-white.svg"]}/>
                </button>}
            </div>
        </div>
    )}