
import Mainpage from './components/Mainpage'
import Navbar from './components/Navbar'
import './oneko.js'

function App() {
  

  return (
    <div className='bg-[#0A0A0A] sm:!p-0 px-4  scroll-smooth hanken w-full pb-20 flex justify-center min-h-screen text-white'>  
      <div className='sm:!w-[42%] w-full'>
          <Navbar/>
          <Mainpage/>
        
          <div className='sm:!w-[42%] w-full  [mask-image:linear-gradient(to_top,white_30%,transparent_100%)] bg-white/0 fixed bottom-0 backdrop-blur-xs h-10 rounded-t-xl'></div>
      </div>
    </div>
  )
}

export default App
