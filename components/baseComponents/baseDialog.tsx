import { MouseEvent, useEffect, useRef } from "react";

interface DialogProps{
    children: any;
    darken?: boolean;
    onSubmit?: (event: FormDataEvent) => void;
    onClose: (event: MouseEvent) => void;
}

export default function Dialog(props: DialogProps){
    //create a reference for the dialog wrapper 
    let dialogRef = useRef(null)

    //the dialog element
    let dialog = (
        <div ref={dialogRef} className="flex m-auto justify-center rounded-2xl shadow-2xl align-middle w-2/5 opacity-0 scale-0 duration-1000 transition-all">
            {props.children}
        </div>
    );

    function close(e:MouseEvent){
        if((e.target as HTMLElement).className.includes("dialogClose")){
            props.onClose(e);
        }
    }

    //visual effects that make the component pop onto screen using tailwind animation
    useEffect(() => {
        if(dialogRef.current){
            const elem = dialogRef.current as HTMLDivElement;
            elem.className = elem.className.replace("opacity-0", "opacity-100")
            elem.className = elem.className.replace("scale-0", "scale-100")
            
            return () => {
                elem.className = elem.className.replace("opacity-100", "opacity-0")
                elem.className = elem.className.replace("scale-100", "scale-0")
            }
        }
    });

    return (
        <div onClick={close} className={(props.darken && "bg-black bg-opacity-50") + " fixed top-0 flex flex-col justify-center align-middle z-50  h-screen w-screen dialogClose"}>
            {dialog}
        </div>
    )
}
