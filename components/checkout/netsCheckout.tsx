import { useEffect } from "react";
import UseCheckout from "../../hooks/useCheckout";
import { Order } from "../../models/models";
import Loading from "../fallback/loading";
import Image from "../image";

interface CheckoutProps
{
    order: Order;
    className?: string;
}

export default function NetsCheckout(props: CheckoutProps){
    const check = UseCheckout(props.order, "checkout");
    useEffect(() => check && check(), [check]);

    return (
        <div className={`w-full ${props.className}`}>
            <div id="checkout" className={!check ? "grid grid-rows-3 align-middle justify-center" : ""}>{!check && <Loading className="row-start-2" />}</div> 
        </div>
    )
    //return <div id="checkout"></div>
}