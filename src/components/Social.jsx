import React, { useState } from 'react'

import { CiLinkedin } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { CiInstagram } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
const Social = () => {
 let [social,setSocial] = useState("");
 let handleSocial = (x)=>{
    setSocial(x);
 }
  return (
    
    <div className='mt-5 flex gap-6 text-white/50  text-3xl items-center p-2'>
       <div className='flex relative flex-col'>
         <a href="https://www.linkedin.com/in/lokkuchakreshkumar/"  target='_blank' onMouseLeave={()=>setSocial("")} onMouseEnter={()=>{handleSocial("Linkedin")}}  className='hover:cursor-pointer hover:text-white'><CiLinkedin/></a>
         {
social === "Linkedin" && <div className=' mt-4 absolute top-4 rounded-lg p-1  text-sm font-light bg-white text-black'>Linkedin</div>
         }
       </div>

     <div className='flex relative flex-col'>
                <a href="https://github.com/Lokkuchakreshkumar" target='_blank' onMouseLeave={()=>setSocial("")} onMouseEnter={()=>{handleSocial("github")}} className='hover:cursor-pointer text-2xl hover:text-white'><FiGithub/></a>
  {
social === "github" && <div className=' mt-4 absolute top-4 rounded-lg p-1  text-sm font-light bg-white text-black'>Github</div>
         }
</div>
       <div className='flex relative flex-col'>
         <a href="https://x.com/Chakresh2005" target='_blank' onMouseLeave={()=>setSocial("")} onMouseEnter={()=>{handleSocial("x")}} className='hover:cursor-pointer text-2xl hover:text-white'><BsTwitterX/></a>
          {
social === "x" && <div className=' mt-4 absolute top-4 rounded p-1  text-sm font-light bg-white text-black'>X</div>
         }


       </div>
       <div className='flex relative flex-col'>
                 <a href="https://www.instagram.com/name_is_chakresh" target='_blank' onMouseLeave={()=>setSocial("")} onMouseEnter={()=>{handleSocial("insta")}} className='hover:cursor-pointer  hover:text-white'><CiInstagram/></a>
{
social === "insta" && <div className=' mt-4 absolute top-4 rounded p-1  text-sm font-light bg-white text-black'>Instagram</div>
         }
       </div>
     <div className='flex relative flex-col'>
             <a href="mailto:lokkuchakreshkumar@gmail.com" target='_blank' onMouseLeave={()=>setSocial("")} onMouseEnter={()=>{handleSocial("email")}} className='hover:cursor-pointer text-3xl hover:text-white'><IoMailOutline/></a>
{
social === "email" && <div className=' mt-4 absolute top-4 rounded p-1  text-sm font-light bg-white text-black'>Email</div>
         }
     </div>
        
    </div>
   
    
  )
}

export default Social