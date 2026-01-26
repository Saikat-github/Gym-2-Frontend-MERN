import React from 'react'
import { Dumbbell, Clock, Users } from 'lucide-react'


const Features = () => {
  return (
    <div className="py-12 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold">Why Choose Minimalist?</h2>
          <p className="mt-4 text-lg ">We provide everything you need to achieve your fitness goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-purple-600/30 bg-purple-800/5 rounded-2xl">
            <Dumbbell className="h-8 w-8 bg-purple-600/20 p-1 rounded-full mb-4 text-purple-600/40" />
            <h3 className="text-xl font-semibold mb-2">Modern Equipment</h3>
            <p className="">State-of-the-art fitness equipment to help you reach your goals faster.</p>
          </div>

          <div className="p-6 border border-indigo-600/30 bg-indigo-800/5 rounded-2xl">
            <Clock className="h-8 w-8 bg-indigo-600/20 p-1 rounded-full mb-4 text-indigo-600/40" />
            <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
            <p className="">Open 24/7 to accommodate your busy schedule and lifestyle.</p>
          </div>

          <div className="p-6 border border-teal-600/30 bg-teal-800/5 rounded-2xl">
            <Users className="h-8 w-8 bg-teal-600/20 p-1 rounded-full mb-4 text-teal-600/40" />
            <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
            <p className="">Certified fitness professionals to guide and motivate you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features