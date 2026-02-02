import { Loader2 } from "lucide-react"


const ButtonControls = ({ loader, profileData, navigate }) => {

    return (
        <div className="flex items-center gap-2">
            <button type="submit" disabled={loader} className="bg-white/90 hover:bg-white text-black/90 rounded-full px-6 py-2 flex items-center justify-center cursor-pointer">
                {loader ? <Loader2 className="w-4 h-4 animate-spin" /> : (profileData ? "Update" : "Submit")}
            </button>

            {profileData && (
                <button type="button" onClick={() => navigate("/profile")} className="border  text-gray-200 rounded-full px-6 py-2 hover:bg-white/10 cursor-pointer">
                    Cancel
                </button>
            )}
        </div>
    )
}

export default ButtonControls