import React, { Component, useState } from "react";
import Link from 'next/link'
import Cart from "../cart/cart";
import Img from "../image";

import Head from 'next/head'
import SideBar from "./sidebar";
import SearchBar from "./searchProducts";
import Image from "next/image";

import moreIcon from "../../public/assets/icons/more.svg";
import searchIcon from "../../public/assets/icons/search.svg";
import cartIcon from "../../public/assets/icons/cart.svg";

import SearchProducts from "./searchProducts";
import UseDialog from "../../hooks/useDialog";
import UseScroll from "../../hooks/scrollHook";

export default function NavigationBar(){
    const [navVisible, setNav] = useState(false);
    const [search, toggleSearch] = UseDialog(<SearchProducts/>)

    UseScroll(() => console.log("event"));
    
    return (
            <div>
                <Head>
                    <title>Home</title>
                    <link rel="icon" href="/assets/logo-black.png"></link>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                {search}
                <ul className="fixed top-0 w-full text-white grid grid-cols-3 z-50 transition-opacity duration-400 hover:opacity-90 focus-within:opacity-100">
                    {/* <li className="fixed top-10">
                        <Link href="/">
                            <Img className="mx-2 w-24 h-24 sticky opacity-80 hover:opacity-100" pictures={["/icons/logo.png"]}/>
                        </Link>
                    </li> */}
                    <li>

                    </li>
                    <li className="flex flex-grow">
                        <Link href="/">
                            <p className="cursor-pointer m-auto text-center text-2xl font-light">Det Indiske Hjørne</p>
                        </Link>
                    </li>
                    <li className="grid grid-cols-10">                        
                            <Img className="col-start-8 opacity-80 hover:opacity-100 cursor-pointer flex" pictures={[searchIcon]} onClick={() => toggleSearch()} />
                            <Img href="/cart" className="opacity-80 hover:opacity-100 flex p-2" pictures={[cartIcon]} />
                            <Img className="opacity-80 hover:opacity-100 cursor-pointer flex" pictures={[moreIcon]} onClick={() => setNav(!navVisible) } />
                    </li>
                    {/* <li className="fixed top-10 right-0">
                        <Link href="/">
                            <Img className="cursor-pointer mx-2 w-24 h-24 rotate-90 relative opacity-80 hover:opacity-100" pictures={["/icons/logo.png"]}/>
                        </Link>
                    </li> */}
                </ul>
                
                <Cart />
                <SideBar className={`top-10 ${!navVisible && "translate-x-28"}`}/>
            </div>
    )
}