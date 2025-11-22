import React from "react";
import Icon from "./Icon";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 text-3xl font-bold">
      <div className="w-8">
        <Icon />
      </div>
      <div className="text-[#BC9AF4]">
        Post<span className="text-[#FD8F01]">Grid</span>
      </div>
    </div>
  );
};

export default Logo;
