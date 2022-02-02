interface ButtonProps{
    onClick?: () => void;
    className?: string;
    children?: any;
}

export default function OffsetButton(props: ButtonProps){
    return(

        <button className={"absolute flex -bottom-4 -right-4 h-10  rounded-br-lg rounded-tl-lg shadow-xl w-36 cursor-pointer text-white " + props.className} onClick={props.onClick}>
                <div className="w-full h-full flex justify-center place-items-center align-middle text-center">
                    {props.children}
                </div>
        </button>
    )
}