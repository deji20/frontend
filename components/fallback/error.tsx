interface ErrorProps{
    message?: string,
    className?: string
}

export default function Error(props: ErrorProps){
    return (
        <div className={`w-full h-full flex flex-grow justify-center align-middle`}>
            <p className={`m-auto max-w-prose bg-opacity-20 text-red-800 shadow-xl bg-white p-2 rounded-xl ${props.className}`}>{props.message?.toString()}</p>
        </div>
    )
}