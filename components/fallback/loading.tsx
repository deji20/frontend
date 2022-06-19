import Image from "../image";

interface LoadingProps{
    className?: string;
}

export default function Loading(props: LoadingProps){
    return (
        <div className="flex relative h-full w-full">
            <div id="" className={`m-auto self-center h-20 w-20 ${props.className}`}><Image pictures={["/assets/loading.svg"]}/></div>
        </div>)
}