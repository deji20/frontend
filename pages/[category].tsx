import type { NextPage } from 'next'
import ProductGrid from '../components/products/productGrid'
import { ProductModel } from '../models/models'
import { ReactNode } from 'react'
import Head from 'next/head';
import api from '../api'
import CategoryCard from '../components/category/categoryCard';
import UseCart from '../hooks/cartHook';

type CategoryProps = {
  category: string;
  products: string[],
  children?: ReactNode, 
}


const MainCategoryPage: NextPage<CategoryProps> = (props: CategoryProps) => {
  UseCart();
  return (
      <div className="w-screen min-h-screen flex flex-col justify-center py-10 bg-gray-800">
        <Head>
          <title>{props.category}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="flex justify-center align-middle">
          <h1 className="my-10 text-6xl font-thin tracking-wider text-gray-300">
            {props.category}
          </h1>
        </div>
        <div className="flex flex-grow justify-center flex-wrap">
          {
          props.products.map((subCategory, i) => {
            return <CategoryCard category={subCategory} key={i} />
          })
          }
        </div>
      </div>
  )
}
export default MainCategoryPage

export async function getServerSideProps(props: { params: { category: string } }){
  let result = await api.get<ProductModel[]>(`/product/categories?search=categories=${props.params.category}`);
  return {
    props:{
      category: props.params.category,
      products: result
    }
  }
}