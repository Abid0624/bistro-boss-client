import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : ""
          }
        >
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/order/salad"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : ""
          }
        >
          Order Food
        </NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink
            to="/dashboard/adminHome"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-bold" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink
            to="/dashboard/userHome"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-bold" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/dashboard/cart"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : ""
          }
        >
          <FaCartShopping />
          <div className="badge badge-sm badge-secondary">+{cart.length}</div>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-black/10 backdrop-blur-sm text-white shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black lg:bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <div className="flex justify-center flex-col text-xl">
          <h3 className="font-bold">Bistro Boss</h3>
          <h3 className="font-medium">Restaurant</h3>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="flex gap-4 justify-center mr-2 items-center">
              <div className="flex justify-center items-center">
                <img
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full"
                  src={user?.photoURL}
                  alt="User profile photo"
                />
              </div>
              <span className="font-bold" onClick={handleLogout}>
                Logout
              </span>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="font-bold mr-2">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
