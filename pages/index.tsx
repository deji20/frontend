import { NextPage } from 'next'
import Image from 'next/image'
import ProductHero from '../components/products/productHero'
import ProductGridList from '../components/products/productGridList'
import { ProductModel } from '../models/models'
import { ReactNode } from 'react'
import api from '../api'

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.DATABASE_API;

type HomeProps = {
  products: ProductModel[], 
  categories: string[], 
  children?: ReactNode
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {

  return (
    <div className="min-h-screen bg-gray-800 overflow-hidden">
      <div className="absolute w-full h-full opacity-50">
        <Image src="/assets/" alt="" layout="fill"/>
      </div>
      <div className='pt-10 px-2 w-full'>
        <div className='bg-white rounded-b-lg font-extralight text-gray-400 py-1 px-4 text-sm bg-opacity-10 h-full'>
          <p className="px-4">Vi er en indisk familie som gennem 26 år har dannet erfaringerer med handling og salg mellem indien og den vestlige verden. Vi tager bestilliger til store ordre, kom med foto eller prototype, vi giver garanti, og varende, og garantere returningers muligeheder</p>
        </div>
      </div>
      <ProductHero/>
      <ProductGridList className="bg-gray-900 max-h-screen" categories={props.categories} />
    </div>
  )
}
export default Home

export async function getServerSideProps(){
  try{
    let categories = await api.get<string[]>("/product/categories");
    let products = await api.get<ProductModel[]>("/product");
    
    return {
      props: {
        products: products,
        categories: categories,
      }
    }
  }catch(err: any){
    console.log(err.response.status);
    return {
      props: {}
    }
  }
}
