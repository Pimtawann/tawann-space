import './index.css'
import { NavBar } from './components/NavBar'
import { HeroSection } from './components/HeroSection'
import { Footer } from './components/Footer'

function App() {

  return (
    <div className='min-h-screen'>
      <NavBar/>
      <div className='max-w-[768px] md:max-w-[1200px] mx-6 md:px-6 md:mx-auto'>
        <div>
          <HeroSection/>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default App
