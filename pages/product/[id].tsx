import type { NextPage } from 'next'
import axios from 'axios'
import NavigationBar from '../../components/navigation/navigationBar'
import ProductDetail from '../../components/products/productDetail'
import { ProductModel } from '../../models/models'
import { ReactNode } from 'react'
import Head from 'next/head'

type ProductProps = {
  product: ProductModel,
  children?: ReactNode, 
}

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.DATABASE_API;

const ProductPage: NextPage<ProductProps> = (props: ProductProps) => {
  return (
    <div>
      <Head>
          <title>{props.product.name}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-screen h-screen px-20 flex justify-center align-middle bg-gray-900">
        <ProductDetail product={props.product} />
      </div>
    </div>
  )
}
export default ProductPage

export async function getStaticProps(props: { params: { id: string } }){
  let result = await axios.get<ProductModel>(API + "/product/"+props.params.id);
  let product = result.data;
  return {
    props:{
      product: product
    }
  }
}

export async function getStaticPaths(id: string){
  let result = await axios.get<ProductModel[]>(API + "/product");
  const products: ProductModel[] = result.data;
  let paths = products.map(product =>  { 
    return { 
      params: {
        id: product._id?.toString(),
      },
    }
  });

  return {
    paths,
    fallback:false
  }
}