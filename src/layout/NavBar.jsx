import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({
  isMenuOpen,
  setIsMenuOpen,
  isAdmin,
  setShowAdminLogin,
  primaryColor,
}) => {
  const location = useLocation();

  if (location.pathname === "/admin") return null;

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
              className="text-white px-4 py-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
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
