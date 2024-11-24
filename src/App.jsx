import { useState } from 'react'
import Hero from './components/ui/custom/Hero'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="z-0 fixed top-0 h-full bg-[url('/bg.jpg')] bg-cover">
    <div className='z-1 h-full bg-black/[.2]'>
      <Hero/>

    </div>
    </div>
    </>
  )
}

export default App
