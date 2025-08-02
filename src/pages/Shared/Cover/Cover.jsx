import React from "react";
import { Parallax } from "react-parallax";

const Cover = ({ img, title, text }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt="the dog"
      strength={-200}
    >
      <div className="hero h-[400px] md:h-[700px]">
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content w-4/6 mx-auto  bg-black/50  text-center">
          <div className="px-2 py-4 md:px-24 md:py-10">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5 uppercase">{text}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
