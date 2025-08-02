import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="my-20 bg-fixed featured-item text-white pt-8">
      <SectionTitle
        heading="Featured Item"
        subheading="check it out"
      ></SectionTitle>
      <div className="md:flex justify-center items-center bg-slate-500/10 py-auto px-8 lg:py-20 lg:px-36 gap-10">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className="space-y-2">
          <p>Aug 20, 2029</p>
          <p className="uppercase text-xl">Where can i get some?</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quam
            accusantium necessitatibus inventore exercitationem ab quae ea
            quisquam aliquid et? Tempore impedit recusandae unde officia
            accusamus esse veniam provident consequatur. Sint ducimus unde atque
            omnis exercitationem eaque in, amet, incidunt libero molestias nam
            temporibus officiis est. Iusto consequuntur debitis quod.
          </p>
          <button className="btn border-b-4 border-0 btn-outline">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
