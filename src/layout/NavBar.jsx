import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = ({
  isMenuOpen,
  setIsMenuOpen,
  isAdmin,
  setShowAdminLogin,
  primaryColor,
}) => {
  const location = useLocation();
  const [isHoveringAdmin, setIsHoveringAdmin] = useState(false);

  if (location.pathname === "/admin") return null;

  const darkenColor = (hex, amount = 0.15) => {
    if (!hex) return hex;

    const cleanHex = hex.replace("#", "");
    const r = Math.floor(parseInt(cleanHex.slice(0, 2), 16) * (1 - amount));
    const g = Math.floor(parseInt(cleanHex.slice(2, 4), 16) * (1 - amount));
    const b = Math.floor(parseInt(cleanHex.slice(4, 6), 16) * (1 - amount));

    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  };

  const adminBg = isHoveringAdmin ? darkenColor(primaryColor) : primaryColor;

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

          {!isAdmin && (
            <button
              onClick={() => setShowAdminLogin(true)}
              style={{ color: primaryColor }}
              className="font-bold"
            >
              Admin
            </button>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all"
              style={{
                backgroundColor: adminBg,
                transform: isHoveringAdmin
                  ? "translateY(-2px)"
                  : "translateY(0)",
                boxShadow: isHoveringAdmin
                  ? "0 8px 20px rgba(0,0,0,0.15)"
                  : "0 4px 14px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={() => setIsHoveringAdmin(true)}
              onMouseLeave={() => setIsHoveringAdmin(false)}
            >
              Admin Panel
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
