import { useState } from 'react'
import './App.css'
import Hero from './components/ui/custom/Hero'

function App() {
  const [count, setCount] = useState(0);

  return (
      <Hero/>
    // <div className="z-0 h-screen bg-[url('https://www.smartertravel.com/wp-content/uploads/2020/03/ST_ZoomBackground_Beach03.jpg')] bg-cover">
    // <div className='z-1 h-screen bg-black/[.4]'>

    // </div>
    // </div>
  )
}

export default App
