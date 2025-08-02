import React from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, text, img }) => {
  return (
    <div className="pt-8 space-y-14">
      {title && <Cover img={img} title={title} text={text}></Cover>}
      <div className="w-5/6 mx-auto grid md:grid-cols-2 gap-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="w-5/6 mx-auto mb-20">
        <Link to={`/order/${title}`}>
          <button className="btn border-b-4 border-0 btn-outline">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
