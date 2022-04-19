import useSWR from "swr";
import Api from "../api";
import { Order, ProductModel } from "../models/models";
import UseCart from "./cartHook";
import useScript from "./useScripts";

interface CheckoutEvent{
    complete?: (response?: {paymentId: string}) => void
}

export default function UseCheckout(containerId: string,){
    const {cart} = UseCart()
    //loads NETS checkout script into dom  
    const [loaded, dibs] = useScript("https://test.checkout.dibspayment.eu/v1/checkout.js?v=1", "Dibs");
    const {data: options, error} = useSWR(() => cart && "/payment", (key) => Api.post(key, {id: cart?._id}), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    });
    
    if(loaded && dibs && options && !error){
        console.log(options)
        const checkout = (events?: CheckoutEvent) => {
            const checkFlow = new dibs.Checkout({
                checkoutKey: options.checkoutId,
                paymentId : options.paymentId,
                containerId : containerId,
                language: "en-GB",
            });
            console.log("events", events);
            events?.complete && checkFlow.on('payment-completed', events.complete);
        }
        return checkout;
    }
}