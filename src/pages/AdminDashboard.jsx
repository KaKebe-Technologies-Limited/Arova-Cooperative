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
import { ThemeContext } from "../ThemeContext";

/**
 * CONSTANTS & SUB-COMPONENTS (Moved outside to prevent remounting)
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
  logoUrl: "./logo.png",
};

const DEFAULT_CONTENT = {
  hero: {
    title: "Let's Change The World With Humanity",
    subtitle: "Established 2008 • Reg No: 12064/RCS",
    ctaText: "Learn More",
  },
  about: {
    title: "From Humble Beginnings to Regional Impact",
    summary: "In 2008, Arova Producers and Cooperative Sacco was born...",
  },
  mission: {
    text: "Eradicating poverty among members through value addition.",
  },
  vision: { text: "To be a leading producer of agricultural products." },
};

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

const DashboardView = ({ posts, teamMembers, setActiveTab }) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

const StoriesView = ({
  posts,
  isEditingPost,
  setIsEditingPost,
  currentPost,
  setCurrentPost,
  handleSavePost,
  handleDeletePost,
  getThemeHex,
  handleFileUpload,
  isUploading,
}) => (
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
                value={currentPost.title || ""}
                onChange={(e) =>
                  setCurrentPost((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                value={currentPost.category || ""}
                onChange={(e) =>
                  setCurrentPost((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
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
                Image
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm"
                  placeholder="URL"
                  value={currentPost.image || ""}
                  onChange={(e) =>
                    setCurrentPost((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                />
                <label className="p-3 bg-gray-100 rounded-xl cursor-pointer">
                  <Upload size={20} />
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
                value={currentPost.excerpt || ""}
                onChange={(e) =>
                  setCurrentPost((prev) => ({
                    ...prev,
                    excerpt: e.target.value,
                  }))
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
                  setCurrentPost((prev) => ({ ...prev, content: c }))
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
              className="px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg"
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
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-blue-50 text-blue-600">
                {post.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
            <div className="flex md:flex-col gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setCurrentPost(post);
                  setIsEditingPost(true);
                }}
                className="p-2 text-gray-500 hover:text-blue-600 rounded-lg"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="p-2 text-gray-500 hover:text-red-600 rounded-lg"
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

const TeamView = ({
  teamMembers,
  isEditingMember,
  setIsEditingMember,
  currentMember,
  setCurrentMember,
  handleSaveMember,
  handleDeleteMember,
  getThemeHex,
  handleFileUpload,
}) => (
  <div className="space-y-6 animate-fade-in-up">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        <p className="text-gray-500">Manage staff profiles.</p>
      </div>
      <button
        onClick={() => {
          setCurrentMember({ name: "", role: "", img: "", active: true });
          setIsEditingMember(true);
        }}
        className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg"
        style={{ backgroundColor: getThemeHex() }}
      >
        <Plus size={18} /> Add Member
      </button>
    </div>
    {isEditingMember ? (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <form onSubmit={handleSaveMember} className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              required
              className="w-full p-3 bg-gray-50 border rounded-xl"
              value={currentMember.name || ""}
              onChange={(e) =>
                setCurrentMember((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Role</label>
            <input
              required
              className="w-full p-3 bg-gray-50 border rounded-xl"
              value={currentMember.role || ""}
              onChange={(e) =>
                setCurrentMember((p) => ({ ...p, role: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => setIsEditingMember(false)}
              className="px-6 py-2 rounded-xl text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-white"
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
          <thead className="bg-gray-50">
            <tr className="text-xs font-bold text-gray-500 uppercase">
              <th className="p-6">Name</th>
              <th className="p-6">Role</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50/50">
                <td className="p-6 font-medium text-gray-900">{member.name}</td>
                <td className="p-6 text-gray-500">{member.role}</td>
                <td className="p-6 text-right space-x-2">
                  <button
                    onClick={() => {
                      setCurrentMember(member);
                      setIsEditingMember(true);
                    }}
                    className="text-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-red-600"
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

const ContentView = ({
  pageContent,
  setPageContent,
  saveContent,
  getThemeHex,
}) => (
  <div className="space-y-8 animate-fade-in-up">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-100">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Type size={18} /> Home Hero
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500">
              Main Headline
            </label>
            <textarea
              className="w-full p-2 border rounded-lg bg-gray-50"
              rows="2"
              value={pageContent.hero.title || ""}
              onChange={(e) =>
                setPageContent((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, title: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">Sub Text</label>
            <input
              className="w-full p-2 border rounded-lg bg-gray-50"
              value={pageContent.hero.subtitle || ""}
              onChange={(e) =>
                setPageContent((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, subtitle: e.target.value },
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <button
        onClick={() => saveContent(pageContent)}
        className="px-8 py-3 rounded-xl font-bold text-white shadow-lg"
        style={{ backgroundColor: getThemeHex() }}
      >
        <Save size={20} /> Save Changes
      </button>
    </div>
  </div>
);

const SettingsView = ({
  siteSettings,
  setSiteSettings,
  saveSettings,
  getThemeHex,
  primaryColor,
  setPrimaryColor,
  customHex,
  setCustomHex,
  handleFileUpload,
}) => {
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
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Theme Appearance</h3>
          <div className="flex flex-wrap gap-4 mb-6">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setPrimaryColor(color.name);
                  setCustomHex(null);
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color.hex }}
              >
                {primaryColor === color.name && !customHex && (
                  <Check size={18} className="text-white" />
                )}
              </button>
            ))}
          </div>
          <SketchPicker
            color={getThemeHex()}
            onChangeComplete={(c) => setCustomHex(c.hex)}
            disableAlpha
            width="100%"
          />
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 space-y-4">
          <h3 className="text-lg font-bold">Site Identity</h3>
          <input
            className="w-full p-3 bg-gray-50 border rounded-xl"
            placeholder="Site Name"
            value={siteSettings.siteName}
            onChange={(e) =>
              setSiteSettings((prev) => ({ ...prev, siteName: e.target.value }))
            }
          />
          <input
            className="w-full p-3 bg-gray-50 border rounded-xl"
            placeholder="Phone"
            value={siteSettings.contact.phone}
            onChange={(e) =>
              setSiteSettings((prev) => ({
                ...prev,
                contact: { ...prev.contact, phone: e.target.value },
              }))
            }
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => saveSettings(siteSettings)}
          className="px-8 py-4 rounded-xl font-bold text-white shadow-xl"
          style={{ backgroundColor: getThemeHex() }}
        >
          <Save size={20} /> Save All
        </button>
      </div>
    </div>
  );
};

/**
 * MAIN DASHBOARD COMPONENT
 */

