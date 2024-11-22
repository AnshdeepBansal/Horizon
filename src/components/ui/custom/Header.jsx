import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='top-0 p-2 shadow-lg flex justify-between items-center'>
        <img className='h-20' src='/logoo.jpg'/>
        <div className='font-sans font-bold px-5 py-3 text-center text-3xl'>Horizon</div>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Header
