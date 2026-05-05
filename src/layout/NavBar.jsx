import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  if (location.pathname === "/admin" || location.pathname === "/admin/login")
    return null;

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
