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
  if(router.isFallback){
    console.log("!fallback")
    return <div className='flex flex-grow bg-gray-200'><h1>Loading </h1></div>
  }
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
export default ProductPage

/*export async function getStaticPaths(){
  let products = await api.get<{_id: string}[]>(`product?projection=_id`);
  const paths = products.map((prod) => ({
    params: { id: prod._id },
  })) 
  return {paths, fallback: true};
}*/

export async function getServerSideProps(props: {params: {id: string}}){
  let product = await api.get<ProductModel>("product/"+props.params.id);
  return {
    props:{
      product: product
    }
  }
}