import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {
  
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons'
function Footer() {
  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 bg-gray-900 text-white !px-8 !sm:px-10 !py-12 !md:py-20'>
      <div className="mb-4 md:mb-0">
        <h4 className='font-bold'>ABOUT US</h4>
        <p className="mt-4 text-sm leading-7">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, fugit, vitae debitis vel magnam eligendi quidem cupiditate dolorum similique iure totam, quod ex ut tenetur sint quia iste ipsa alias.</p>
      </div>
     <div className="mb-4 md:mb-0">
        <h4 className='font-bold'>NEWSLETTER</h4>
       <p className="text-sm mb-5">Stay updated with our latest trends</p>
        <div className='flex'><input  type="text" placeholder='email id' className="bg-white text-black px-4 py-2 outline-none" />
        <button className='text-3xl bg-yellow-400 '> <FontAwesomeIcon icon={faArrowRight} /></button></div>
      </div>
      <div>
        <h4>FOLLOW US</h4>
        <p>Let us be social</p>

      <div className="flex gap-4 mt-4">

            <a href="#" className="text-white hover:text-yellow-400">
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a href="#" className="text-white hover:text-yellow-400">
              <FontAwesomeIcon icon={faTwitter} />
            </a>

            <a href="#" className="text-white hover:text-yellow-400">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a href="#" className="text-white hover:text-yellow-400">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>

          </div>
        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="bg-black text-white text-center py-4 text-sm">
        Copyright © 2023 All rights reserved | This website is made with React
       
        
      </div>
    </>
  )
}

export default Footer