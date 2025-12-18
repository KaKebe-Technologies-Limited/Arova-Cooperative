import { Link, useLocation } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const Footer = () => {
  const location = useLocation();
  const { customHex } = useContext(ThemeContext);
  const primaryColor = customHex || "#059669";

  // ❌ Hide footer in admin
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
        {/* BRAND */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center"
              style={{ color: primaryColor }}
            >
              <img src="/logo.png" alt="Arova Logo" className="w-8" />
            </div>
            <span className="font-bold text-xl text-white">Arova</span>
          </Link>
          <p className="leading-relaxed mb-6">
            Empowering communities through agricultural value addition and
            financial services since 2008.
          </p>

          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="https://facebook.com"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-gray-900 transition"
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: "Our Story", path: "/about" },
              { label: "Leadership", path: "/team" },
              { label: "Impact Stories", path: "/blog" },
              { label: "Contact Us", path: "/contact" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <ArrowRight size={14} style={{ color: primaryColor }} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin size={20} style={{ color: primaryColor }} />
              <span>Lira City, Uganda</span>
            </li>
            <li className="flex gap-3">
              <Phone size={20} style={{ color: primaryColor }} />
              <span>+256 700 000 000</span>
            </li>
            <li className="flex gap-3">
              <Mail size={20} style={{ color: primaryColor }} />
              <span>info@arova.org</span>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
          <p className="mb-4">
            Subscribe to get the latest updates on our impact.
          </p>
          <div className="flex gap-2">
            <input
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 w-full text-white"
              placeholder="Email Address"
            />
            <button
              className="text-white px-4 rounded-lg"
              style={{ backgroundColor: primaryColor }}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Arova Producers & Cooperative Sacco
      </div>
    </footer>
  );
};

export default Footer;
