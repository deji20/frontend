import { Picture, ProductModel } from "../../models/models";
import api from "../../api";
import useSWR from "swr";
import Image from "../image";
import Link from "next/link";
import Loading from "../fallback/loading";
import FallBack from "../fallback/fallback";
import { Fragment, useEffect, useState } from "react";
import { useSpring, animated, useTransition} from "react-spring";
import Pricetag from "../pricetag";

interface HeroProps{
    className?: string;
    category: string
}

async function getPictures (category: string){
    const result = await api.get<{ 
        name: string,
        price: string,
        version: { 
            pictures: Picture[] 
        }[] 
    }[]>(`/product?filter=categories=${category}&projection=version.pictures,name,price`);

    return (
        result.flatMap(
            product => product.version.flatMap(
                version => 
                    version.pictures.flatMap(picture => ({ 
                    name: product.name, 
                    price: product.price, 
                    pic: picture
                }))
            )
        )
    )
}

export default function CategoryHero(props: HeroProps){
    const {data: categories, error} = useSWR<{name: string, price: string, pic: Picture}[]>(props.category, getPictures)
    const [productNr, setProductNr] = useState(0)

    const scroll = useTransition(productNr, {
        initial: {left: "0%"},
        from: {opacity: "0", left: "100%", transform: 'translate3d(100%,100%,0)' },
        enter: {opacity: "1", left: "0%", transform: 'translate3d(0%,0,0)' },
        leave: {opacity: "0",    position:"absolute"},
        config:{mass:60, tension:1000, friction:300, clamp:true}
    });
    
    return (
        <Link href={`/${props.category}`} passHref>
            <a>
                <div className={`group flex flex-row relative justify-evenly rounded-lg shadow-2xl bg-soulBlue bg-opacity-25 w-full h-full ${props.className}`}>
                    <FallBack data={categories} error={error}>
                        <div className="relative w-full h-full rounded-lg shadow-2xl">
                                <Image 
                                    autoScroll={3000 + (Math.random() * 20000)} 
                                    className="" 
                                    imgClass="rounded-lg shadow-xl"
                                    onScroll={i => setProductNr(i)} 
                                    pictures={categories?.map(cat => cat.pic)}
                                />
                        </div> 
                        <div className="absolute h-full w-full flex m-auto text text-xl text-gray-300">
                            <div className="p-2 px-5  h-min w-full m-auto bg-black bg-opacity-60 group-hover:text-white shadow-2xl group-hover:shadow-inner">
                                <p className="text-2xl font-light tracking-wider text-center">{props.category}</p>
                            </div>
                        </div>
                    </FallBack>
                </div>
                <div className="tracking-wider drop-shadow-2xl text-lg font-light opacity-60 flex flex-row justify-center">
                    <div className=" whitespace-nowrap overflow-hidden w-full h-full">
                    {scroll((style, product) => (
                        <div className="relative h-full w-full">
                            <animated.div style={style} className="relative m-auto text-left p-1 text-sm flex flex-row justify-between h-full w-full">
                                <p className="drop-shadow-2xl inline-block text-white">{categories?.[product]?.name}</p>
                                {categories?.[product]?.price && <Pricetag className="text-white text-xs p-1" price={Number.parseInt(categories?.[product]?.price)}/>}        
                            </animated.div>
                        </div>)
                    )}
                    </div>
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