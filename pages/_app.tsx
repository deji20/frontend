import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavigationBar from '../components/navigation/navigationBar'
import { Fragment } from 'react'
import Footer from '../components/footer'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Fragment>
      <NavigationBar/>
      <Component {...pageProps} />
      <Footer/>
    </Fragment>
    )
}
export default MyApp
