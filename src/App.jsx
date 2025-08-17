import { useState } from 'react'
import './App.css'
import './index.css'
import NavBar from './component/NavBar'
import HeroSection from './component/HeroSection'

function App() {

  return (
    <div className='min-h-screen'>
      <NavBar/>
      <div className='max-w-[768px] md:max-w-[1200px] mx-auto md:px-6'>
        <HeroSection/>
      </div>
    </div>
  )
}

export default App
