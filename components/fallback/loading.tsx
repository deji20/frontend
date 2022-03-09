interface LoadingProps{
    message?: string,
    className?: string,
}

export default function Loading(props: LoadingProps){
    return (
        <div className={`flex flex-grow justify-center align-middle bg-gray-800 overflow-hidden ${props.className}`}>
            <p>{props.message}</p>
        </div>
    )
}