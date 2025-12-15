import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus,
  X,
  Trash2,
  Edit2,
  Palette,
  Check,
  Menu,
  Eye,
  FileEdit,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- MOCK DATA ---
const MOCK_TEAM = [
  { name: "Brenda Komagum", role: "Manager" },
  { name: "Denis Peter Odongo", role: "Head Finance" },
  { name: "Susan Akello", role: "Head Operations" },
  { name: "Bob Obwor", role: "Accountant" },
  { name: "Apali Caeser", role: "Branch Manager" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // --- THEME STATE ---
  const [primaryColor, setPrimaryColor] = useState("emerald");
  const [customHex, setCustomHex] = useState(null);

  useEffect(() => {
    const savedColor = localStorage.getItem("arova_theme_color");
    const savedHex = localStorage.getItem("arova_theme_hex");
    if (savedColor) setPrimaryColor(savedColor);
    if (savedHex && savedHex !== "null") setCustomHex(savedHex);
  }, []);

  const getThemeStyle = () => {
    const colors = {
      emerald: "#059669",
      blue: "#2563eb",
      purple: "#7c3aed",
      amber: "#d97706",
      rose: "#e11d48",
      indigo: "#4f46e5",
    };
    const activeColor = customHex || colors[primaryColor] || colors.emerald;
    return { "--primary": activeColor };
  };

  const handleColorChange = (colorName) => {
    setPrimaryColor(colorName);
    setCustomHex(null);
    localStorage.setItem("arova_theme_color", colorName);
    localStorage.removeItem("arova_theme_hex");
  };

  const handleHexChange = (hexValue) => {
    setCustomHex(hexValue);
    localStorage.setItem("arova_theme_hex", hexValue);
  };

  // --- BLOG CONTENT STATE ---
  const [posts, setPosts] = useState([]);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem("arova_blog_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Default posts include a status for the new analytics
      const defaults = [
        {
          id: 1,
          title: "From 15 Women to 19,000+ Members",
          excerpt: "How a small savings group transformed the region.",
          date: "Dec 14, 2024",
          category: "Success Story",
          image: "",
          status: "Published",
          views: 1240,
        },
      ];
      setPosts(defaults);
    }
  }, []);

  const savePostsToStorage = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem("arova_blog_posts", JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updated = posts.filter((p) => p.id !== id);
      savePostsToStorage(updated);
    }
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    let updatedPosts;
    const postToSave = {
      ...currentPost,
      views: currentPost.views || 0,
      status: currentPost.status || "Published",
    };

    if (currentPost.id) {
      updatedPosts = posts.map((p) =>
        p.id === currentPost.id ? postToSave : p
      );
    } else {
      updatedPosts = [{ ...postToSave, id: Date.now() }, ...posts];
    }
    savePostsToStorage(updatedPosts);
    setIsEditingPost(false);
    setCurrentPost(null);
  };

  // --- ANALYTICS CALCULATIONS ---
  const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const draftCount = posts.filter((p) => p.status === "Draft").length;

  // --- VIEWS ---

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={color.replace("bg-", "text-")} size={24} />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-500 font-medium text-sm">{label}</p>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-gray-500">Welcome back, Administrator.</p>
        </div>
        <button
          onClick={() => setActiveTab("stories")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          Manage Blog Posts <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Posts"
          value={posts.length}
          icon={FileText}
          color="bg-blue-500"
        />
        <StatCard
          label="Drafts"
          value={draftCount}
          icon={FileEdit}
          color="bg-amber-500"
        />
        <StatCard
          label="Total Views"
          value={totalViews.toLocaleString()}
          icon={Eye}
          color="bg-indigo-500"
        />
        <StatCard
          label="Team Members"
          value={MOCK_TEAM.length}
          icon={Users}
          color="bg-emerald-500"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                {post.image && (
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {post.date} • {post.views || 0} views
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  post.status === "Draft"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {post.status || "Published"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const StoriesView = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
          <p className="text-gray-500">
            Create, edit, and manage all website articles.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentPost({
              title: "",
              excerpt: "",
              category: "News",
              date: new Date().toLocaleDateString(),
              image: "",
              status: "Published",
              views: 0,
            });
            setIsEditingPost(true);
          }}
          className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
          style={{ backgroundColor: getThemeStyle()["--primary"] }}
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {isEditingPost ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {currentPost.id ? "Edit Post" : "New Post"}
            </h3>
            <button
              onClick={() => setIsEditingPost(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSavePost} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                value={currentPost.title}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, title: e.target.value })
                }
                placeholder="Enter post title..."
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  value={currentPost.category}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, category: e.target.value })
                  }
                >
                  <option>Success Story</option>
                  <option>Finance</option>
                  <option>Agriculture</option>
                  <option>Community</option>
                  <option>News</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  value={currentPost.status}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, status: e.target.value })
                  }
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                value={currentPost.image}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, image: e.target.value })
                }
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                rows="4"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                value={currentPost.excerpt}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, excerpt: e.target.value })
                }
                placeholder="Short summary for the blog card..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditingPost(false)}
                className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-semibold text-white transition-all shadow-lg"
                style={{ backgroundColor: getThemeStyle()["--primary"] }}
              >
                Save Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-start gap-6"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img
                  src={post.image || "https://via.placeholder.com/150"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide ${
                      post.status === "Draft"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {post.category} • {post.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.date} • {post.views || 0} views
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setCurrentPost(post);
                    setIsEditingPost(true);
                  }}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const TeamView = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <p className="text-gray-500">View current staff members (Read Only).</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">
                Name
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">
                Role
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_TEAM.map((member, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">
                  {member.name}
                </td>
                <td className="py-4 px-6 text-gray-500">{member.role}</td>
                <td className="py-4 px-6 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SettingsView = () => {
    const colors = [
      { name: "emerald", hex: "#059669", class: "bg-emerald-600" },
      { name: "blue", hex: "#2563eb", class: "bg-blue-600" },
      { name: "purple", hex: "#7c3aed", class: "bg-purple-600" },
      { name: "amber", hex: "#d97706", class: "bg-amber-600" },
      { name: "rose", hex: "#e11d48", class: "bg-rose-600" },
      { name: "indigo", hex: "#4f46e5", class: "bg-indigo-600" },
    ];

    return (
      <div className="space-y-8 animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
          <p className="text-gray-500">
            Customize the look and feel of your website.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <Palette size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Theme Appearance
            </h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Primary Brand Color
              </label>
              <div className="flex flex-wrap gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color.name)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      color.class
                    } ${
                      primaryColor === color.name && !customHex
                        ? "ring-4 ring-offset-2 ring-gray-200 scale-110"
                        : ""
                    }`}
                  >
                    {primaryColor === color.name && !customHex && (
                      <Check size={20} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Custom Hex Code
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 font-bold">
                  #
                </span>
                <input
                  type="text"
                  value={customHex ? customHex.replace("#", "") : ""}
                  onChange={(e) => handleHexChange(`#${e.target.value}`)}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="000000"
                />
              </div>
              <div
                className="w-12 h-12 rounded-xl border border-gray-200 shadow-sm"
                style={{
                  backgroundColor:
                    customHex ||
                    colors.find((c) => c.name === primaryColor)?.hex ||
                    "#059669",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const navItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "stories", label: "Blog Posts", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className="flex h-screen bg-gray-50 font-sans text-gray-900"
      style={getThemeStyle()}
    >
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
              <img
                src="./logo.png"
                alt="Arova Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Arova Admin
            </span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
                style={
                  isActive
                    ? { backgroundColor: getThemeStyle()["--primary"] }
                    : {}
                }
              >
                <Icon size={20} /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />{" "}
            <span className="font-medium">Exit to Website</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-500"
            >
              <Menu />
            </button>
            <h1 className="text-xl font-bold text-gray-800 capitalize hidden md:block">
              {activeTab === "stories" ? "Blog Posts" : activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: getThemeStyle()["--primary"] }}
              ></span>
              System Online
            </div>
            <div
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ color: getThemeStyle()["--primary"] }}
            >
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "stories" && <StoriesView />}
            {activeTab === "team" && <TeamView />}
            {activeTab === "settings" && <SettingsView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
