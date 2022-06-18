import { Component } from "react";
import Link from "next/link";
import UseCart from "../../hooks/cartHook";
import Image from "../image";

export default function Cart(){
    const {cart} = UseCart();
    if(cart?.products?.length === 0) return null;
    return (
        <Link href="/cart"  passHref>
            <div className="z-50 fixed rounded-full bottom-2 right-2 flex items-center opacity-50 cursor-pointer transform duration-500 hover:scale-105 hover:opacity-100">
                <div className="absolute z-30 bottom-2 right-2 text-center bg-white bg-opacitity-50 text-xs w-5 h-5 rounded-full">{cart?.products?.length}</div>}
                <div className="flex w-20 h-20">
                    <Image className="" pictures={["/assets/cart.png"]} />
                </div>
            </div>
        </Link>
    )
}