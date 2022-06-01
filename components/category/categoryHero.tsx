import { Picture, ProductModel } from "../../models/models";
import api from "../../api";
import useSWR from "swr";
import Image from "../image";
import Link from "next/link";
import Loading from "../fallback/loading";
import FallBack from "../fallback/fallback";
import { Fragment } from "react";

interface HeroProps{
    className?: string;
    category: string
}

async function getPictures (category: string){
    const result = await api.get<{ version: { pictures: Picture[] } [] } []>(`/product?filter=categories=${category}&projection=version.pictures`);
    return result.flatMap(version => version.version.flatMap(ver => ver.pictures));
}

export default function CategoryHero(props: HeroProps){
    const {data: pictures, error} = useSWR<Picture[]>(props.category, getPictures)

    console.log("error", error);
    return (
            <Link href={`/${props.category}`} passHref>
                <a>
                    <div className={`group flex flex-row relative justify-evenly rounded-lg shadow-2xl bg-soulBlue bg-opacity-25 w-full h-full ${props.className}`}>
                        <FallBack data={pictures} error={error}>
                            <div className="relative w-full h-full rounded-lg shadow-2xl">
                                    <Image autoScroll={3000 + (Math.random() * 20000)} className="" imgClass="rounded-lg shadow-xl" pictures={pictures}/>
                            </div> 
                            <div className="absolute h-full w-full flex m-auto text text-xl text-gray-300">
                                <div className="p-2 px-5  h-min m-auto bg-black bg-opacity-70 group-hover:text-white rounded-3xl shadow-2xl group-hover:shadow-inner">
                                    <p className="text-2xl font-light tracking-wider text-center">{props.category}</p>
                                </div>
                            </div>
                        </FallBack>
                    </div>
                </a>
            </Link>
    )
}

// export default function ProductHero(props: ProductHeroProps){
//     let {data: categories, error} = useSWR<string[]>("/category", (cat) => api.get<string[]>(cat));
//     if(error) return <p>{error.toString()}</p>;
//     if(!error && !categories) return <p>Loading</p>
//     return (
//         <div className="flex flex-row w-full justify-evenly p-10 pt-20 bg-black bg-opacity-10">
//             {categories && categories.map((category, i) => <FrontCategories key={i} className='h-[15rem] sm:h-[25rem] md:h-[35rem] w-24 sm:w-40 md:w-52 lg:w-96' name={category} href={`/${category}`}/>) } 
//         </div>
//     )
// }