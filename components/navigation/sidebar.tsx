import { Component, useState } from "react";
import Link from 'next/link'
import Cart from "../cart/cart";
import Img from "../image";
import PredictInput from "../utilityComponent/predict";
import api from "../../api";
import { ProductModel } from "../../models/models";
import Pricetag from "../pricetag";

interface SideBarProps{
    className?: string;
}

export default function SideBar(props: SideBarProps){
    return (
        <ul className={`fixed h-full right-0 w-28 drop-shadow-2xl bg-opacity-50 bg-gray-900 text-white transition-all duration-500 ${props.className}`}>
            <li>
                <Link href="/about" passHref>
                    <a><button className="w-full text-center p-2 bg-opacity-10 shadow-2xl transition-all duration-100 hover:bg-blue-800 font-thin tracking-wider">About Us</button></a>
                </Link>
                <Link href="/about" passHref>
                    <a><button className="w-full text-center p-2 bg-opacity-10 shadow-2xl transition-all duration-100 hover:bg-blue-800 font-thin tracking-wider">Contact</button></a>
                </Link>
            </li>
        </ul>  
    )
}