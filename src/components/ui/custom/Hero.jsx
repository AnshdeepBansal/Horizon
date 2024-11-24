import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="z-10 flex flex-col items-center mx-52 gap-9">
      <h1 className='font-extrabold text-[50px] text-center mt-16'><span className='text-[#f56551]'>Discover Your Next Adventure with Us:</span> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and tarvel curator, creating custom itineraries tailored to your interests and budget</p>
        <Link to={'/create-trip'}><Button className="h-14 text-xl font-serif shadow-xl rounded-xl hover:scale-105 transition-all">Get Strated, it's Free</Button></Link>
    </div>
  )
}

export default Hero
