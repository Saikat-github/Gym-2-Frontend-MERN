import { useContext, useState } from "react";
import {
  Dumbbell, Menu, X, Home,
  CreditCard,
  User,
  Ticket,
  BarChart3,
} from "lucide-react";
import { NavLink } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import Logout from "../auth/Logout";





const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  // const isAuthenticated = true;


  const navItems = [
    {
      name: "Home",
      icon: <Home className="w-4 h-4" />,
      path: "/",
      show: true
    },
    {
      name: "Day Pass",
      path: "/day-pass",
      icon: <Ticket className="w-4 h-4" />,
      show: isAuthenticated
    },
    {
      name: "Plans",
      icon: <BarChart3 className="w-4 h-4" />,
      path: "/plans",
      show: !isAuthenticated
    },
    {
      name: "Pay Online",
      icon: <CreditCard className="w-4 h-4" />,
      path: "/plans",
      show: isAuthenticated
    },
    {
      name: "Profile",
      icon: <User className="w-4 h-4" />,
      path: "/profile",
      show: isAuthenticated
    },
  ]



  return (
    <nav className="shadow-md sticky top-0 z-50 backdrop-blur-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between">
          <NavLink to={"/"} className="flex items-center">
            <Dumbbell className="h-8 w-8 " />
            <span className="ml-2 text-2xl font-bold text-white">Minimalist Gyms</span>
          </NavLink>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex gap-2 items-center text-sm px-1 py-2 hover:text-white ${isActive ? "text-white" : "text-white/80"} ${!item.show && "hidden"}`
                }
              >
                <div className="p-2 bg-white/10 rounded-full flex items-center justify-cente">
                  {item.icon}
                </div>
                {item.name}
              </NavLink>
            ))}
            <Logout isAuthenticated={isAuthenticated} setMobileMenuOpen={setMobileMenuOpen} />
          </div>


          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md hover focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>



      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden h-screen">
          <div className="px-2 py-2 space-y-4 h-4 sm:px-3 flex flex-col items-center">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex gap-2 items-center hover:text-white ${isActive ? "text-white": "text-white/80"} ${!item.show && "hidden"}`
                }
              >
                <div className="p-2 bg-white/10 rounded-full flex items-center justify-cente">
                  {item.icon}
                </div>
                {item.name}
              </NavLink>
            ))}
            <Logout isAuthenticated={isAuthenticated} setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
