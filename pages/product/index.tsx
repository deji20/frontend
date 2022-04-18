import type { NextPage } from 'next'
import axios from 'axios'
import NavigationBar from '../../components/navigation/navigationBar'
import ProductDetail from '../../components/products/productDetail'
import { ProductModel } from '../../models/models'
import { ReactNode } from 'react'
import Head from 'next/head'
import api from '../../api'
import { useRouter } from 'next/dist/client/router'

type CategoryProps = {
    products: ProductModel[];
    query: {
        category: string
    }
}

const CategoryPage: NextPage<CategoryProps> = (props: CategoryProps) => {
  console.log(props);
    return <div>category: {props.query.category} has {props.products.length} items </div>
}

export async function getServerSideProps({query}: {query: {category: string}}){
    console.log(query.category);
    let products: ProductModel[] = [];
    if(query.category) products = await api.get<ProductModel[]>(`/product?filter=categories=${query.category}`);

  return {
    props:{
      query: query,
      products: products
    }
  }
}

export default CategoryPage