const AdminDashboard = ({ setIsAdmin }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const themeContext = useContext(ThemeContext);
  const {
    primaryColor = "emerald",
    setPrimaryColor = () => {},
    customHex = null,
    setCustomHex = () => {},
  } = themeContext || {};

  const [posts, setPosts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SETTINGS);
  const [pageContent, setPageContent] = useState(DEFAULT_CONTENT);

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem("arova_blog_posts");
    setPosts(savedPosts ? JSON.parse(savedPosts) : []);

    const savedTeam = localStorage.getItem("arova_team_members");
    setTeamMembers(savedTeam ? JSON.parse(savedTeam) : DEFAULT_TEAM);

    const savedSettings = localStorage.getItem("arova_site_settings");
    if (savedSettings) setSiteSettings(JSON.parse(savedSettings));

    const savedContent = localStorage.getItem("arova_page_content");
    if (savedContent) setPageContent(JSON.parse(savedContent));
  }, []);

  const savePosts = (updatedPosts) => {
    setPosts(updatedPosts);
    localStorage.setItem("arova_blog_posts", JSON.stringify(updatedPosts));
  };
  const saveTeam = (updatedTeam) => {
    setTeamMembers(updatedTeam);
    localStorage.setItem("arova_team_members", JSON.stringify(updatedTeam));
  };
  const saveSettings = (updated) => {
    setSiteSettings(updated);
    localStorage.setItem("arova_site_settings", JSON.stringify(updated));
    alert("Saved!");
  };
  const saveContent = (updated) => {
    setPageContent(updated);
    localStorage.setItem("arova_page_content", JSON.stringify(updated));
    alert("Updated!");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate("/");
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    const updated = currentPost.id
      ? posts.map((p) => (p.id === currentPost.id ? currentPost : p))
      : [
          {
            ...currentPost,
            id: Date.now(),
            date: new Date().toLocaleDateString(),
          },
          ...posts,
        ];
    savePosts(updated);
    setIsEditingPost(false);
    setCurrentPost(null);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    const updated = currentMember.id
      ? teamMembers.map((m) => (m.id === currentMember.id ? currentMember : m))
      : [...teamMembers, { ...currentMember, id: Date.now() }];
    saveTeam(updated);
    setIsEditingMember(false);
    setCurrentMember(null);
  };

  const handleFileUpload = (e, setter, field) => {
    const file = e.target.files[0];
    if (!file || file.size > 500000) return alert("File too large (>500kb)");
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

  const navItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "stories", label: "Blog Posts", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "content", label: "Content", icon: Type },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className="flex h-screen bg-gray-50 font-sans"
      style={{ "--primary": getThemeHex() }}
    >
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-800 font-bold text-xl">
          Admin
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
                  isActive ? "text-white" : "text-slate-400"
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
            to="/blog"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-xl"
          >
            <FileText size={20} />
            <span className="font-medium">View Blog</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-xl"
          >
            <ExternalLink size={20} />
            <span className="font-medium">Exit to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors rounded-xl"
          >
            <LogOut size={20} /> <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <Menu />
          </button>
          <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <DashboardView
                posts={posts}
                teamMembers={teamMembers}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "stories" && (
              <StoriesView
                posts={posts}
                isEditingPost={isEditingPost}
                setIsEditingPost={setIsEditingPost}
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
                handleSavePost={handleSavePost}
                handleDeletePost={(id) =>
                  savePosts(posts.filter((p) => p.id !== id))
                }
                getThemeHex={getThemeHex}
                handleFileUpload={handleFileUpload}
                isUploading={isUploading}
              />
            )}
            {activeTab === "team" && (
              <TeamView
                teamMembers={teamMembers}
                isEditingMember={isEditingMember}
                setIsEditingMember={setIsEditingMember}
                currentMember={currentMember}
                setCurrentMember={setCurrentMember}
                handleSaveMember={handleSaveMember}
                handleDeleteMember={(id) =>
                  saveTeam(teamMembers.filter((m) => m.id !== id))
                }
                getThemeHex={getThemeHex}
                handleFileUpload={handleFileUpload}
              />
            )}
            {activeTab === "content" && (
              <ContentView
                pageContent={pageContent}
                setPageContent={setPageContent}
                saveContent={saveContent}
                getThemeHex={getThemeHex}
              />
            )}
            {activeTab === "settings" && (
              <SettingsView
                siteSettings={siteSettings}
                setSiteSettings={setSiteSettings}
                saveSettings={saveSettings}
                getThemeHex={getThemeHex}
                primaryColor={primaryColor}
                setPrimaryColor={setPrimaryColor}
                customHex={customHex}
                setCustomHex={setCustomHex}
                handleFileUpload={handleFileUpload}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
