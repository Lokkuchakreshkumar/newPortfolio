import React from 'react'
import img from '../assets/Images/image.png'
import { FaRegMoon } from "react-icons/fa6";
import Theme from '../Theme.jsx'
import { MdOutlineWbSunny } from "react-icons/md";
const Navbar = () => {
const {mode,setMode} = Theme();
let handleMode = ()=>{
  if(mode=="dark"){
    setMode("bright")
  }else{
    setMode("dark")
  }
}
  return (
    <div className='bg-white/0 z-50 flex justify-between   px-2  sm:w-[42%] w-full h-20 fixed top-0 backdrop-blur-md'>
        
           <div className='flex items-center w-full h-full'>
           <div>
              <img src={img} className='rounded-xl hover:scale-90 hover:cursor-pointer border border-white w-14 h-14 object-cover' alt="" />
           </div>
            <div className='flex font-medium h-full items-end gap-4   p-4'>
               
            <a href='#projects' className='hover:cursor-pointer hover:underline decoration-3'>
                Projects
            </a>
              <a href='#about' className='hover:cursor-pointer hover:underline decoration-3'>
                About
            </a>
            <a href='#blogs' className='hover:cursor-pointer hover:underline decoration-3'>
                Blogs
            </a>
            </div>
           </div>
           <div className='flex transition duration-600 bit sm:text-xl text-lg !sm:p-0 px-2 m-2 font-bold h-full items-center'>
            <span onClick={handleMode} className='text-sm s mx-5  hover:cursor-pointer rounded'>{mode=="dark" && <div className='border border-white/20 p-2 rounded inset-shadow-xs inset-shadow-white/10 hover:inset-shadow-white/20 bg-[#252525] hover:bg-[#2e2e2e]'><FaRegMoon/></div>}{mode=="bright"&& <div className='border border-black/20 p-2 rounded inset-shadow-xs inset-shadow-indigo-400'><MdOutlineWbSunny/></div>}</span>
              <span className='sm:flex hidden'>Chakresh</span>
           </div>
        
    </div>
  )
}

export default Navbar