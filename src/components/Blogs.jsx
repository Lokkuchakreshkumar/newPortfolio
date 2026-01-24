import React from 'react'
import blog1 from '../assets/Images/blog1.png'
import blog2 from '../assets/Images/blog2.png'
import { SiMedium } from "react-icons/si";
import { FaLongArrowAltRight } from "react-icons/fa";
const Blogs = () => {
  return (
    <section id='blogs' className='flex flex-col mt-6 p-4'>
        <div className='text-white/40 text-sm'>Featured</div>
        <div className='text-white font-bold text-xl'>Blogs</div>
           <div className='flex flex-wrap gap-6 mt-6'>

 <div className='flex-col rounded-xl border border-cyan-400/10 sm:w-[48%] w-[98%]  bg-[#171717]'>
                    <div><img src={blog1} className=' w-full h-54 object-cover rounded-xl ' alt="" /></div>
                    <div className='flex w-full p-4 leading-8 flex-col items-center'>
                      <div className='flex justify-center '>
                        <div className='font-bold text-lg'>GoSynk: A Complete Communication Platform</div>
                       
                       
        
                      </div>
                      <div className='text-white/70  leading-7 p-1'>
                      A Clear guide on how to use GoSynk and the engineering behind the development and all features explained in detaild
                      </div>
                      
                       <a target='_blank' href='https://medium.com/@lokkuchakreshkumar/gosynk-a-complete-communication-platform-designed-for-kl-university-students-439518871502' className='w-full flex items-center hover:cursor-pointer hover:text-white/80 text-white/60 justify-end p-4 mt-2'>
                       <FaLongArrowAltRight/> <span className='px-1'>Read More</span>
                       </a>
                    </div>
                    <div>
        
                    </div>
                    
                  </div>






 <div className='flex-col rounded-xl border border-cyan-400/10 sm:w-[48%] w-[98%]  bg-[#171717]'>
                    <div><img src={blog2} className=' w-full h-54 object-cover rounded-xl ' alt="" /></div>
                    <div className='flex w-full p-4 leading-8 flex-col items-center'>
                      <div className='flex justify-center '>
                        <div className='font-bold text-lg'>Is AI a Bubble? — You need to accept hard things.</div>
                       
                       
        
                      </div>
                      <div className='text-white/70  leading-7 p-1'>
Everyone’s betting on LLMs like it’s the next internet but what if it’s actually the next dot-com bubble?                      </div>
                      
                       <a target='_blank' href='https://medium.com/@lokkuchakreshkumar/is-ai-a-bubble-you-need-to-accept-hard-things-eabb16615375' className='w-full flex items-center hover:cursor-pointer hover:text-white/80 text-white/60 justify-end p-4 mt-2'>
                       <FaLongArrowAltRight/> <span className='px-1'>Read More</span>
                       </a>
                    </div>
                    <div>
        
                    </div>
                    
                  </div>


           </div>
          <div className=' w-full mt-4 justify-center bg-white hover:bg-white/70 hover:cursor-pointer items-center p-2 rounded-lg flex text-black font-bold '>
            <span className='px-1'>More here</span> <SiMedium/>
          </div>
         

    
    </section>
  )
}

export default Blogs