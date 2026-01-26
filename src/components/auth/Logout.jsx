import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Loader2, LogIn, Power } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'



const Logout = ({ isAuthenticated, setMobileMenuOpen }) => {
    const [loader, setLoader] = useState(false);
    const { backendUrl, user, setUser } = useContext(AuthContext);


    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            setLoader(true);
            const { data } = await axios.get(backendUrl + "/api/user/logout", { withCredentials: true })
            if (data.success) {
                setUser(null);
                toast.success(data.message);
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoader(false);
            setMobileMenuOpen(false);
        }
    }


    return (
        <>
            {
                user
                    ?

                    <button
                        disabled={loader}
                        onClick={handleLogout}
                        className="flex gap-2 items-center px-3 py-2 hover:text-white cursor-pointer"
                    >
                        <Power className="w-4 text-white/85" />
                        {loader ? <Loader2 className='w-4 animate-spin' /> : "Logout"}
                    </button>
                    :
                    <NavLink
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex gap-2 items-center px-1 py-1 hover:text-white mx-auto ${isActive ? "text-white" : "text-white/80"}`
                        }
                    >
                        <div className="p-2 bg-white/10 rounded-full flex items-center justify-cente">
                             <LogIn className="w-4 h-4 text-white/90" />
                        </div>
                       
                        Login
                    </NavLink>

            }
        </>
    )
}

export default Logout