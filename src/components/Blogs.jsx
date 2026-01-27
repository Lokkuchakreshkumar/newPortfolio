import React from 'react'
import blog1 from '../assets/Images/blog1.png'
import blog2 from '../assets/Images/blog2.png'
import { SiMedium } from "react-icons/si";
import Theme from '../Theme.jsx'

import { FaLongArrowAltRight } from "react-icons/fa";

const Blogs = () => {
    let {mode} = Theme();
  return (
    <section id='blogs' className='flex flex-col mt-6 p-4'>
        <div className='text-white/40 text-sm'>Featured</div>
        <div className='text-white font-bold text-xl'>Blogs</div>
           <div className='flex flex-wrap gap-6 mt-6'>

 <div className={`flex-col rounded-xl ${mode=="dark"?"bg-[#171717]":"bg-white"} border border-cyan-400/30 sm:w-[48%] w-[98%]  `}>
                    <div><img src={blog1} className=' w-full h-54 object-cover rounded-xl ' alt="" /></div>
                    <div className='flex w-full p-4 leading-8 flex-col items-center'>
                      <div className='flex justify-center '>
                        <div className='font-bold text-lg'>GoSynk: A Complete Communication Platform</div>
                       
                       
        
                      </div>
                      <div className={`${mode=="dark"?"text-white/70":"text-black/70"}  leading-7 p-1`}>
                      A Clear guide on how to use GoSynk and the engineering behind the development and all features explained in detaild
                      </div>
                      
                       <a target='_blank' href='https://medium.com/@lokkuchakreshkumar/gosynk-a-complete-communication-platform-designed-for-kl-university-students-439518871502' className={`w-full flex items-center hover:cursor-pointer ${mode=="dark"?"hover:text-white/80 text-white/60":"text-black/60 text-black/80"} justify-end p-4 mt-2`}>
                       <FaLongArrowAltRight/> <span className='px-1'>Read More</span>
                       </a>
                    </div>
                    <div>
        
                    </div>
                    
                  </div>






 <div className={`flex-col rounded-xl ${mode=="dark"?"bg-[#171717]":"bg-white"} border border-cyan-400/30 sm:w-[48%] w-[98%]  `}>
                    <div><img src={blog2} className=' w-full h-54 object-cover rounded-xl ' alt="" /></div>
                    <div className='flex w-full p-4 leading-8 flex-col items-center'>
                      <div className='flex justify-center '>
                        <div className='font-bold text-lg'>Is AI a Bubble? — You need to accept hard things.</div>
                       
                       
        
                      </div>
                      <div className={`${mode=="dark"?"text-white/70":"text-black/70"}  leading-7 p-1`}>
Everyone’s betting on LLMs like it’s the next internet but what if it’s actually the next dot-com bubble?                      </div>
                      
                        <a target='_blank' href='https://medium.com/@lokkuchakreshkumar/gosynk-a-complete-communication-platform-designed-for-kl-university-students-439518871502' className={`w-full flex items-center hover:cursor-pointer ${mode=="dark"?"hover:text-white/80 text-white/60":"text-black/60 text-black/80"} justify-end p-4 mt-2`}>
                       <FaLongArrowAltRight/> <span className='px-1'>Read More</span>
                       </a>
                    </div>
                    <div>
        
                    </div>
                    
                  </div>


           </div>
          <a href='https://medium.com/@lokkuchakreshkumar' target="_blank" className={`w-full justify-center mt-4 ${mode=="dark"?"bg-white  hover:bg-white/70 text-black":"bg-black hover:bg-black/95 text-white"} hover:cursor-pointer items-center p-2 rounded-lg flex  font-bold `}>
            <span className='px-1'>More here</span> <SiMedium/>
          </a>
         

    
    </section>
  )
}

export default Blogs