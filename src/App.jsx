
import Mainpage from './components/Mainpage'
import Navbar from './components/Navbar'
import './oneko.js'
import Theme from './Theme.jsx'
function App() {

  const {mode} = Theme();
console.log(mode)
  return (
    <div className={` transition duration-500 ${mode==="dark"?"bg-[#0A0A0A] text-white":"bg-white text-black"} sm:!p-0 px-4  scroll-smooth hanken w-full pb-20 flex justify-center min-h-screen `}>  
      <div className='sm:!w-[42%] w-full'>
          <Navbar/>
          <Mainpage/>
        
          <div className='sm:!w-[42%] w-full  [mask-image:linear-gradient(to_top,white_30%,transparent_100%)] bg-white/0 fixed bottom-0 backdrop-blur-xs h-10 rounded-t-xl'></div>
      </div>
    </div>
  )
}

export default App
