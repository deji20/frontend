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
                    <link rel="icon" href="/assets/logo-black.png"></link>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className="h-10 bg-black"/>
                <ul className="fixed top-0 h-10 w-full bg-dark opacity-80 text-white flex flex-row z-50 transition-opacity duration-400 hover:opacity-90 focus-within:opacity-100">
                    <li className="sticky top-10 right-0">
                        <Link passHref href="/">
                            <a>
                                <Img className="mx-2 w-24 h-24 rotate-90 relative opacity-80 hover:opacity-100" pictures={["/assets/logo.png"]}/>
                            </a>
                        </Link>
                    </li>
                    <li className="flex flex-grow px-24">
                        <SearchBar/>
                    </li>
                    <li className="h-10 w-10 mx-2 relative opacity-80 hover:opacity-100 cursor-pointer" onClick={() => setNav(!navVisible)}>
                        <Img pictures={["/assets/more.svg"]} />
                    </li>
                    <li className="sticky top-10 right-0">
                        <Link passHref href="/">
                            <a>
                                <Img className="mx-2 w-24 h-24 rotate-90 relative opacity-80 hover:opacity-100" pictures={["/assets/logo.png"]}/>
                            </a>
                        </Link>
                    </li>
                </ul>
                <li className="sticky top-10 right-0">
                    <Link passHref href="/">
                        <a>
                            <Img className="mx-2 w-24 h-24 rotate-90 relative opacity-80 hover:opacity-100" pictures={["/assets/logo.png"]}/>
                        </a>
                    </Link>
                </li>
                
                <Cart />
                <SideBar className={`top-10 ${!navVisible && "translate-x-28"}`}/>
            </React.Fragment>
    )
}