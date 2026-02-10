import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from 'lucide-react'
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import GoogleLogo from "../../assets/google2.svg";



const Login = ({ setState, navigateTo }) => {
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { backendUrl, checkAuthStatus, axiosInstance } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        window.location.href = `${backendUrl}/api/user/google`;
    };

    const onSubmit = async (data) => {
        try {
            setLoader(true);
            const response = await axiosInstance.post("/api/user/login", data);

            if (response.data.success) {
                await checkAuthStatus()
                navigate(navigateTo, { replace : true })
            } else {
                toast.error(response.data.errors ? response.data.errors[0].msg : response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            console.error("Error:", error);
        } finally {
            setLoader(false);
            reset();
        }
    };


    return (
            <div className="flex flex-col gap-2">
                <p className="text-center my-1 text-2xl font-semibold">Login</p>
                <div className="oauth flex flex-col gap-4 items-center">
                    <button
                        onClick={handleGoogleLogin}
                        className="max-w-60 max-sm:text-xs px-4 py-2 flex gap-2 justify-center items-center rounded-full transition-all duration-300 bg-white/90 text-sm text-black/80 hover:opacity-80 cursor-pointer"
                    >
                        <img className="w-8" src={GoogleLogo} alt="" />
                        Continue With Google
                    </button>
                </div>
                <div className="my-4 flex gap-4 items-center">
                    <hr className="bg-white/80 h-0.5 border-0 flex-grow" />
                    <span className="mx-2">Or</span>
                    <hr className="bg-white/80 h-0.5 border-0 flex-grow" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <input
                            type="email"
                            placeholder='Enter email'
                            {...register("email", { required: true })}
                            className="bg-white/10 rounded px-3 py-2 w-full outline-none"
                        />
                    </div>
                    <div className="space-y-1">
                        <input
                            type="password"
                            placeholder='Enter password'
                            {...register("password", { required: true })}
                            className="bg-white/10 rounded px-3 py-2 w-full outline-none"
                        />
                    </div>

                    <button
                        disabled={loader}
                        className={`cursor-pointer hover:opacity-80 text-center w-full bg-white/90 text-black/80 rounded-sm py-2 hover:bg-opacity-85 transition-all duration-300 ${loader && "bg-opacity-85"
                            } flex justify-center items-center`}
                    >
                        {loader ? (
                            <Loader2 className="w-4 animate-spin" />
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <div className="text-xs flex gap-1">
                    <p>Don't have an account?</p>
                    <span
                        onClick={() => setState("Signup")}
                        className="text-blue-600/70 cursor-pointer hover:underline"
                    >
                        Click here
                    </span>
                </div>
                <p className="text-xs cursor-pointer text-blue-600/70 hover:underline" onClick={() => navigate("/forget-password")}>
                    Forget Password
                </p>
            </div>
    )
}

export default Login