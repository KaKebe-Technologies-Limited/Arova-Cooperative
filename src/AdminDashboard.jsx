import React, { useState, useEffect, useContext } from "react";
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
  Upload,
  ExternalLink,
  Globe,
  Save,
  MessageSquare,
  Phone,
  MapPin,
  Mail,
  Type,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SketchPicker } from "react-color";
import { ThemeContext } from "./ThemeContext";

/**
 * DEFAULT DATA CONSTANTS
 * Used to populate LocalStorage if the app is loaded for the first time.
 * Matches the structure found in App.js.
 */

const DEFAULT_TEAM = [
  {
    id: 1,
    name: "Brenda Komagum",
    role: "Manager",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    active: true,
  },
  {
    id: 2,
    name: "Denis Peter Odongo",
    role: "Head Finance & Admin",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    active: true,
  },
  {
    id: 3,
    name: "Susan Akello",
    role: "Head Operations & Credit",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    active: true,
  },
  {
    id: 4,
    name: "Bob Obwor",
    role: "Accountant",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    active: true,
  },
  {
    id: 5,
    name: "Apali Caeser",
    role: "Branch Manager",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    active: true,
  },
  {
    id: 6,
    name: "Nyaketcho Catherine",
    role: "Admin Assistant",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop",
    active: true,
  },
  {
    id: 7,
    name: "Acola Fiona",
    role: "Loan Officer",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    active: true,
  },
  {
    id: 8,
    name: "Daniel",
    role: "Loan Officer",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    active: true,
  },
];

const DEFAULT_SETTINGS = {
  siteName: "Arova",
  tagline: "Producers & Cooperative Sacco",
  regNo: "12064/RCS",
  contact: {
    address: "Senior Quarters B Cell, Lira City",
    email: "info@arova.org",
    phone: "+256 700 000 000",
  },
  socials: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  logoUrl: "./logo.png", // Would ideally be a data URI or hosted URL
};

const DEFAULT_CONTENT = {
  hero: {
    title: "Let's Change The World With Humanity",
    subtitle: "Established 2008 • Reg No: 12064/RCS",
    ctaText: "Learn More",
  },
  about: {
    title: "From Humble Beginnings to Regional Impact",
    summary:
      "In 2008, Arova Producers and Cooperative Sacco was born from the shared dream of 15 women. Gathering under a tree in a member's compound, they pooled their small savings to create opportunities where none existed.",
  },
  mission: {
    text: "Eradicating poverty among members through value addition on agricultural products, providing low interest loans.",
  },
  vision: {
    text: "To be a leading producer of agricultural products nationally and internationally.",
  },
};

