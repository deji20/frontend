import Img from "./image";

export default function Footer(){
    return (
        <div className='bg-gray-700 text-[0.8rem] w-full p-2 grid grid-cols-2 place-items-center text-white font-light tracking-wider'>
            <ul className=''>
                <li>Phone: +4571360354</li>
                <li>Email: </li>
                <li>Fax: </li>
                <li>Cvr: 39442663</li>
            </ul>
            <ul className='flex flex-row justify-evenly flex-grow align-middle w-full'>
                    <Img pictures={["/api/icons/social/insta.svg"]} className="w-8"/>
                    <Img pictures={["/api/icons/social/linked.svg"]} className="w-8 p-1"/>
                    <Img pictures={["/api/icons/social/facebook.svg"]} className="w-8 p-[2px]"/>
            </ul>
        </div>
    )
} 