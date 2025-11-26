"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { BsLightningFill } from "react-icons/bs";
import { FaMagic } from "react-icons/fa";

import "animate.css";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero hero-bg min-h-lg bg-base-200/50 backdrop-blur-lg py-14 rounded-xl">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h4 className="text-2xl md:text-3xl font-bold flex items-center gap-1 justify-center">
            Welcome to
            <div className="text-[#BC9AF4]">
              Post<span className="text-[#FD8F01]">Grid</span>
            </div>
          </h4>
          <div className="py-6">
            <h4 className="text-lg font-semibold">
              <BsLightningFill
                size={30}
                className="mt-0.5 text-secondary inline mr-1.5"
              />
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
            </h4>
          </div>
          <Link
            className="btn btn-primary animate__animated animate__heartBeat animate__infinite animate__slower"
            href="/add-post"
          >
            <FaMagic />
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
