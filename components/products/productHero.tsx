import FrontCategories from "../frontCategories";
import { ProductModel } from "../../models/models";
import api from "../../api";
import useSWR from "swr";
import Image from "../image";
import Link from "next/link";

interface ProductHeroProps{
    products?: ProductModel[];
}

export default function ProductHero(props: ProductHeroProps){
    let {data: categories, error} = useSWR<string[]>("/category", (cat) => api.get<string[]>(cat));
    if(error) return <p>{error.toString()}</p>;
    if(!error && !categories) return <p>Loading</p>
    return (
        <div className="flex flex-row">
            {categories?.map((cat) => (
                <Link href={`/${cat}`} passHref>
                    <div className="flex flex-row w-full justify-evenly p-10 pt-20 bg-black bg-opacity-10">
                        <div className="relative rounded-lg shadow-2xl bg-soulBlue bg-opacity-25">
                            <div className="w-96 h-96 rounded-lg shadow-2xl">
                                <a>
                                    <Image autoScroll={3000 + (Math.random() * 20000)} className="" imgClass="rounded-lg shadow-xl" pictures={["/api/images/product/628f37dfc6ceb2e512d73584.jpeg"]} />
                                </a>
                            </div> 
                            <div className="absolute top-1/2 w-full m-auto text text-xl text-white">
                                <div className="w-1/2 m-auto bg-black bg-opacity-60 rounded-3xl shadow-2xl p-1">
                                    <p className="text-2xl font-light tracking-wider text-center">{cat}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>)
            )}
        </div>
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