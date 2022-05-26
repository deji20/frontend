import { useEffect } from "react";
import UseCheckout from "../../hooks/useCheckout";
import { Customer, Order } from "../../models/models";
import Loading from "../fallback/loading";
import Image from "../image";

interface CheckoutProps
{
    className?: string;
    customerInfo?: Customer
}

export default function NetsCheckout(props: CheckoutProps){
    const check = UseCheckout("checkout", props.customerInfo);
    useEffect(() => {
        check && check({complete: (res) => console.log(res)})
    }, [check]);

    return (
        <div className={`w-full ${props.className}`}>
            <div id="checkout" className={!check ? "grid grid-rows-3 align-middle justify-center" : ""}>{!check && <Loading className="row-start-2" />}</div> 
        </div>
    )
    //return <div id="checkout"></div>
}