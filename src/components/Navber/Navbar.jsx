import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { LuLeaf, LuMenu, LuX } from 'react-icons/lu';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1"
              : "text-gray-700"
          }
        >
          Home
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/update-profile"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1"
                  : "text-gray-700"
              }
            >
              Update Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-bold border-b-2 border-teal-600 pb-1"
                  : "text-gray-700"
              }
            >
              My Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <LuLeaf className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-bold text-gray-900">
              EcoAdventure
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6">{navLinks}</ul>

            {user ? (
              <div className="flex items-center gap-4">
                <img
                  src={user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  className="w-10 h-10 rounded-full"
                  alt="user"
                />

                <button
                  onClick={logOut}
                  className="btn bg-slate-800 text-white border-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn bg-teal-600 text-white border-none"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-900"
          >
            {isOpen ? <LuX /> : <LuMenu />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col p-4 gap-3">

            {navLinks}

            <div className="border-t pt-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      className="w-10 h-10 rounded-full"
                      alt="user"
                    />
                    <span className="font-semibold">
                      {user?.displayName || "User"}
                    </span>
                  </div>

                  <button
                    onClick={logOut}
                    className="btn w-full bg-slate-800 text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn w-full bg-teal-600 text-white"
                >
                  Login
                </Link>
              )}
            </div>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;