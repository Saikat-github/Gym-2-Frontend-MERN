import { useContext, useState } from 'react'
import { Footer, Navbar, ScrollToTop } from './components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './context/AuthContext'
import { Loader2 } from 'lucide-react'


function App() {
  const { loader } = useContext(AuthContext);

  return (
    <div className='font-family-inter bg-black/95
 text-white/90 max-sm:text-sm'>
      <Navbar />
      <ToastContainer />
      <main className='min-h-screen'>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>


  )
}

export default App
