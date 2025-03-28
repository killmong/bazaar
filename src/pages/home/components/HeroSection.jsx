import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="innerWrapper bg-white">
      <div className="">
        <h1 className="text-7xl capitalize text-center font-extrabold">
          unleash your <br /> inner beauty
        </h1>
      </div>

      <div className="flex paddingWrapper justify-between gap-4 items-center flex-col lg:flex-row">
        <div className="flex flex-col gap-2 ">
          <p className="text-xl w-[400px] font-light">
            our product is made with the finest natural and organic,carefully
            chosen for their proven benefits to the skin and hair
          </p>
          <Link className="btn btn-primary">View Products</Link>
        </div>
        <div className="lg:w-[600px] w-full h-full pd lg:h-[600px] border border-none bg-black  rounded-full ">
          <img
            className="rounded-full w-[400px] h-[600px] "
            src="pexels-shiny-diamond-3762879.jpg"
            alt=""
          />
        </div>
        <div>
          <div className="border-2  flex flex-col border-t-0 border-l-0 border-r-0 border-b-amber-600">
            <div className="flex gap-3 ">
              <h2 className="text-4xl font-bold">4.9</h2>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    <img
                      className="w-[20px] "
                      src="/public/svg/star-svgrepo-com.svg"
                      alt="star"
                    />
                  </span>
                ))}{" "}
              </div>
            </div>
            <p className="text-xl">5K reveiws</p>
          </div>

          <h4 className="text-4xl font-bold ">20K+ </h4>
          <p className="text-base capitalize"> happy customers</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
