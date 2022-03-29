import { NextPage } from 'next'
import { ProductModel } from '../models/models'
import { ReactNode, useEffect, useState } from 'react'
import CheckoutButton from '../components/cart/checkoutButton'
import UseCart from '../hooks/cartHook'
import ProductLine from '../components/products/productLine'
import api from '../api'
import CheckoutForm from '../components/cart/checkoutForm'
import Summary from '../components/cart/summary'
import useSWR from 'swr'

type CartProps = {
  products: ProductModel[], 
  categories: string[], 
  categoryProducts: ProductModel[],
  children?: ReactNode
}


const Cart: NextPage<CartProps> = (props: CartProps) => {
  const [cart, setCart] = UseCart();
  const [step, setStep] = useState(0);
  const { data: products, error } = useSWR("un", (key) => {
    const prodCall = cart.products.map(async (product) => {
      let res = await api.get<ProductModel>(`product/${product.id}`);
      return {amount: product.amount, product:  res};
    })
    return Promise.all(prodCall); 
  })

  const productOverview = () => {
    return (
      <div className="w-1/2 max-w-screen-sm relative bg-gray-700 rounded-lg shadow-2xl hover:shadow-inner">
        <div className=''>
          {products?.map((line, i) => {
            return <ProductLine key={i} product={line.product} amount={line.amount}/>
          })}
        </div>
        <CheckoutButton productIds={cart.products.map(prod => prod.id)} />
      </div>
    )
  }

  const shippingInformation = () => {
    return (
      <div className='grid grid-cols-4 gap-x-10'>
        <div className='col-span-2'>
          <div className="flex justify-center">
            <CheckoutForm className='p-5 shadow-2xl rounded-b bg-gray-600 h-min '/>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='flex justify-center'>
            <Summary className="rounded shadow-2xl" products={products || []}/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-rows-5 justify-center p-20 bg-gray-900">
      <div className='rows-span-4'>
        {shippingInformation()}
      </div>
      <div className='grid grid-cols-4 grid-rows-3 text-gray-300'>
        <button className='bg-green-600 row-start-3 col-start-4 w-min text-gray-300 hover:text-white shadow-2xl hover:shadow-inner rounded-full px-10 h-10'>Next</button>
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
