import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';


const ProtectedDocRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loader } = useContext(AuthContext);

  if (loader) {
    return <div className='flex flex-col justify-center items-center h-screen gap-4 text-white/50'>
      <Loader2 className='h-8 w-8 animate-spin' />
      <p>Checking authentication...</p>
    </div>
  }

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};


export default ProtectedDocRoute;