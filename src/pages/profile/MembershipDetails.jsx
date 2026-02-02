import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { User, CalendarClock, Clock, Clipboard } from "lucide-react";
import { formatDate, capitalizeFirstLetter } from '../../utils/utilFunctions';
import { useNavigate } from 'react-router-dom';




const MembershipDetails = () => {
  const { profileData } = useContext(AuthContext);
  const navigate = useNavigate()


  if (!profileData) {
    return <p className='text-center text-sm my-20 text-slate-700'>No Payment History Found <br />
      Please complete your profile on <span onClick={() => navigate("/profile")} className='text-indigo-600 cursor-pointer'>profile page.</span></p>
  }



  return (
    <div className="flex flex-col items-center justify-center text-xs sm:text-sm px-2 py-24">
      <h1 className='text-center text-2xl my-6 font-semibold'>Membership Details</h1>
      {profileData?.membership?.status !== "active" ? (
        <div className="p-2 rounded max-w-2xl text-center mx-2 sm:mx-auto flex flex-col gap-2 border border-red-600/50 bg-red-700/15 my-10 ">
            You don't have any active membership, {profileData.membership.endDate ? `your membership expired on ${formatDate(profileData.membership.endDate)}` : "please buy a membership plan to continue using our gym services."}{" "}
            <Link to="/plans" className="underline">
              Click Here
            </Link>
        </div>
      )
        :
        <div className='flex flex-col gap-4 my-4 p-2 sm:p-6 rounded border border-white/10 shadow-xl shadow-white/5'>
          <p className='flex gap-2 items-center'>
            <User className='w-5 text-green-600' />Membership : Active
          </p>
          <p className='flex gap-2 items-center'>
            <Clipboard className='w-5 text-green-600' />Plan : {capitalizeFirstLetter(profileData?.membership?.planType)}
          </p>
          <p className='flex gap-2 items-center'>
            <Clock className='w-5 text-green-600' />Last Payment On : {formatDate(profileData?.membership?.lastPaymentDate)}
          </p>
          <p className='flex gap-2 items-center'>
            <CalendarClock className='w-5 text-green-600' />Expires on : {formatDate(profileData?.membership?.endDate)}
          </p>
        </div>
      }


      <div className='flex gap-4 text-sm'>
        <Link to={"/profile"} className='flex items-center gap-2 px-6 py-1.5 rounded-full transition duration-200 cursor-pointer hover:opacity-90 border border-white/40'>Back</Link>
        <Link to={"/plans"} className='flex items-center gap-2 px-6 py-1.5 rounded-full transition duration-200 cursor-pointer hover:opacity-90 bg-white/90 text-black/90'>Renew Plan</Link>
      </div>
    </div>

  )
}

export default MembershipDetails