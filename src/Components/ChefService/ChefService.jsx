import React from "react";
import image from "../../assets/home/chef-service.jpg";

const ChefService = () => {
  return (
    <div
      className="w-full lg:px-24 lg:py-32 md:px-16 md:py-32 px-6 py-16 bg-center bg-cover h-[28rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="bg-white/20 backdrop-blur-lg flex text-center items-center">
        <div className="lg:px-16 px-4 py-3 lg:py-12">
          <h4 className="text-2xl font-semibold mb-4">Bistro Boss</h4>
          <p>
            Meet our world-class chefs who bring passion and creativity to every
            dish. With years of culinary experience and a love for flavor, they
            craft unforgettable meals that delight the senses. From traditional
            favorites to modern masterpieces, our chefs ensure every bite is a
            perfect blend of taste and art.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChefService;
