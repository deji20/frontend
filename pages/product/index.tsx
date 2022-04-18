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
  query: {
      category: string
  }
}

const CategoryPage: NextPage<CategoryProps> = (props: CategoryProps) => {
  console.log(props);
    return <div>property {props.query.category}</div>
}

export async function getServerSideProps({query}: any){
  return {
    props:{
      query: query
    }
  }
}

export default CategoryPage