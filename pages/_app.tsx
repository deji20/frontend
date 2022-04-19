import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavigationBar from '../components/navigation/navigationBar'
import { Fragment } from 'react'
import Footer from '../components/footer'
import Frame from '../components/frame'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Frame>
      <Component {...pageProps} />
    </Frame>
    )
}
export default MyApp
