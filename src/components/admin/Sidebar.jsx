import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, Settings, LogOut, X,
  Heart, TrendingUp, ListChecks, MessageSquare, Link as LinkIcon, FileEdit,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "posts", label: "Blog Posts", icon: FileText },
  { id: "team", label: "Team", icon: Users },
  { id: "testimonials", label: "Testimonials", icon: Heart },
  { id: "stats", label: "Statistics", icon: TrendingUp },
  { id: "core-values", label: "Core Values", icon: ListChecks },
  { id: "contact-inbox", label: "Contact Inbox", icon: MessageSquare },
  { id: "social-links", label: "Social Links", icon: LinkIcon },
  { id: "content", label: "Content", icon: FileEdit },
  { id: "settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <img src="./logo.png" alt="Logo" className="w-10" />
          <span className="font-bold text-xl">Arova Admin</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden"><X size={24} /></button>
      </div>

      <div className="px-6 py-4 border-b border-gray-800">
        <p className="text-sm text-gray-400">Logged in as</p>
        <p className="font-semibold">{user?.name || "Admin"}</p>
        <p className="text-xs text-gray-400">{user?.role || "SUPER_ADMIN"}</p>
      </div>

      <nav className="p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? "bg-emerald-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
            >
              <Icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all mt-4"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
