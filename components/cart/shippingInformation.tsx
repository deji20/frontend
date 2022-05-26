import { Customer, ProductModel } from "../../models/models";
import CustomerForm from "../checkout/customerForm";
import Summary from "./summary";

interface ShippingProps{
  products: {
      amount: number;
      product: ProductModel
  }[],
  customer?: (customer: Customer) => void
}

export default function ShippingInfo(props: ShippingProps){
    return (
        <div className='grid md:grid-cols-2 align-middle justify-center gap-5 px-5 '>
          <Summary className="h-min m-auto w-full rounded shadow-2xl" products={props.products || []}/>
          <CustomerForm onChange={props.customer } className='h-min m-auto '/>        
        </div>
      )
}