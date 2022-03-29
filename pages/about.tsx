import { NextPage } from 'next'
import Image from '../components/image'

const About: NextPage = () => {
    return (
      <div className="flex justify-center bg-gray-900 min-h-screen p-20">
        <div className="grid grid-cols-2 gap-10 rounded-lg hover:drop-shadow-none">

          <div className="w-full h-full p-10 flex align-middle justify-center">
            <div className="shadow-2xl rounded  flex flex-grow"></div>
            <Image className="h-full w-full shadow-2xl" multiple pictures={["/api/about/1.jpg", "/api/about/2.jpg", "/api/about/3.jpg", "/api/about/4.jpg"]}/>
          </div>

          <div className="w-full h-full p-10 grid grid-rows-2 gap-2 align-middle justify-center">
            <div className="shadow-2xl rounded p-4 font-extralight text-sm text-white flex h-min place-self-center bg-gray-800">
              <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor odio, feugiat non dapibus vel, rhoncus efficitur odio. Vestibulum ac sem a libero cursus pulvinar. Aliquam sed leo leo. Integer sed faucibus nulla. Nam neque dui, semper nec leo eu, imperdiet ultricies nulla. Donec sagittis efficitur metus, non scelerisque ipsum laoreet vel. Integer quis nibh sit amet lacus molestie luctus a in lectus. Aliquam consequat elit in massa porta ultricies. Suspendisse potenti.
                Mauris sodales eu nibh stie sed cursus in, dictum congue orci. Sed tempor erat nec purus cursus egestas. Integer ac porttitor metus. Cras tristique metus in lacus congue, id consequat magna vestibulum. Sed nisl enim, posuere in ornare ac, feugiat ut lorem. Suspendisse potenti. Integer ut malesuada lacus. Etiam mollis nulla id dapibus aliquam. Aenean luctus ac tellus ac dictum. Aenean in lacus tempus 
              </p>
            </div>
            <div className='shadow-2xl p-4 font-extralight text-white rounded bg-gray-800'>
              <ul className='place-self-center leading-10 tracking-wide'>
                <li>Phone: +4571360354</li>
                <li>Email: <a href="mailto:Kontakt@indiskehjoerne.dk">Kontakt@indiskehjoerne.dk</a></li>
                <li>Fax: 71 36 03 54</li>
                <li>Cvr: 39442663</li>
                <li>Adresse: Hf. Frederikshøj 125. 2450 København SV.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>)
  }
  export default About