import { useState } from "react";
import UseCookie from "react-use-cookie";
import { CartModel } from "../../models/models";
import  UseCart from "../../hooks/cartHook";
import OffsetButton from "../utilityComponent/offsetButton";
import NumberInput from "../input/numberInput";

interface CartProps{
    id: string;
    className?: string;
}

export default function AddToCart(props: CartProps){
    const {cart, setCart} = UseCart()
    const [amount, setAmount] = useState(1);
    return(
        <button className={`w-full max-w-[10rem] h-10 ${props.className}`} >
                <div className="grid grid-cols-4 h-full w-full rounded-br-lg rounded-tl-lg shadow-xl cursor-pointer">
                    <NumberInput 
                        className="flex flex-grow rounded-tl-lg text-gray-500 text-center" 
                        defaultValue={1} 
                        onChange={(val) => setAmount(val)} />
                    <div 
                        className="col-span-3 bg-green-600 hover:bg-green-800 rounded-br-lg text-white"
                        onClick={() => { 
                            if(cart){
                                if(!cart.products) cart.products = [];
                                cart.products.push({
                                    id: props.id, 
                                    amount: amount
                                });
                                setCart(cart);
                            }
                        }}>
                        <div className="flex flex-grow justify-center h-full place-items-center">
                            <p>Add To Cart</p>
                        </div>
                    </div>
                </div>
            </button>
        )
}