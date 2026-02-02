import { useState, useEffect } from 'react'
import { Footer, Navbar, ScrollToTop } from './components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'



function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > lastScrollY && window.scrollY > 80) {
  //       setShowNavbar(false);
  //     } else {
  //       setShowNavbar(true);
  //     }
  //     setLastScrollY(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div className='font-family-inter bg-black/95
 text-white/95 max-sm:text-sm'>
      <Navbar visible={showNavbar} />
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
