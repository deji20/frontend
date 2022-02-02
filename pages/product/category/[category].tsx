import type { NextPage } from 'next'
import axios from 'axios'
import NavigationBar from '../../../components/navigation/navigationBar'
import ProductGrid from '../../../components/products/productGrid'
import { ProductModel } from '../../../models/models'
import { ReactNode } from 'react'
import Head from 'next/head';

type CategoryProps = {
  category: string;
  products: ProductModel[],
  children?: ReactNode, 
}

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.DATABASE_API;

const CategoryPage: NextPage<CategoryProps> = (props: CategoryProps) => {
  return (
      <div className="w-screen min-h-screen flex flex-col justify-center py-10 bg-gray-800">
        <Head>
          <title>{props.category}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="flex justify-center align-middle">
          <h1 className="my-10 text-6xl text-gray-300">
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

export async function getStaticProps(props: { params: { category: string } }){
  let result = await axios.get<ProductModel[]>(API + "/product?filter=categories="+props.params.category);
  let products = result.data;
  return {
    props:{
      category: props.params.category,
      products: products
    }
  }
}

export async function getStaticPaths(){
    let result = await axios.get<string[]>(API + "/product/categories");
    const categories: string[] = result.data;
    let paths = categories.map(category =>  { 
        return { 
            params: {
                category: category,
            },
        }
    });

    return {
        paths,
        fallback:false
    }
}