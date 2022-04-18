import { NextPage } from 'next'
import Image from 'next/image'
import ProductHero from '../components/products/productHero'
import ProductGridList from '../components/products/productGridList'
import { ProductModel } from '../models/models'
import { ReactNode } from 'react'
import api from '../api'
import useSWR from 'swr'
import Error from '../components/fallback/error'
import Loading from '../components/fallback/loading'

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.DATABASE_API;

const Home: NextPage = () => {
  const {data: categories, error} = useSWR<string[]>("/product/categories", (path) => api.get(path))

  console.log("alright");
  if(error) return <Error message={error} className='min-h-screen'/>
  if(!categories && !error) return <Loading className="min-h-screen"/>
  return (

    <div className="min-h-screen bg-yellow-900 overflow-hidden">
      <div className="absolute w-full h-full opacity-50">
        <Image src="/assets/" alt="" layout="fill"/>
      </div>
      <div className='pt-10 px-2 w-full'>
        <div className='bg-white rounded-b-lg font-light text-white py-1 px-4 text-sm bg-opacity-10 h-full'>
          <p className="px-4">Vi er en indisk familie som gennem 26 år har dannet erfaringerer med handling og salg mellem indien og den vestlige verden. Vi tager bestilliger til store ordre, kom med foto eller prototype, vi giver garanti, og varende, og garantere returningers muligeheder</p>
        </div>
      </div>
      <ProductHero/>
      { categories && <ProductGridList className="" categories={categories} /> }
    </div>
  )
}
export default Home