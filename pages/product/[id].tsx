import type { NextPage } from 'next'
import axios from 'axios'
import NavigationBar from '../../components/navigation/navigationBar'
import ProductDetail from '../../components/products/productDetail'
import { ProductModel } from '../../models/models'
import { ReactNode } from 'react'
import Head from 'next/head'
import api from '../../api'
import { useRouter } from 'next/dist/client/router'

type ProductProps = {
  product: ProductModel,
  children?: ReactNode, 
  params: {
    id:string
  }
}

const ProductPage: NextPage<ProductProps> = (props: ProductProps) => {
  const router = useRouter();
  
  if(router.isFallback) return <div className='flex flex-grow bg-gray-200'><h1>Loading </h1></div>

  return (
    <div>
      <Head>
          <title>{props.product.name}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-screen px-20 flex justify-center align-middle bg-gray-900">
        <ProductDetail product={props.product} />
      </div>
    </div>
  )
}

export async function getServerSideProps(props: {params: {id: string}}){
  let product = await api.get<ProductModel>("product/"+props.params.id);
  return {
    props:{
      product: product
    }
  }
}

export default ProductPage