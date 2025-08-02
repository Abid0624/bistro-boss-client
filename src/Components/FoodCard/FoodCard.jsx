import React from "react";

const FoodCard = ({ item }) => {
  const { image, name, price, recipe } = item;
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure>
        <img src={image} alt="Menu" />
        <p className="absolute bg-slate-900 px-3 py-1 text-white right-0 mr-5 -mt-16">
          ${price}
        </p>
      </figure>
      <div className="card-body justify-center items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button className="btn hover:bg-black border-b-4 border-yellow-600 text-yellow-600 border-0 btn-outline">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
