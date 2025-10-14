import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    // console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      // send data to the db
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        // reset();
        // show success showup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };
  return (
    <div className="mx-2 lg:mx-20">
      <SectionTitle
        heading="UPDATE AN ITEM"
        subheading="Refresh Info"
      ></SectionTitle>
      <div className="bg-[#F3F3F3] p-2 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset w-full">
            <div className="my-6">
              <label className="label text-black font-semibold text-lg">
                Recipe Name*
              </label>
              <input
                type="text"
                defaultValue={name}
                className="input mt-2 w-full"
                {...register("name", { required: true })}
                placeholder="Recipe Name"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* category */}
              <div className="w-full">
                <label className="label text-black font-semibold text-lg">
                  Category*
                </label>
                <select
                  {...register("category", { required: true })}
                  defaultValue={category}
                  className="select mt-2 select-neutral"
                >
                  <option value="category" disabled>
                    Select a category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>

              {/* price */}
              <div className=" w-full">
                <label className="label text-black font-semibold text-lg">
                  Price*
                </label>
                <input
                  type="number"
                  step="any"
                  defaultValue={price}
                  className="input mt-2 w-full"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Price"
                />
              </div>
            </div>
            {/* recipe details */}
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold text-lg">
                  Recipe Details
                </legend>
                <textarea
                  defaultValue={recipe}
                  {...register("recipe")}
                  className="textarea mt-2 w-full h-24"
                  placeholder="Recipe Details"
                ></textarea>
              </fieldset>
            </div>
            <div className="w-full my-6">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input"
              />
            </div>
          </fieldset>

          <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
            Update Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
