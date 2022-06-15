import { NextPage } from 'next'
import { Customer, ProductModel } from '../models/models'
import { ReactNode, useEffect, useState } from 'react'
import UseCart from '../hooks/cartHook'
import ProductLine from '../components/products/productLine'
import api from '../api'
import useSWR from 'swr'
import CartOverview from '../components/cart/cartOverview'
import NetsCheckout from '../components/checkout/netsCheckout'
import ScrollView from '../components/baseComponents/scrollView'
import Summary from '../components/checkout/summary'
import CustomerForm from '../components/checkout/customerForm'

type CartProps = {
  products: ProductModel[], 
  categories: string[], 
  categoryProducts: ProductModel[],
  children?: ReactNode
}


const Cart: NextPage<CartProps> = (props: CartProps) => {
  const { cart, getProducts} = UseCart();
  const {data: products, error} = useSWR(() => cart, getProducts)

  const [customer, setCustomer] = useState<Customer>();

  return (
    <ScrollView>
      <CartOverview products={products || []}/>
      <div className='grid md:grid-cols-2 align-middle justify-center gap-5 px-5 '>
        <Summary className="h-min m-auto w-full rounded shadow-2xl" products={products || []}/>
        <CustomerForm customer={customer} onChange={c => setCustomer(c)} className='h-min m-auto '/>        
      </div>
      <NetsCheckout customerInfo={customer}/>
    </ScrollView>)
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