const AdminDashboard = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Context
  const themeContext = useContext(ThemeContext);
  const {
    primaryColor = "emerald",
    setPrimaryColor = () => {},
    customHex = null,
    setCustomHex = () => {},
  } = themeContext || {};

  // Data State
  const [posts, setPosts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SETTINGS);
  const [pageContent, setPageContent] = useState(DEFAULT_CONTENT);

  // Edit/UI State
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- INITIALIZATION ---

  useEffect(() => {
    // 1. Load Blog Posts
    const savedPosts = localStorage.getItem("arova_blog_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Create a dummy initial state based on App.js hardcoded data if empty
      const initialPosts = [
        {
          id: 1,
          title: "From 15 Women to 19,000+ Members",
          excerpt: "How a small savings group transformed the region.",
          date: "Dec 14, 2024",
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
          category: "Success Story",
          status: "Published",
          views: 1240,
          content: "In 2008, 15 women came together...",
        },
        // ... (Other defaults would go here, simplified for brevity as they are dynamic now)
      ];
      setPosts(initialPosts);
      localStorage.setItem("arova_blog_posts", JSON.stringify(initialPosts));
    }

    // 2. Load Team
    const savedTeam = localStorage.getItem("arova_team_members");
    if (savedTeam) {
      setTeamMembers(JSON.parse(savedTeam));
    } else {
      setTeamMembers(DEFAULT_TEAM);
      localStorage.setItem("arova_team_members", JSON.stringify(DEFAULT_TEAM));
    }

    // 3. Load Settings
    const savedSettings = localStorage.getItem("arova_site_settings");
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    } else {
      localStorage.setItem(
        "arova_site_settings",
        JSON.stringify(DEFAULT_SETTINGS)
      );
    }

    // 4. Load Page Content
    const savedContent = localStorage.getItem("arova_page_content");
    if (savedContent) {
      setPageContent(JSON.parse(savedContent));
    } else {
      localStorage.setItem(
        "arova_page_content",
        JSON.stringify(DEFAULT_CONTENT)
      );
    }
  }, []);

  // --- PERSISTENCE HELPERS ---

  const savePosts = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem("arova_blog_posts", JSON.stringify(updatedPosts));
  };

  const saveTeam = (updatedTeam) => {
    setTeamMembers(updatedTeam);
    localStorage.setItem("arova_team_members", JSON.stringify(updatedTeam));
  };

  const saveSettings = (updatedSettings) => {
    setSiteSettings(updatedSettings);
    localStorage.setItem(
      "arova_site_settings",
      JSON.stringify(updatedSettings)
    );
    alert("Site settings saved successfully!");
  };

  const saveContent = (updatedContent) => {
    setPageContent(updatedContent);
    localStorage.setItem("arova_page_content", JSON.stringify(updatedContent));
    alert("Page content updated successfully!");
  };

  // --- HANDLERS ---

  const handleLogout = () => {
    // In a real app, clear auth tokens
    navigate("/");
  };

  // Blog Handlers
  const handleSavePost = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const postToSave = {
      ...currentPost,
      date: currentPost.date || timestamp,
      views: currentPost.views || 0,
      status: currentPost.status || "Published",
    };

    let updatedPosts;
    if (currentPost.id) {
      updatedPosts = posts.map((p) =>
        p.id === currentPost.id ? postToSave : p
      );
    } else {
      updatedPosts = [{ ...postToSave, id: Date.now() }, ...posts];
    }
    savePosts(updatedPosts);
    setIsEditingPost(false);
    setCurrentPost(null);
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Delete this story permanently?")) {
      savePosts(posts.filter((p) => p.id !== id));
    }
  };

  // Team Handlers
  const handleSaveMember = (e) => {
    e.preventDefault();
    let updatedTeam;
    const memberToSave = {
      ...currentMember,
      active: currentMember.active ?? true,
    };

    if (currentMember.id) {
      updatedTeam = teamMembers.map((m) =>
        m.id === currentMember.id ? memberToSave : m
      );
    } else {
      updatedTeam = [...teamMembers, { ...memberToSave, id: Date.now() }];
    }
    saveTeam(updatedTeam);
    setIsEditingMember(false);
    setCurrentMember(null);
  };

  const handleDeleteMember = (id) => {
    if (window.confirm("Remove this team member?")) {
      saveTeam(teamMembers.filter((m) => m.id !== id));
    }
  };

  // Image Upload Handler (Simulated DataURI for LocalStorage)
  // Note: LocalStorage has 5MB limit. Real app would use S3/Cloudinary.
  const handleFileUpload = (e, setter, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simple size check (limit to ~500KB for localStorage safety)
    if (file.size > 500000) {
      alert(
        "File is too large for local storage mode. Please use a URL or a smaller image (<500kb)."
      );
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setter((prev) => ({ ...prev, [field]: reader.result }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const getThemeHex = () => {
    const colors = {
      emerald: "#059669",
      blue: "#2563eb",
      purple: "#7c3aed",
      amber: "#d97706",
      rose: "#e11d48",
      indigo: "#4f46e5",
    };
    return customHex || colors[primaryColor] || colors.emerald;
  };

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

  const DashboardView = () => {
    const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);
    const publishedCount = posts.filter((p) => p.status === "Published").length;
    const activeTeam = teamMembers.filter((m) => m.active).length;

    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Dashboard Overview
            </h2>
            <p className="text-gray-500">System status and key metrics.</p>
          </div>
          <button
            onClick={() => setActiveTab("stories")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            Manage Content <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Published Stories"
            value={publishedCount}
            icon={FileText}
            color="bg-blue-500"
          />
          <StatCard
            label="Total Views"
            value={totalViews.toLocaleString()}
            icon={Eye}
            color="bg-indigo-500"
          />
          <StatCard
            label="Active Staff"
            value={activeTeam}
            icon={Users}
            color="bg-emerald-500"
          />
          <StatCard
            label="Pending Drafts"
            value={posts.length - publishedCount}
            icon={FileEdit}
            color="bg-amber-500"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {posts.slice(0, 4).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate text-sm">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                  <div className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <Eye size={12} /> {post.views}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab("team")}
                className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 text-left transition-all group"
              >
                <div className="mb-2 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
                <span className="font-semibold text-gray-900">Add Staff</span>
              </button>
              <button
                onClick={() => setActiveTab("stories")}
                className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 text-left transition-all group"
              >
                <div className="mb-2 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileEdit size={20} />
                </div>
                <span className="font-semibold text-gray-900">Write Story</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 text-left transition-all group"
              >
                <div className="mb-2 w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Palette size={20} />
                </div>
                <span className="font-semibold text-gray-900">Theme</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StoriesView = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
          <p className="text-gray-500">Manage articles and success stories.</p>
        </div>
        <button
          onClick={() => {
            setCurrentPost({
              title: "",
              excerpt: "",
              content: "",
              category: "News",
              image: "",
              status: "Published",
              views: 0,
            });
            setIsEditingPost(true);
          }}
          className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
          style={{ backgroundColor: getThemeHex() }}
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {isEditingPost ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {currentPost.id ? "Edit Post" : "Create Post"}
            </h3>
            <button
              onClick={() => setIsEditingPost(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSavePost} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={currentPost.title}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
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
                  Image Source
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm"
                    placeholder="Image URL"
                    value={currentPost.image}
                    onChange={(e) =>
                      setCurrentPost({ ...currentPost, image: e.target.value })
                    }
                  />
                  <label className="p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                    <Upload size={20} className="text-gray-600" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, setCurrentPost, "image")
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  rows="2"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  value={currentPost.excerpt}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, excerpt: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={currentPost.content || ""}
                  onChange={(c) =>
                    setCurrentPost({ ...currentPost, content: c })
                  }
                  className="h-64 mb-12"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditingPost(false)}
                className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg disabled:opacity-50"
                style={{ backgroundColor: getThemeHex() }}
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
              className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start gap-6"
            >
              <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img
                  src={post.image || "https://via.placeholder.com/300x200"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-blue-50 text-blue-600">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Eye size={12} /> {post.views} views
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex md:flex-col gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity mt-4 md:mt-0">
                <button
                  onClick={() => {
                    setCurrentPost(post);
                    setIsEditingPost(true);
                  }}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
          <p className="text-gray-500">Manage staff profiles and roles.</p>
        </div>
        <button
          onClick={() => {
            setCurrentMember({ name: "", role: "", img: "", active: true });
            setIsEditingMember(true);
          }}
          className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
          style={{ backgroundColor: getThemeHex() }}
        >
          <Plus size={18} /> Add Member
        </button>
      </div>

      {isEditingMember ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Member Details</h3>
            <button onClick={() => setIsEditingMember(false)}>
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          <form onSubmit={handleSaveMember} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                value={currentMember.name}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role/Position
              </label>
              <input
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                value={currentMember.role}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, role: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Photo URL
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl"
                  value={currentMember.img}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, img: e.target.value })
                  }
                />
                <label className="p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                  <Upload size={20} className="text-gray-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e, setCurrentMember, "img")
                    }
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="status"
                checked={currentMember.active}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    active: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded accent-emerald-600"
              />
              <label htmlFor="status" className="font-medium text-gray-700">
                Active (Visible on website)
              </label>
            </div>
            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => setIsEditingMember(false)}
                className="px-6 py-2 rounded-xl font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl font-medium text-white"
                style={{ backgroundColor: getThemeHex() }}
              >
                Save Member
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">
                  Profile
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">
                  Name
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">
                  Role
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">
                  Status
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teamMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3 px-6">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  </td>
                  <td className="py-3 px-6 font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="py-3 px-6 text-gray-500">{member.role}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {member.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right space-x-2">
                    <button
                      onClick={() => {
                        setCurrentMember(member);
                        setIsEditingMember(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const ContentView = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Page Content</h2>
        <p className="text-gray-500">Edit text appearing on main pages.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Type size={18} /> Home Hero
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Main Headline
              </label>
              <textarea
                className="w-full p-2 border rounded-lg mt-1 text-sm bg-gray-50"
                rows="2"
                value={pageContent.hero.title}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    hero: { ...pageContent.hero, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Sub Text
              </label>
              <input
                className="w-full p-2 border rounded-lg mt-1 text-sm bg-gray-50"
                value={pageContent.hero.subtitle}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    hero: { ...pageContent.hero, subtitle: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FileText size={18} /> About Intro
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Title
              </label>
              <input
                className="w-full p-2 border rounded-lg mt-1 text-sm bg-gray-50"
                value={pageContent.about.title}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    about: { ...pageContent.about, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Summary
              </label>
              <textarea
                className="w-full p-2 border rounded-lg mt-1 text-sm bg-gray-50"
                rows="3"
                value={pageContent.about.summary}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    about: { ...pageContent.about, summary: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Mission/Vision */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm md:col-span-2">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Globe size={18} /> Mission & Vision
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Mission Statement
              </label>
              <textarea
                className="w-full p-2 border rounded-lg mt-1 text-sm bg-gray-50"
                rows="3"
                value={pageContent.mission.text}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    mission: { ...pageContent.mission, text: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Vision Statement
              </label>
              <textarea
                className="w-full p-2 border rounded-lg mt-1 text-sm bg-gray-50"
                rows="3"
                value={pageContent.vision.text}
                onChange={(e) =>
                  setPageContent({
                    ...pageContent,
                    vision: { ...pageContent.vision, text: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => saveContent(pageContent)}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:-translate-y-1"
          style={{ backgroundColor: getThemeHex() }}
        >
          <Save size={20} /> Save Content Changes
        </button>
      </div>
    </div>
  );

  const SettingsView = () => {
    const colors = [
      { name: "emerald", hex: "#059669" },
      { name: "blue", hex: "#2563eb" },
      { name: "purple", hex: "#7c3aed" },
      { name: "amber", hex: "#d97706" },
      { name: "rose", hex: "#e11d48" },
      { name: "indigo", hex: "#4f46e5" },
    ];

    return (
      <div className="space-y-8 animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
          <p className="text-gray-500">Configure global identity and theme.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Theme Settings */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Palette className="text-gray-400" size={20} /> Theme Appearance
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Preset Colors
                </label>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setPrimaryColor(color.name);
                        setCustomHex(null);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {primaryColor === color.name && !customHex && (
                        <Check size={18} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Custom Hex Color
                </label>
                <div className="flex justify-center">
                  <SketchPicker
                    color={getThemeHex()}
                    onChangeComplete={(c) => setCustomHex(c.hex)}
                    disableAlpha={true}
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Site Identity */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="text-gray-400" size={20} /> Identity & Contact
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                <img
                  src={siteSettings.logoUrl}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <label className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-50">
                Change Logo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileUpload(e, setSiteSettings, "logoUrl")
                  }
                />
              </label>
            </div>

            <div className="grid gap-4">
              <div className="relative">
                <MessageSquare
                  className="absolute top-3 left-3 text-gray-400"
                  size={16}
                />
                <input
                  className="w-full pl-10 p-3 bg-gray-50 border rounded-xl text-sm"
                  placeholder="Site Name"
                  value={siteSettings.siteName}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      siteName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative">
                <Phone
                  className="absolute top-3 left-3 text-gray-400"
                  size={16}
                />
                <input
                  className="w-full pl-10 p-3 bg-gray-50 border rounded-xl text-sm"
                  placeholder="Phone"
                  value={siteSettings.contact.phone}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      contact: {
                        ...siteSettings.contact,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="relative">
                <Mail
                  className="absolute top-3 left-3 text-gray-400"
                  size={16}
                />
                <input
                  className="w-full pl-10 p-3 bg-gray-50 border rounded-xl text-sm"
                  placeholder="Email"
                  value={siteSettings.contact.email}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      contact: {
                        ...siteSettings.contact,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="relative">
                <MapPin
                  className="absolute top-3 left-3 text-gray-400"
                  size={16}
                />
                <input
                  className="w-full pl-10 p-3 bg-gray-50 border rounded-xl text-sm"
                  placeholder="Address"
                  value={siteSettings.contact.address}
                  onChange={(e) =>
                    setSiteSettings({
                      ...siteSettings,
                      contact: {
                        ...siteSettings.contact,
                        address: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={() => saveSettings(siteSettings)}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-xl transition-all hover:opacity-90"
            style={{ backgroundColor: getThemeHex() }}
          >
            <Save size={20} /> Save All Settings
          </button>
        </div>
      </div>
    );
  };

  const navItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "stories", label: "Blog Posts", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "content", label: "Content", icon: Type },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className="flex h-screen bg-gray-50 font-sans text-gray-900"
      style={{ "--primary": getThemeHex() }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            {/* Logo Preview */}
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
              <img
                src={siteSettings.logoUrl}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight">Admin</span>
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
                style={isActive ? { backgroundColor: getThemeHex() } : {}}
              >
                <Icon size={20} /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-xl"
          >
            <ExternalLink size={20} />{" "}
            <span className="font-medium">Exit to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-white hover:bg-rose-600 transition-colors rounded-xl"
          >
            <LogOut size={20} /> <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
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
              {activeTab} Management
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: getThemeHex() }}
              ></span>
              Live Mode
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "stories" && <StoriesView />}
            {activeTab === "team" && <TeamView />}
            {activeTab === "content" && <ContentView />}
            {activeTab === "settings" && <SettingsView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
