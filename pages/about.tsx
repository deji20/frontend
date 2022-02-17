import { NextPage } from 'next'

const About: NextPage = () => {
    return (
      <div className="flex justify-center bg-gray-900 min-h-screen p-20">
        <div className="w-2/3 flex flex-row rounded-lg drop-shadow-2xl hover:drop-shadow-none">

          <div className="w-full h-full p-10 flex align-middle justify-center">
            <div className="shadow-2xl rounded border flex flex-grow"></div>
          </div>

          <div className="w-full h-full p-10 flex align-middle justify-center">
            <div className="shadow-2xl rounded border p-4 font-extralight text-sm text-white flex h-min place-self-center">
              <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor odio, feugiat non dapibus vel, rhoncus efficitur odio. Vestibulum ac sem a libero cursus pulvinar. Aliquam sed leo leo. Integer sed faucibus nulla. Nam neque dui, semper nec leo eu, imperdiet ultricies nulla. Donec sagittis efficitur metus, non scelerisque ipsum laoreet vel. Integer quis nibh sit amet lacus molestie luctus a in lectus. Aliquam consequat elit in massa porta ultricies. Suspendisse potenti.
                Mauris sodales eu nibh at consequat. Aliquam tempus mauris non pellentesque feugiat. Pellentesque ut porttitor augue. Morbi fermentum nulla ut arcu congue, id auctor magna hendrerit. Donec sodales vel neque id viverra. Aenean eu vehicula ante. Donec et malesuada enim. Mauris ultricies nisi vitae enim faucibus, gravida vehicula nisi tincidunt. Aliquam erat volutpat.
                Mauris facilisis neque in aliquam euismod. Sed a ligula vitae sapien gravida imperdiet. Vestibulum laoreet diam nec tortor pretium cursus. Aenean iaculis efficitur tincidunt. Aliquam molestie mi pellentesque sapien viverra, ut maximus odio consectetur. Vivamus nisi massa, aliquet vel purus ut, dapibus venenatis elit. Praesent blandit porta orci, vitae vulputate nunc. Fusce sit amet ligula ac mauris aliquet auctor.
                Duis justo ligula, molestie sed cursus in, dictum congue orci. Sed tempor erat nec purus cursus egestas. Integer ac porttitor metus. Cras tristique metus in lacus congue, id consequat magna vestibulum. Sed nisl enim, posuere in ornare ac, feugiat ut lorem. Suspendisse potenti. Integer ut malesuada lacus. Etiam mollis nulla id dapibus aliquam. Aenean luctus ac tellus ac dictum. Aenean in lacus tempus 
              </p>
            </div>
          </div>

        </div>
      </div>)
  }
  export default About