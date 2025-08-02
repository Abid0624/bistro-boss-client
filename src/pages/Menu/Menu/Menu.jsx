import React from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/menu-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover
        img={menuImg}
        title="Our Menu"
        text="Would you like to try a dish?"
      ></Cover>
      {/* main cover */}
      <SectionTitle
        subheading="Don't Miss"
        heading="Today's Offer"
      ></SectionTitle>
      {/* offered items */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory
        items={desserts}
        title="dessert"
        text="Indulge in our sweet treats, from creamy cheesecakes to rich chocolate delights. Each dessert is lovingly crafted to give you the perfect end to your meal."
        img={dessertImg}
      ></MenuCategory>
      {/* pizza menu items */}
      <MenuCategory
        items={pizza}
        title="pizza"
        text="Enjoy our oven-baked pizzas with perfectly melted cheese, bold sauces, and fresh toppings. Whether classic or creative, each slice delivers the ultimate comfort and flavor."
        img={pizzaImg}
      ></MenuCategory>
      {/* salad menu items */}
      <MenuCategory
        items={salad}
        title="salad"
        text="Fresh, vibrant salads loaded with greens, veggies, and flavorful dressings. A healthy, colorful choice that’s as delicious as it is satisfying—perfect for any meal."
        img={saladImg}
      ></MenuCategory>
      {/* soup menu items */}
      <MenuCategory
        items={soup}
        title="soup"
        text="Warm up with our homemade soups, slow-cooked to perfection. From creamy to brothy, every bowl is rich in taste and full of nourishing ingredients."
        img={soupImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
