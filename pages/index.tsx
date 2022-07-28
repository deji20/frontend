import { NextPage } from 'next'
import Image from 'next/image'
import CategoryHero from '../components/category/categoryHero'
import ProductGridList from '../components/products/productGridList'
import api from '../api'
import useSWR from 'swr'
import Error from '../components/fallback/error'
import Loading from '../components/fallback/loading'
import FallBack from '../components/fallback/fallback'
import FadingSanskrit from '../components/canvas/fadingSanskrit'

const PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API = process.env.DATABASE_API;

const Home: NextPage = () => {
  const {data: categories, error} = useSWR<string[]>("/category", (path) => api.get(path))

  return (

    <div className="flex flex-grow flex-col overflow-hidden bg-black">
      <div className='bg-gradient-to-tr from-yellow-900 to-soulBlue'>
        <div className='flex flex-row flex-wrap gap-5 p-28 px-10 justify-evenly'>
            <FallBack data={categories} error={error} >
              {categories?.map((category, i)=> <CategoryHero key={i} category={category} className="w-96 h-96" />)}
            </FallBack>
        </div>
        
        <div className='bg-white text-center rounded-b-lg font-light text-white p-3  text-sm bg-opacity-10 w-full h-full'>
          <p className="px-2 text-xs">Vi er en indisk familie som gennem 26 år har dannet erfaringerer med handling og salg mellem indien og den vestlige verden. Vi tager bestilliger til store ordre, kom med foto eller prototype, vi giver garanti, og varende, og garantere returningers muligeheder</p>
        </div>

      </div>
      { categories && <ProductGridList className="bg-blue-900" categories={categories} /> }
    </div>
  )
}
export default Home