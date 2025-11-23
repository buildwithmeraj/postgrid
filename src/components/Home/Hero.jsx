"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { BsLightning, BsLightningFill } from "react-icons/bs";

const Hero = () => {
  return (
    <div className="hero hero-bg min-h-lg bg-base-200/50 backdrop-blur-lg py-14 rounded-xl">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold flex items-center gap-1 justify-center">
            Welcome to
            <div className="text-[#BC9AF4]">
              Post<span className="text-[#FD8F01]">Grid</span>
            </div>
          </h1>
          <div className="py-6">
            <h3 className="text-lg flex items-center gap-1">
              <BsLightningFill size={30} className="mt-1 text-secondary" />
              <Typewriter
                className="text-accent"
                cursor
                cursorBlinking
                delaySpeed={1000}
                deleteSpeed={25}
                loop={0}
                typeSpeed={75}
                words={[
                  "Turn your thoughts into stories worth sharing.",
                  "Because every idea deserves a home.",
                  "Express freely. Inspire deeply.",
                  "Stories that spark conversations.",
                  "Ideas live longer when shared.",
                  "A platform built for thinkers and storytellers.",
                ]}
              />
            </h3>
          </div>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
