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
        <div className='grid grid-cols-2 align-middle justify-center gap-5 px-5 '>
          <CustomerForm onChange={props.customer } className='h-min m-auto '/>        
          <Summary className="h-min m-auto rounded shadow-2xl" products={props.products || []}/>
        </div>
      )
}