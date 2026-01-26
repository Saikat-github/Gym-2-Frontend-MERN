import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat relative sm:h-screen"
      style={{ backgroundImage: `url(${assets.Hero1})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-xl sm:text-4xl md:text-6xl font-bold mb-4">
              Transform Your Body, Transform Your Life
            </h1>
            <p className="text-lg mb-8 hidden sm:block">
              Join Mininmalist Gym today and start your fitness journey with our state-of-the-art equipment and expert trainers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={"/plans"} className="px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500
                hover:from-red-600 hover:to-orange-600  rounded-full hover:text-white hover:bg-transparent transition-all duration-300 max-sm:text-sm">
                Join Now
              </Link>
              <Link to={"/about"} className="px-4 py-1  rounded-full bg-gradient-to-r 
                hover:from-red-600 hover:to-orange-600 text-white transition-all duration-300 max-sm:text-sm border-2 border-red-600/60">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
