import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo, LogoutBtn, Container } from "../index";
import { useSelector } from "react-redux";
import { AlignRight, X } from "lucide-react";
import ThemeButton from "../ThemeButton";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "my post",
      slug: "/my-post",
      active: authStatus,
    },
  ];

  return (
    <header
      className="py-3 sticky top-0 z-50 shadow "
      style={{ backgroundColor: "#1b1a1d" }}
    >
      <Container>
        <nav className="relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <Logo className="h-6 w-6 sm:h-8 sm:w-10" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-400 hover:text-white focus:outline-none"
              >
                {menuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <AlignRight className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-2">
            <div
                className=" z-10 flex items-center justify-center 
                   transition-all duration-300"
              >
                <ThemeButton />
                </div>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          `inline-block px-6 py-2 
                          ${isActive ? "text-orange-600" : "text-slate-200"}
                          duration-200 hover:text-blue-700 rounded-full`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden absolute left-0 right-0 bg-[#1b1a1d] border-b border-red-300 shadow-lg transition-all duration-300 ease-in-out ${
              menuOpen
                ? "opacity-100 visible top-full"
                : "opacity-0 invisible -top-4"
            }`}
          >
            <ul className="py-2 px-4 space-y-2">
              <div
                className=" z-10 flex items-center justify-center 
                   transition-all duration-300"
              >
                <ThemeButton />
              </div>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-md
                          ${isActive ? "text-orange-600" : "text-slate-200"}
                          duration-200 hover:text-blue-700`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="pt-2">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
