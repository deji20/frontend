import Image from "../image";

interface LoadingProps{
    className?: string;
}

export default function Loading(props: LoadingProps){
    return <div id="" className={`h-20 w-20 ${props.className}`}><Image pictures={["/assets/loading.svg"]}/></div>
}