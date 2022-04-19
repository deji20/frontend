import React, { Component, useState } from "react";
import Link from 'next/link'
import Cart from "../cart/cart";
import Img from "../image";

import Head from 'next/head'
import SideBar from "./sidebar";
import SearchBar from "./searchBar";

export default function NavigationBar(){
    const [navVisible, setNav] = useState(false);
    return (
            <React.Fragment>
                <Head>
                    <title>Home</title>
                    <link rel="icon" href="/assets/icon.svg"></link>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <ul className="sticky h-10 w-full bg-dark opacity-80 text-white flex flex-row z-50 transition-opacity duration-400 hover:opacity-90 focus-within:opacity-100">
                    <li className="">
                        <Link passHref href="/">
                            <a >
                                <Img className="mx-2 w-10 h-10 relative opacity-80 hover:opacity-100" pictures={["/assets/icon.svg"]}/>
                            </a>
                        </Link>
                    </li>
                    <li className="flex flex-grow">
                        <SearchBar/>
                    </li>
                    <li className="h-10 w-10 mx-2 relative opacity-80 hover:opacity-100 cursor-pointer" onClick={() => setNav(!navVisible)}>
                        <Img pictures={["/assets/more.svg"]} />
                    </li>
                </ul> 
                <Cart />
                <SideBar className={`top-10 ${!navVisible && "translate-x-28"}`}/>
            </React.Fragment>
    )
}