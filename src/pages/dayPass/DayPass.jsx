import { Link } from "react-router-dom";
import { Ticket, Download } from "lucide-react";




export default function DayPass() {

  return (
    <div className="flex flex-col gap-10 items-center justify-center py-24">
      <Link
        to="/day-pass/buy-pass"
        className="flex items-center gap-2 px-6 py-2 transition-all duration-300 rounded-full border border-white/20 hover:bg-white/90 hover:text-black"
      >
        <Ticket className="w-4 h-4" />
        Buy Day-Pass
      </Link>

      <Link
        to="/day-pass/all-passes"
        className="flex items-center gap-2 px-6 py-2 transition-all duration-300 rounded-full border border-white/20 hover:bg-white/90 hover:text-black"
      >
        <Download className="w-4 h-4" />
        Your Day-Passes
      </Link>
    </div>
  )


}