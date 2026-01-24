import React from 'react'
import img from '../assets/Images/image.png'

const Navbar = () => {
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
           <div className='flex bit sm:text-xl text-lg !sm:p-0 px-2 m-2 font-bold h-full items-center'>
            Chakresh
           </div>
        
    </div>
  )
}

export default Navbar