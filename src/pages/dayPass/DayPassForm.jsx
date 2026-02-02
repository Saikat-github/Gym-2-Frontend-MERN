import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Phone, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';




const DayPassForm = () => {
  const [loader, setLoader] = useState(false);
  const [amount, setAmount] = useState(99);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { user, plans } = useContext(AuthContext);
  const dayPass = plans.find(plan => plan.title === "day-pass");


  if (!dayPass) {
    return <p className="text-center text-gray-400">Day Pass plan not found!</p>;
  }


  const onSubmit = async (data) => {
    navigate('/payment-page', {
      state:
      {
        plan: dayPass,
        email: user.email,
        name: data.name,
        navigateTo: "/day-pass/all-passes",
        dayPassData: {
          ...data,
          email: user.email
        }
      }
    });
  }


  return (
    <div className='py-24 px-2'>
      <div className="relative border border-white/15 p-6 rounded-lg max-w-md mx-auto text-sm shadow-xl shadow-white/5">
        <X
          onClick={() => navigate('/day-pass')}
          className='w-6 absolute right-2 top-0.5 cursor-pointer' />
        <h2 className="text-2xl font-semibold mb-2 text-center">Day Pass : ₹99/1 day</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block mb-1">Name <span className="text-red-500">*</span></label>
            <div className="flex items-center bg-white/5 rounded">
              <User className="ml-2 w-5 h-5 text-gray-400" />
              <input
                {...register('name', { required: 'Name is required', minLength: 2 })}
                className="flex-1 bg-transparent px-2 py-2 outline-none"
                placeholder="Full Name"
              />
            </div>
            {errors.name && <p className="text-red-600 text-xs sm:text-sm">{errors.name.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1">Age <span className="text-red-500">*</span></label>
            <input
              inputMode="numeric" // Mobile keyboards will show numeric keypad
              pattern="[0-9]*" // Only allow numbers
              placeholder="Age"
              {...register('age', {
                required: 'Age is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Age must be a number'
                },
                validate: {
                  min: (value) => {
                    const num = parseInt(value, 10);
                    return num >= 12 || 'Must be at least 12 years old';
                  },
                  max: (value) => {
                    const num = parseInt(value, 10);
                    return num <= 100 || 'Age must be less than 100';
                  }
                }
              })}
              className="w-full bg-white/5 rounded px-2 py-2 outline-none"
            />
            {errors.age && <p className="text-red-600 text-xs sm:text-sm">{errors.age.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1">Phone Number <span className="text-red-500">*</span></label>
            <div className="flex items-center bg-white/5 rounded">
              <Phone className="ml-2 w-5 h-5 text-gray-400" />
              <input
                {...register('phone', {
                  required: 'Phone is required',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Must start with 6‑9 and be 10 digits' },
                })}
                className="flex-1 bg-transparent px-2 py-2 outline-none"
                placeholder="e.g. 9876543210"
              />
            </div>
            {errors.phone && <p className="text-red-600 text-xs sm:text-sm">{errors.phone.message}</p>}
          </div>


          {/* Number of Days */}
          <div>
            <label className="block mb-1">Number of Days <span className="text-red-500">*</span></label>
            <input
              inputMode="numeric" // Mobile keyboards will show numeric keypad
              pattern="[0-9]*" // Only allow numbers
              placeholder="For how many days?"
              {...register('noOfDays', {
                required: 'Number of days is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Age must be a number'
                },
                validate: {
                  min: (value) => {
                    const num = parseInt(value, 10);
                    return num >= 1 || 'Must be at least 1';
                  },
                  max: (value) => {
                    const num = parseInt(value, 10);
                    return num <= 7 || 'Maximum 7 days allowed';
                  }
                }
              })}
              className="w-full bg-white/5 rounded px-2 py-2 outline-none"
              onChange={(e) => setAmount(e.target.value * 99)}
            />
            {errors.noOfDays && <p className="text-red-600 text-xs sm:text-sm">{errors.noOfDays.message}</p>}
          </div>

          {/* Terms */}
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register('terms', {
                  required: 'You must agree to the terms and conditions',
                })}
                className="form-checkbox outline-none"
              />
              <p className="ml-2">
                I agree to the{' '}
                <Link
                  to={"/terms"}
                  className="text-indigo-600 underline cursor-pointer"
                >
                  Terms and Conditions
                </Link>
              </p>
            </label>
            {errors.terms && (
              <p className="text-red-600 text-xs sm:text-sm">{errors.terms.message}</p>
            )}
          </div>


          <hr className='mt-6' />


          {/* Price (read-only) */}
          <div className="flex items-center justify-between p-3 rounded">
            <span>Sub Total :</span>
            <span className="font-semibold">₹{amount}</span>
          </div>

          <p className='text-xs border border-red-600/40 bg-red-600/5 p-2 rounded'><span className='text-red-600 text-lg'>*</span>Day passes get expired after 7 days from the date of buying, so avail your day passes within 7 days.</p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loader}
            className="disabled:opacity-50 flex items-center justify-center px-6 py-2 rounded-full transition-all duration-200 cursor-pointer mx-auto hover:opacity-80 bg-white/95 text-black"
          >
            {loader ? (
              "Navigating to payment page..."
            ) : (
              <>Buy Day Pass</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default DayPassForm