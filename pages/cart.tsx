import { NextPage } from 'next'
import axios from 'axios'
import { ProductModel } from '../models/models'
import { ReactNode } from 'react'
import CheckoutButton from '../components/cart/checkoutButton'
import UseCart from '../hooks/cartHook'
import ProductLine from '../components/products/productLine'
import api from '../api'
import ProductDescription from '../components/products/productDescription'
import Head from 'next/head'
import useScript from '../hooks/useScripts';
import {Helmet} from 'react-helmet';

type CartProps = {
  products: ProductModel[], 
  categories: string[], 
  categoryProducts: ProductModel[],
  children?: ReactNode
}

const Cart: NextPage<CartProps> = (props: CartProps) => {
  const [cart, setCart] = UseCart();

  return (
    <div className="flex justify-center p-20 bg-gray-900 min-h-screen">
      <div className="w-1/2 max-w-screen-sm relative bg-gray-700 rounded-lg shadow-2xl hover:shadow-inner">
        <div className=''>
          {cart.products.map((product, i) => {
            return <ProductLine key={i} id={product.id} amount={product.amount}/>
          })}
        </div>
        <CheckoutButton productIds={cart.products.map(prod => prod.id)} />
      </div>
    </div>
  )
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
