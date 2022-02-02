import { Component, useState } from "react";
import Link from 'next/link'
import Cart from "../cart/cart";
import Img from "../image";
import PredictInput from "../utilityComponent/predict";
import api from "../../api";
import { ProductModel } from "../../models/models";
import Pricetag from "../pricetag";
import Head from 'next/head'
import SideBar from "./sidebar";
import SearchBar from "./searchBar";

export default function NavigationBar(){
    const [navVisible, setNav] = useState(false);
    return (
            <div className="fixed z-50">
                <Head>
                    <title>Home</title>
                    <link rel="icon" href="/assets/icon.svg"></link>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <ul className="fixed h-10 w-full bg-dark opacity-30 text-white flex flex-row z-50 transition-opacity duration-400 hover:opacity-90 focus-within:opacity-100">
                    <li className="">
                        <div className="mx-2 w-10 h-10 relative opacity-80 hover:opacity-100">
                            <Link passHref href={"/"}>
                                <a><Img pictures={["/assets/icon.svg"]}/></a>
                            </Link>
                        </div>
                    </li>
                    <li className="flex flex-grow">
                        <SearchBar/>
                    </li>
                    <li className="h-10 w-10 mx-2 relative opacity-80 hover:opacity-100">
                        <Img pictures={["/assets/more.svg"]} onClick={() => setNav(!navVisible)} />
                    </li>
                </ul> 
                <Cart />
                <SideBar className={`top-10 ${!navVisible && "translate-x-28"}`}/>
            </div>
    )
}