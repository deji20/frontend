import type { NextPage } from 'next'
import axios from 'axios'
import NavigationBar from '../../../components/navigation/navigationBar'
import ProductGrid from '../../../components/products/productGrid'
import { ProductModel } from '../../../models/models'
import { ReactNode } from 'react'
import Head from 'next/head';
import api from '../../../api'
import useSWR from 'swr'

type CategoryProps = {
  category: string;
  products: ProductModel[],
  children?: ReactNode, 
}

const CategoryPage: NextPage<CategoryProps> = (props: CategoryProps) => {
  api.get<ProductModel[]>(`/product?filter=categories=${"Screenshot"}`).then(res => console.log(res)).catch(err => console.log(err));
  return (
      <div className="w-screen min-h-screen flex flex-col justify-center py-10 bg-gray-800">
        <Head>
          <title>{props.category}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="flex justify-center align-middle">
          <h1 className="py-10 text-6xl font-extralight text-gray-300 tracking-wider">
            {props.category}
          </h1>
        </div>
        <div className="flex flex-grow">
          <ProductGrid products={props.products} />
        </div>
      </div>
  )
}
export default CategoryPage

export async function getServerSideProps(props: { params: { category: string } }){
  let products: ProductModel[] = [];
  products = await api.get<ProductModel[]>(`/product?filter=categories=${props.params.category}`);
  
  return {
    props:{
      category: props.params.category,
      products: products
    }
  }
}