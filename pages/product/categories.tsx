import type { NextPage } from 'next'
import axios from 'axios'
import NavigationBar from '../../components/navigation/navigationBar'
import ProductGrid from '../../components/products/productGrid'
import { ReactNode } from 'react'
import { ProductModel } from '../../models/models'
import api from '../../api'

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

export async function getServerSideProps(props: { params: { category: string } }){
  const products = await api.get<ProductModel[]>("/product?filter=categories="+props.params.category);
  console.log(props);
  return {
    props:{
      category: props.params.category,
      products: products
    }
  }
}