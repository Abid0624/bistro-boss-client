import { useForm } from "react-hook-form";
import bgImg from "../../assets/others/authentication.png";
import signupImg from "../../assets/others/authentication2.png";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then(() => {
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log("user profile info updated");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Created Successfully!!!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        })
        .catch((err) => console.log(err));
    });
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();

      Swal.fire({
        title: "User Sign Up Successful!!!",
        showClass: {
          popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `,
        },
        hideClass: {
          popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `,
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div
        className="hero px-4 py-6 md:px-16 md:py-20 min-h-screen"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <div
          className="hero-content gap-8 px-3 py-4 md:px-8 md:py-10 shadow-2xl flex-col lg:flex-row-reverse"
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        >
          <div className="flex justify-center items-center md:w-1/2 lg:text-left">
            <img className="w-2/3" src={signupImg} alt="" />
          </div>
          <div className="card bg-base-100 md:w-1/2 max-w-sm  shadow-2xl">
            <h1 className="md:text-5xl text-center text-3xl mt-4 font-bold">
              Sign up now!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  name="name"
                  {...register("name", { required: true })}
                  type="name"
                  className="input"
                  placeholder="Name"
                />
                {errors.name && (
                  <span className="text-red-600 mt-1">Name is required</span>
                )}
                <label className="label">Photo URL</label>
                <input
                  {...register("photoURL", { required: true })}
                  type="name"
                  className="input"
                  placeholder="Photo URL"
                />
                {errors.photoURL && (
                  <span className="text-red-600 mt-1">
                    Photo URL is required
                  </span>
                )}
                <label className="label">Email</label>
                <input
                  name="email"
                  {...register("email", { required: true })}
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-600 mt-1">Emal is required</span>
                )}
                <label className="label">Password</label>
                <input
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                    maxLength: 20,
                  })}
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required!</p>
                )}
                {errors.password?.type === "minLengt" && (
                  <p className="text-red-600">Password must be 6 characters!</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters!
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one upper case,one lower case,one number
                    and one special character!
                  </p>
                )}

                <input
                  className="btn bg-[#D1A054] mt-4"
                  type="submit"
                  value="Sign Up"
                />
              </fieldset>
            </form>
            <div className="flex justify-center items-center flex-col">
              <div>
                <span className="text-[#D1A054]">Already have an account</span>{" "}
                <Link to="/signup">
                  <span className="text-[#D1A054] font-bold">Login Now</span>
                </Link>
              </div>
              <div className="divider mx-10">OR</div>
              <div
                onClick={handleGoogleSignIn}
                className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg mb-6  hover:bg-gray-50 "
              >
                <div className="px-4 py-2">
                  <svg className="w-6 h-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>

                <span className="w-5/6 px-4 py-3 font-bold text-center">
                  Sign in with Google
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
