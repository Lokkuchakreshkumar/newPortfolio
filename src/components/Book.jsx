import React, { useState } from 'react'
import win from '../assets/Images/book.png'

import Theme from '../Theme.jsx'

const Book = () => {
    let {mode} = Theme();
    let [show,setShow] = useState(false);
  return (
    <div className='p-2 mt-8'>
        <div className={`font-bold ${mode=="dark"?"text-white/60":"text-black/60"} text-lg p-1`}>
            Present Book
        </div>
        <div className={` ${mode=="dark"?"bg-[#121212] border border-white/8":"bg-white border-1 inset-shadow-sm inset-shadow-indigo-500/85 border-black/35"} rounded-xl  flex sm:!flex-row flex-col  gap-4 items-start  `}>
            <div className='p-4 w-full flex justify-center'> 
                <img src={win} className='!sm:w-90 w-45  rounded h-auto object-cover' alt="" />
            </div>
           <div className='flex flex-col px-4 justify-center p-1'>
           
<div className='flex items-center justify-between pt-6 '>
     <div className={`${mode=="dark"?"text-white":"text-black"} font-bold    text-xl`}>
                How to Win Friends & Infulence People
            </div>
            
 <div onClick={()=>setShow(true)} className={`${mode=="dark"?"bg-[#1C1C1C] border border-white/10  hover:bg-[#292929] inset-shadow-sm inset-shadow-white/5 font-light hover:inset-shadow-white/10":"bg-white border border-black/35 inset-shadow-sm inset-shadow-indigo-500/50 text-black"} text-center  px-2   hover:cursor-pointer rounded-md my-2 `}>
                Reveal
          
           </div>
</div>
            
            <div className={`${mode=="dark"?"text-white/80":"text-black/80"} text-lg`}>
            Author: Dale Carnegie

            </div>
            <div className='text-white/40 mt-2 '>
               Favourite Line: 
            </div>
            <div className={` transition duration-600 py-2 leading-8 ${show?"blur-0":"blur-xs"}`}>
               Any fool can criticize, complain, and condemn—and most fools do. But it takes character and self-control to be understanding and forgiving.”

            </div>
          
            <div>

            </div>
           </div>
         
        </div>
    </div>
  )
}

export default Book