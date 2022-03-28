import { Component } from "react";
import Image from "next/image";
import Link from "next/link";
import UseCart from "../../hooks/cartHook";

export default function Cart(props: any){
    const [cart, setCart] = UseCart();
    let cartAmount;
    if(cart && cart.products.length){ 
        cartAmount = (
            <div>
                <div className=" absolute bottom-2 z-50 right-4 bg-yellow-500 text-xs w-4 h-4 opacity-100 rounded-full ">
                    <div className="flex flex-grow justify-center place-items-center h-full">
                        <p>{cart.products.length}</p>
                    </div>
                </div>
            </div>)
    }

    return(
        <Link passHref href="/cart">
                <a>
                <div className="z-50 fixed rounded-full p-10 bottom-4 right-5 flex items-center opacity-50 cursor-pointer transform duration-500 hover:scale-110 hover:opacity-100">
                    {cartAmount}
                    <Image className="" src="/assets/cart.png" alt="Cart Icon" layout="fill"/>
                </div>
                </a>
            </Link>
    )
}