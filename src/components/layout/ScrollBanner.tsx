// src/components/layout/ScrollBanner.tsx
import React from "react";

const ScrollBanner = ({ message }) => {
  return (
    <div className="bg-yellow-200 text-yellow-900 py-2 overflow-hidden whitespace-nowrap relative">
      <div className="marquee inline-block">
        {message}
      </div>
    </div>
  );
};

export default ScrollBanner;