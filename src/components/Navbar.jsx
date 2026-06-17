import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import img from '../assets/Images/image.png'
import { FaRegMoon } from "react-icons/fa6";
import Theme from '../Theme.jsx'
import { MdOutlineWbSunny } from "react-icons/md";
import { Pencil } from "lucide-react";
import { generateThemeFromPrompt } from "../utils/aiTheme.js";

const Navbar = () => {
const {mode, setMode, setCustomTheme} = Theme();
const [isModalOpen, setIsModalOpen] = useState(false);
const [prompt, setPrompt] = useState("");
const [isLoading, setIsLoading] = useState(false);
const pencilRef = useRef(null);
const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

useEffect(() => {
  if (isModalOpen && pencilRef.current) {
    const rect = pencilRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  }
}, [isModalOpen]);

let handleMode = ()=>{
  setCustomTheme(null); // Clear AI theme when native mode is toggled
  if(mode=="dark"){
    setMode("bright")
  }else{
    setMode("dark")
  }
}

const handleGenerateTheme = async () => {
  if (!prompt.trim()) return;
  setIsLoading(true);
  try {
    const themeParams = await generateThemeFromPrompt(prompt);
    setCustomTheme(themeParams);
    setIsModalOpen(false);
  } catch (error) {
    console.error(error);
    alert("Failed to generate theme: " + error.message);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <>
    <div className='bg-white/0 z-50 flex justify-between   px-2  sm:w-[42%] w-full h-20 fixed top-0 backdrop-blur-md'>
        
           <div className='flex items-center w-full h-full'>
           <a href="#home">
              <img  src={img} className='rounded-xl hover:scale-90 hover:cursor-pointer border border-white w-14 h-14 object-cover' alt="" />
           </a>
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
           <div className='flex transition duration-600 bit sm:text-xl text-lg !sm:p-0 px-2 m-2 font-bold h-full items-center relative'>
            <span onClick={handleMode} className='text-sm s mx-1 hover:cursor-pointer rounded'>{mode=="dark" && <div className='border border-white/20 p-2 rounded inset-shadow-xs inset-shadow-white/10 hover:inset-shadow-white/20 bg-[#252525] hover:bg-[#2e2e2e]'><FaRegMoon/></div>}{mode=="bright"&& <div className='border border-black/20 p-2 rounded inset-shadow-xs inset-shadow-indigo-400'><MdOutlineWbSunny/></div>}</span>
            <span ref={pencilRef} onClick={() => setIsModalOpen(!isModalOpen)} className='text-sm s mx-1 mr-5 hover:cursor-pointer rounded border border-white/20 p-2 inset-shadow-xs inset-shadow-white/10 hover:inset-shadow-white/20 bg-[#252525] hover:bg-[#2e2e2e] text-white'><Pencil size={14}/></span>
              <span className='sm:flex hidden'>Chakresh</span>
              
           </div>
        
    </div>

    {/* Portal: rendered outside navbar to escape its backdrop compositing layer */}
    {isModalOpen && ReactDOM.createPortal(
      <>
        {/* Overlay to catch outside clicks */}
        <div className="fixed inset-0 z-[99]" onClick={() => setIsModalOpen(false)} />
        <div 
          style={{ top: dropdownPos.top, right: dropdownPos.right }}
          className={`fixed z-[100] w-[256px] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl backdrop-saturate-150 border flex flex-col items-center transition-all duration-300 ${mode === 'dark' ? 'bg-[#1a1a1a]/20 border-white/20 text-white' : 'bg-white/20 border-black/20 text-black'}`}
        >
          {isLoading ? (
            <div className="py-6 text-sm font-medium animate-pulse">Generating...</div>
          ) : (
            <>
              <div className="py-3 px-4 w-full text-center">
                <h3 className="font-medium text-[15px]">Design as you like</h3>
              </div>
              <div className={`w-full h-[1px] ${mode === 'dark' ? 'bg-white/20' : 'bg-black/10'}`}></div>
              <div className="w-full py-3 px-4">
                <input 
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter') handleGenerateTheme(); }}
                  className={`w-full bg-transparent border-0 outline-none text-center text-sm ${mode === 'dark' ? 'placeholder-white/40 text-white' : 'placeholder-black/40 text-black'}`}
                  placeholder="Type & press Enter"
                />
              </div>
            </>
          )}
        </div>
      </>,
      document.body
    )}
    
    </>
  )
}

export default Navbar