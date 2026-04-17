import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ isMenuOpen, setIsMenuOpen, primaryColor }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (location.pathname === "/admin" || location.pathname === "/admin/login")
    return null;

  const darkenColor = (hex, amount = 0.15) => {
    if (!hex) return hex;

    const cleanHex = hex.replace("#", "");
    const r = Math.floor(parseInt(cleanHex.slice(0, 2), 16) * (1 - amount));
    const g = Math.floor(parseInt(cleanHex.slice(2, 4), 16) * (1 - amount));
    const b = Math.floor(parseInt(cleanHex.slice(4, 6), 16) * (1 - amount));

    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  };

  const adminBg = isAuthenticated ? darkenColor(primaryColor) : primaryColor;

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="./logo.png" alt="Logo" className="w-12" />
          <span className="font-bold text-2xl">Arova</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {["Home", "About", "Team", "Blog", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:opacity-80 transition"
            >
              {item}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-6 px-6">
          <div className="flex flex-col gap-4 mt-4">
            {["Home", "About", "Team", "Blog", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:opacity-80 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
