import useSWR from "swr";
import Api from "../api";
import { Order, ProductModel } from "../models/models";
import useScript from "./useScripts";

interface CheckoutEvent{
    complete?: (response?: {paymentId: string}) => void
}

export default function UseCheckout(order: Order, containerId: string,){
    //loads NETS checkout script into dom  
    const [loaded, dibs] = useScript("https://test.checkout.dibspayment.eu/v1/checkout.js?v=1", "Dibs");
    const {data: options, error} = useSWR("/payment", (key) => Api.post(key, order), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    });
    
    if(dibs && options && !error){
        const checkout = (events?: CheckoutEvent) => {
            const checkFlow = new dibs.Checkout({
                checkoutKey: options.checkoutId,
                paymentId : options.paymentId,
                containerId : containerId,
                language: "en-GB",
            });
            console.log("events", events);
            //events?.complete && checkFlow.on('payment-completed', events.complete);
        }
        return checkout;
    }
}