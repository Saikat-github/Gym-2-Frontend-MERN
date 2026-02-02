import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Loader2, LogIn, Power } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'



const Logout = ({ isAuthenticated, setMobileMenuOpen }) => {
    const [loader, setLoader] = useState(false);
    const { backendUrl, user, setUser, setProfileData } = useContext(AuthContext);


    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            setLoader(true);
            const { data } = await axios.get(backendUrl + "/api/user/logout", { withCredentials: true })
            if (data.success) {
                setUser(null);
                setProfileData(null)
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
            setMobileMenuOpen(false);
        }
    }


    return (
        <div className="max-md:bg-black/90 px-4 py-2 max-md:rounded-full">
            {
                user
                    ?

                    <button
                        disabled={loader}
                        onClick={handleLogout}
                        className="flex gap-2 items-center hover:text-white cursor-pointer"
                    >
                        <Power className="w-4 h-4 text-white/90" />
                        {loader ? <Loader2 className='w-4 animate-spin' /> : "Logout"}
                    </button>
                    :
                    <NavLink
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex gap-4 items-center hover:text-white mx-auto ${isActive ? "text-white" : "text-white/80"}`
                        }
                    >
                        <LogIn className="w-4 h-4 text-white/90" />
                        Login
                    </NavLink>

            }
        </div>
    )
}

export default Logout