import { NextPage } from "next";
import CheckoutForm from "../components/cart/checkoutForm";

const Checkout: NextPage = (props: any) => {
  
    return (
        <div className="grid">
            <div>
                <CheckoutForm/>
            </div>
        </div>
    )
  }
  export default Checkout