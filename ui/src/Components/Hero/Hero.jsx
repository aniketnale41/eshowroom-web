import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import car_image from '../Assets/car_img.png'


export const Hero = () => {
  return (
    <div> 
        <div className='hero'>
            <div className='hero-left'>
                <h2>NEW ARRVALS ONLY</h2>
             <div>
                <div className='hand-hand-icon'>
                    <p>new 
                    <img src={hand_icon} alt=""/></p>
                </div>
                <p>collections</p>
                <p>for everyone</p>
                </div>   
                <div className='hero-latest-btn'>
                    <button onClick={()=> {
                        const section = document.querySelector( '#latest' );
                        section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                    }}>Latest Collection</button>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className='hero-right'>
                <img src={car_image} alt="" /> 
            </div>
        </div>
    </div>
  )
}
export default Hero