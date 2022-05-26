import { NextPage } from 'next'
import { Customer, ProductModel } from '../models/models'
import { ReactNode, useEffect, useState } from 'react'
import UseCart from '../hooks/cartHook'
import ProductLine from '../components/products/productLine'
import api from '../api'
import useSWR from 'swr'
import ShippingInfo from '../components/cart/shippingInformation'
import CartOverview from '../components/cart/cartOverview'
import NetsCheckout from '../components/checkout/netsCheckout'

type CartProps = {
  products: ProductModel[], 
  categories: string[], 
  categoryProducts: ProductModel[],
  children?: ReactNode
}


const Cart: NextPage<CartProps> = (props: CartProps) => {
  const { cart, getProducts} = UseCart();
  const {data: products, error} = useSWR(() => cart, getProducts)
  const [step, setStep] = useState(0);

  const [customer, setCustomer] = useState<Customer>();


  console.log(cart?.products);

  const orderSteps = [
    <CartOverview key="1" products={products || []}/>,
    <ShippingInfo  key="2" customer={(c) => setCustomer(c)} products={products || []}/>,
    <NetsCheckout key="3" customerInfo={customer}/>
  ];

  return (
    <div className="flex flex-col flex-grow justify-center pt-24 bg-[#60a5fa]">
      <div className='absolute top-14 right-0 flex justify-center gap-2 w-full'>
        {
          orderSteps.map((o, i) => {
            return (
              <div 
                key={i} 
                onClick={() => setStep(i)} 
                className={`p-[6px] w-min rounded-full bg-white transition-all duration-500 bg-opacity-10 hover:bg-opacity-20 ${step == i ? "bg-opacity-50" : ""}`}>
              </div>
            )
          })
        }
      </div>
      <div className='w-5/6 justify-center mx-auto'>
        {orderSteps[step]}
      </div>
      <div className='m-10 justify-end p-5 flex text-gray-300'>
        <button 
          onClick={() => setStep((step + 1) % orderSteps.length)}
          className='bg-green-600  w-min text-gray-300 hover:text-white drop-shadow-2xl hover:shadow-inner rounded-full px-10 h-10'>
            Next
        </button>
      </div>
    </div>)
}

export default Cart

export async function getServerSideProps(){
  try{
    let categories = await api.get<string[]>("/product/categories");
    let products = await api.get<ProductModel[]>("/product");
    let categoryProducts = await api.get<ProductModel[]>("/product?filter=categories=" + categories[0] );
    
    return {
      props: {
        products: products,
        categories: categories,
        categoryProducts: categoryProducts,
      }
    }
  }catch(err){
    console.log(err);
    return {
      props: {}
    }
  }
}
