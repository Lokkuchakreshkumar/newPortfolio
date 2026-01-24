import React from 'react'
import Theme from '../Theme.jsx'
 import { FaRegEnvelope } from "react-icons/fa6";
const Contact = () => {
  let {mode} = Theme();
  return (
    <div className="w-full flex condense flex-col mt-18 items-center  ">
          <div className={`condense  sm:text-6xl text-3xl bg-clip-text text-transparent ${mode=="dark"?"bg-linear-to-r from-white via-white/50 to-white/20":"bg-linear-to-r from-black via-black/50 to-black/10"}`}>GET IN TOUCH WITH ME
          </div>
   
              <form action="https://formspree.io/f/mrbkwzbg" method="POST" className='w-[90%] sm:w-140 md:w-140 lg:w-140  mt-16 flex flex-col items-center justify-center '>
         
              <label htmlFor="Name" className=' mr-auto text-2xl '>Name</label>
         <input type="text" placeholder="Enter your name" id='Name' name="name" className={`border outline-none  ${mode=="dark"?"placeholder:text-white/80 border-white bg-[#171717] ":"bg-white inset-shadow-sm border-black/20 inset-shadow-indigo-400"} text-xl w-full  placeholder:text-2xl mt-1 h-14 px-4 rounded-xl `} />
        
              <label htmlFor="Name" className='   mt-4 mr-auto text-2xl'>Email Address</label>
         <input type="email" placeholder="Enter your Email" name="email" id='Email' className={`border outline-none  ${mode=="dark"?"placeholder:text-white/80 border-white bg-[#171717] ":"bg-white inset-shadow-sm border-black/20 inset-shadow-indigo-400"} text-xl w-full  placeholder:text-2xl mt-1 h-14 px-4 rounded-xl `} />
          <label htmlFor="Subject" className='    mt-4 mr-auto text-2xl'>Subject</label>
         <input type="text" placeholder="Enter the Subject" name="subject" id='Subject' className={`border outline-none  ${mode=="dark"?"placeholder:text-white/80 border-white bg-[#171717] ":"bg-white inset-shadow-sm border-black/20 inset-shadow-indigo-400"} text-xl w-full  placeholder:text-2xl mt-1 h-14 px-4 rounded-xl `} />
            <label htmlFor="msg" className='   mt-4 mr-auto text-2xl'>Message</label>
         <input type="text" placeholder="Enter your message" name="msg" id='msg'className={`border outline-none  ${mode=="dark"?"placeholder:text-white/80 border-white bg-[#171717] ":"bg-white inset-shadow-sm border-black/20 inset-shadow-indigo-400"} text-xl w-full  placeholder:text-2xl mt-1 h-36 px-4 mb-16 rounded-xl `}/>
         <button type='submit' className="bg-linear-to-r mb-16 from-[#080B12] border border-white/10 hover:scale-104 transition duration-400 hover:cursor-pointer to-[#01013b] text-white/80  text-2xl flex px-8 justify-center items-center mb-4 p-4 rounded-3xl"><FaRegEnvelope className="inline mr-2 text-2xl"/>Submit</button>
          </form>
            
        
        </div>
  )
}

export default Contact