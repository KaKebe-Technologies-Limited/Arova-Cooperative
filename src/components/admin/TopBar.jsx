import { Link } from "react-router-dom";
import { Menu, ArrowUpRight } from "lucide-react";

const TopBar = ({ activeLabel, setIsSidebarOpen }) => (
  <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
    <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
      <Menu size={24} />
    </button>
    <h1 className="text-2xl font-bold text-gray-900">{activeLabel}</h1>
    <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2">
      <ArrowUpRight size={16} />
      View Site
    </Link>
  </div>
);

export default TopBar;
