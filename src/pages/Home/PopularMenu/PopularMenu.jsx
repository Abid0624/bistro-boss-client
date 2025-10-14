import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { Link, NavLink } from "react-router-dom";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <div className="my-10  w-5/6 mx-auto">
      <SectionTitle
        heading="From Our Menu"
        subheading="Popular Items"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-10">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <NavLink to="/menu">
          <button className="btn border-b-4 border-0 btn-outline">
            View Full Menu
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default PopularMenu;
