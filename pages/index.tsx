import { NextPage } from 'next'
import Image from 'next/image'
import CategoryHero from '../components/category/categoryHero'
import ProductGridList from '../components/products/productGridList'
import api from '../api'
import useSWR from 'swr'
import Error from '../components/fallback/error'
import Loading from '../components/fallback/loading'

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.DATABASE_API;

const Home: NextPage = () => {
  const {data: categories, error} = useSWR<string[]>("/product/categories", (path) => api.get(path))
  console.log(categories);

  if(error) return <Error message={error} className='text-white align-middle min-h-screen'/>
  if(!categories && !error) return <Loading className="min-h-screen"/>
  return (

    <div className="flex flex-grow flex-col overflow-hidden bg-black">
      <div className='bg-gradient-to-tr from-yellow-900 to-soulBlue'>
        <div className='px-24 w-full'>
          <div className='bg-white rounded-b-lg font-light text-white p-3  text-sm bg-opacity-10 h-full'>
            <p className="px-2 text-xs">Vi er en indisk familie som gennem 26 år har dannet erfaringerer med handling og salg mellem indien og den vestlige verden. Vi tager bestilliger til store ordre, kom med foto eller prototype, vi giver garanti, og varende, og garantere returningers muligeheder</p>
          </div>
        </div>
        <div className='flex flex-row p-20 px-10 justify-evenly'>
            {categories?.map((category)=> <CategoryHero category={category} className="w-96 h-96" />)}
        </div>
      </div>
      { categories && <ProductGridList className="bg-blue-900 bg-opacity-50" categories={categories} /> }
    </div>
  )
}
export default Home