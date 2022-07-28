import type { NextPage } from 'next'
import ProductGrid from '../components/products/productGrid'
import { Picture, ProductModel } from '../models/models'
import { ReactNode } from 'react'
import Head from 'next/head';
import api from '../api'
import CategoryCard from '../components/category/categoryCard';
import UseCart from '../hooks/cartHook';
import CategoryScroll from '../components/category/categoryScroll';
import FrontCategories from '../components/category/frontCategories';
import Image from '../components/image';

type CategoryProps = {
  category: string;
  subcategories: string[],
  heroPicture: Picture,
  children?: ReactNode, 
}


const MainCategoryPage: NextPage<CategoryProps> = (props: CategoryProps) => {
  UseCart();
  console.log(props.heroPicture);
  return (
      <div className="flex flex-grow flex-col justify-center py-10 bg-gray-800">
        <Head>
          <title>{props.category}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <section className="flex flex-row justify-center align-middle bg-gray-300 h-[40rem] p-14">
          <div className='m-auto flex flex-col'>
            <h1 className='text-2xl m-auto text-white text-center'>{ props.category }</h1>
            <p className='m-auto'>These jewels are so amazing like oh my god babe you gotta get these shits</p>
          </div>
          <Image className="m-auto w-[30rem] shadow-2xl" imgClass='rounded-lg' pictures={[props.heroPicture]}/>
        </section>
          {props.subcategories.map((subCategory, i) => <CategoryScroll category={subCategory} key={i} />)}
      </div>
  )
}
export default MainCategoryPage

export async function getServerSideProps(props: { params: { category: string } }){
  let result = await api.get<ProductModel[]>(`/product/categories?search=categories=${props.params.category}`);
  let product: ProductModel[] = await api.get<ProductModel[]>(`/product?filter=category=${props.params.category}&pagination=1`);
  return {
    props:{
      category: props.params.category,
      subcategories: result,
      heroPicture: product[0].version[0].pictures[0]
    }
  }
}