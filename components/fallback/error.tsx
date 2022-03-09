interface ErrorProps{
    message?: string,
    className?: string
}

export default function Error(props: ErrorProps){
    return (
        <div className={`flex flex-grow justify-center align-middle bg-gray-800 overflow-hidden ${props.className}`}>
            <p>{props.message}</p>
        </div>
    )
}