import { Link } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";

const NavBar = ({ cartCount, user, onLogout }) => {
  const [menu, setMenuOpen] = useState(false);

  const handleNav = () => setMenuOpen(!menu);
  const closeMenu = () => setMenuOpen(false);

  const handleLogoutClick = () => {
    onLogout();
    closeMenu();
  };

  return (
    <div className="flex justify-between items-center h-24 mx-auto px-4 text-white fixed top-0 left-0 w-full z-50 bg-black">
      
      {/* LOGO */}
      <h1 className="text-3xl font-bold text-[#00df9a]">
        <Link to="/" onClick={closeMenu}>FitVerse</Link>
      </h1>

      {/* DESKTOP MENU */}
      <ul className="hidden md:flex items-center">
        <li className="p-4"><Link to="/">Home</Link></li>
        <li className="p-4"><Link to="/about">About</Link></li>
        <li className="p-4"><Link to="/contact">Contact</Link></li>

        {user && (
          <>
            <li className="p-4"><Link to="/services">Services</Link></li>
            <li className="p-4"><Link to="/equipments">Equipments</Link></li>

            <li className="p-4 ml-4 cursor-pointer relative">
              <Link to="/cart">
                <AiOutlineShoppingCart size={25} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#00df9a] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </>
        )}

        {/* ADMIN LINK */}
        {user?.UserType === "admin" && (
          <li className="p-4">
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        )}

        {/* LOGIN / LOGOUT */}
        {user ? (
          <li className="p-4">
            <button
              onClick={onLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout ({user.Username})
            </button>
          </li>
        ) : (
          <li className="p-4">
            <Link
              to="/login"
              className="bg-[#00df9a] text-black px-4 py-2 rounded-lg hover:bg-[#00c785] transition duration-300"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* MOBILE MENU ICON */}
      <div onClick={handleNav} className="block cursor-pointer md:hidden z-10">
        {menu ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/* MOBILE MENU */}
      <div
        className={
          menu
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="text-3xl font-bold text-[#00df9a] m-4">FitVerse</h1>

        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600">
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/about" onClick={closeMenu}>About</Link>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
          </li>

          {user && (
            <>
              <li className="p-4 border-b border-gray-600">
                <Link to="/services" onClick={closeMenu}>Services</Link>
              </li>
              <li className="p-4 border-b border-gray-600">
                <Link to="/equipments" onClick={closeMenu}>Equipments</Link>
              </li>
              <li className="p-4 border-b border-gray-600">
                <Link to="/cart" onClick={closeMenu}>
                  Cart ({cartCount})
                </Link>
              </li>
            </>
          )}

          {user?.UserType === "admin" && (
            <li className="p-4 border-b border-gray-600">
              <Link to="/admin" onClick={closeMenu}>Admin Dashboard</Link>
            </li>
          )}

          {user ? (
            <li className="p-4 border-b border-gray-600">
              <button
                onClick={handleLogoutClick}
                className="text-red-500 w-full text-left"
              >
                Logout ({user.Username})
              </button>
            </li>
          ) : (
            <li className="p-4 border-b border-gray-600">
              <Link to="/login" onClick={closeMenu}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
