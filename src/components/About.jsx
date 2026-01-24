import React from 'react'
import TiltedCard from './TiltedCard'
import img from '../assets/Images/image.png'
import Social from './Social'

const About = () => {
  return (
    <section id='about' className='p-4 w-full'>
        <div className='text-white/20  text-sm'>
            About
        </div>
        <div className='text-white font-black text-2xl'>
            Me
        </div>
        <div className='flex flex-col !sm:flex-row items-center gap-8 '>
            <div className='mt-8 relative'>
 <TiltedCard 
  imageSrc={img}
  altText="Kendrick Lamar - GNX Album Cover"
  captionText="Chakresh"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="300px"
  imageWidth="300px"
  rotateAmplitude={12}
  scaleOnHover={1.05}
  showMobileWarning={false}
  showTooltip
  displayOverlayContent
  overlayContent={
    <p className="tilted-card-demo-text">
     Chakresh
    </p>
  }
/> 
</div>
<div className='flex mt-8 items-center flex-col'>
    <div className='font-bold p-2 text-white text-3xl'>
        Lokku Chakresh Kumar
    </div>
    <div className='text-white/40 mt-4 p-2'>
Curious about how things work at a fundamental level, I enjoy breaking down systems and rebuilding them better. I’m a continuous learner who experiments a lot, builds real projects, and is increasingly focused on system design, scalability, and writing clean, reliable software.    </div>
    <div>
        <Social/>
    </div>
    
</div>
        </div>

    </section>
  )
}

export default About