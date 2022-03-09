import useSWR from "swr";
import Api from "../api";
import { ProductModel } from "../models/models";
import useScript from "./useScripts";

export default function UseCheckout(productIds: string[], containerId: string,){
    //loads NETS checkout script into dom 
    const [loaded, dibs] = useScript("https://test.checkout.dibspayment.eu/v1/checkout.js?v=1", "Dibs");
    const {data: options, error} = useSWR("/payment", (key) => Api.post(key, productIds), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
    });

    
    if(dibs && options && !error){
        const checkout = (events?: {complete?: (response?: {paymentId: string}) => void}) => { 
            const checkFlow = new dibs.Checkout({
                checkoutKey: options.checkoutId,
                paymentId : options.paymentId,
                containerId : containerId,
                language: "en-GB",
            });

            events?.complete && checkFlow.on('payment-completed', events.complete);
        }

        return checkout;
    }
}