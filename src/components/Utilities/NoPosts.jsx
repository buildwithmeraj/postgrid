import React from "react";
import { Fade } from "react-awesome-reveal";
import { PiWarningOctagonBold } from "react-icons/pi";

const NoPosts = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <Fade cascade>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex items-center flex-col text-base-content/70">
          <PiWarningOctagonBold size={100} className="" />
          <p className="text-2xl font-semibold">No posts found</p>
        </div>
      </Fade>
    </div>
  );
};

export default NoPosts;
