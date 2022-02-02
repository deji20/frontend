import type { NextPage } from 'next'
import axios from 'axios'
import NavigationBar from '../../components/navigation/navigationBar'
import ProductGrid from '../../components/products/productGrid'
import {ProductModel} from "databaseApi/models/models"
import { ReactNode } from 'react'

type CategoryProps = {
  category: string,
  products: ProductModel[],
  children?: ReactNode, 
}

const HOST = process.env.NEXT_PUBLIC_HOST;

const ProductPage: NextPage<CategoryProps> = (props: CategoryProps) => {
  return (
    <div>
      <NavigationBar/>
      <div className="w-screen h-screen flex justify-center align-middle">
        <ProductGrid products={props.products} />
      </div>
    </div>
  )
}
export default ProductPage

export async function getStaticProps(props: { params: { category: string } }){
  let result = await axios.get<ProductModel[]>(HOST + "/api/product?filter=categories="+props.params.category);
  let products = result.data;
  return {
    props:{
      category: props.params.category,
      products: products
    }
  }
}

export async function getStaticPaths(){
    let result = await axios.get<string[]>(HOST + "/api/product/categories");
    const categories: string[] = result.data;
    let paths = categories.map(category =>  { 
        return { 
        params: {
            category: category.toString(),
        },
        }
    });

    return {
        paths,
        fallback:false
    }
}