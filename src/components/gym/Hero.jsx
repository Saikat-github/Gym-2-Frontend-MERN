import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat relative min-h-screen"
      style={{ backgroundImage: `url(${assets.Hero1})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="h-screen relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex justify-center items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
            Minimalist Gym
          </h1>
          <p className="text-lg mb-8 hidden sm:block text-center">
            Transform Your Body, Transform Your Life
          </p>
          <div className="flex justify-center gap-4 sm:text-2xl sm:font-bol">
            <Link to={"/plans"} className="px-4 py-1 sm:px-10 sm:py-2 bg-gradient-to-r from-red-600 to-orange-600
                hover:from-red-500 hover:to-orange-500  rounded-full hover:text-white hover:bg-transparent transition-all duration-300 max-sm:text-sm">
              Join Now
            </Link>
            <Link to={"/about"} className="px-4 py-1 sm:px-10 sm:py-2  rounded-full bg-gradient-to-r 
                hover:from-red-600 hover:to-orange-600 text-white transition-all duration-300 max-sm:text-sm border-2 border-red-600/60">
              Know More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
