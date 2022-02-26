import { NextPage } from 'next'
import Image from 'next/image'
import ProductHero from '../components/products/productHero'
import ProductGridList from '../components/products/productGridList'
import { ProductModel } from '../models/models'
import { ReactNode } from 'react'
import api from '../api'
import useSWR from 'swr'

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.DATABASE_API;

type HomeProps = {
  categories: string[], 
  children?: ReactNode
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const {data: categories, error} = useSWR<string[]>("/product/categories", (path) => api.get(path))

  if(error) return <p>error</p>
  if(!categories && !error) return <p>loading</p>

  api.get("/product/categories").then(res => console.log(res));
  console.log(props)
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
      {categories && <ProductGridList className="bg-gray-900 max-h-screen" categories={categories} />}
    </div>
  )
}
export default Home

export async function getServerSideProps(){
  try{
    let categories = await api.get<string[]>("/product/categories");
    console.log("categories", categories);
    return {
      props: {
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
