import { NextPage } from 'next'
import axios from 'axios'
import { ProductModel } from '../models/models'
import { ReactNode } from 'react'
import CheckoutButton from '../components/cart/checkoutButton'
import UseCart from '../services/cartHook'
import ProductLine from '../components/products/productLine'

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.DATABASE_API;

type CartProps = {
  products: ProductModel[], 
  categories: string[], 
  categoryProducts: ProductModel[],
  children?: ReactNode
}

const Cart: NextPage<CartProps> = (props: CartProps) => {
  const [cart, setCart] = UseCart()
  return (
    <div className="flex justify-center bg-gray-900 min-h-screen">
      <div className="w-1/2 max-w-screen-sm m-20 relative bg-gray-700 rounded-lg shadow-2xl hover:shadow-inner">
        <div className=''>
          {cart.products.map((product, i) => {
            return <ProductLine key={i} id={product.id} amount={product.amount}/>
          })}
        </div>
        <CheckoutButton />
      </div>
    </div>
  )
}
export default Cart

export async function getServerSideProps(){
  try{
    let categories = await axios.get<string[]>(API + "/product/categories");
    let products = await axios.get<ProductModel[]>(API + "/product");
    let categoryProducts = await axios.get<ProductModel[]>(API + "/product?filter=categories=" + categories.data[0] );
    
    return {
      props: {
        products: products.data,
        categories: categories.data,
        categoryProducts: categoryProducts.data,
      }
    }
  }catch(err){
    console.log(err);
    return {
      props: {}
    }
  }
}
