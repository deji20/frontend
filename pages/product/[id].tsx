import type { NextPage } from 'next'
import axios from 'axios'
import NavigationBar from '../../components/navigation/navigationBar'
import ProductDetail from '../../components/products/productDetail'
import { ProductModel } from '../../models/models'
import { ReactNode } from 'react'
import Head from 'next/head'
import api from '../../api'

type ProductProps = {
  product: ProductModel,
  children?: ReactNode, 
  params: {
    id:string
  }
}

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

export async function getStaticPaths(){
  let products = await api.get<string[]>(`/product?projection=_id`);
  console.log("\n\n\n\n\n"+products);
  const paths = products.map((prod) => ({
    params: { id: prod },
  })) 
  return {paths, fallback: "blocking"};
}

export async function getStaticProps(props: {params: {id: string}}){
  let product = await api.get<ProductModel>("/product/"+props.params.id);
  return {
    props:{
      product: product
    }
  }
}

/*export async function getServerSideProps(props: { params: { id: string } }){
  let product = await api.get<ProductModel>("/product/"+props.params.id);
  return {
    props:{
      product: product
    }
  }
}*/