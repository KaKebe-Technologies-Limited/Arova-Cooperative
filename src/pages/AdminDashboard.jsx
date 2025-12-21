import axios from 'axios';
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
  Check,
  Menu,
  Eye,
  FileEdit,
  ArrowRight,
  Upload,
  ExternalLink,
  Save,
  Type,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SketchPicker } from "react-color";
import { ThemeContext } from "../ThemeContext";
import { useRef } from "react";

const SettingsView = () => (
  <div>
    <h1 className="text-3xl font-bold mb-8 text-gray-900">Settings</h1>
    <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
      <p className="text-gray-600">Settings management coming soon...</p>
    </div>
  </div>
);

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
  },
};

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { resolvedHex: currentThemeHex } = useContext(ThemeContext);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [posts, setPosts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SETTINGS);
  const [pageContent, setPageContent] = useState(DEFAULT_CONTENT);

  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    date: "",
  });
  const [currentMember, setCurrentMember] = useState({
    name: "",
    role: "",
    img: "",
    active: true,
  });
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const quillRef = useRef(null);
  const imageInputRef = useRef(null);

  // Load data
  useEffect(() => {
    const defaultPosts = [
      {
        id: 1,
        title: "From 15 Women to 19,000+ Members",
        excerpt: "How a small savings group transformed the region.",
        date: "Dec 14, 2024",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
        category: "Success Story",
        content: "<p>Full story here...</p>",
      },
      {
        id: 2,
        title: "Arova's Impact on Local Agriculture",
        excerpt: "Empowering farmers with financial tools and training.",
        date: "Dec 14, 2024",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        category: "Agriculture",
        content: "<p>Full story here...</p>",
      },
    ];

    const savedPosts = localStorage.getItem("arova_blog_posts");
    const savedTeam = localStorage.getItem("arova_team");
    const savedSettings = localStorage.getItem("arova_settings");
    const savedContent = localStorage.getItem("arova_page_content");

    setPosts(savedPosts ? JSON.parse(savedPosts) : defaultPosts);
    setTeamMembers(savedTeam ? JSON.parse(savedTeam) : DEFAULT_TEAM);
    setSiteSettings(
      savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS
    );
    setPageContent(savedContent ? JSON.parse(savedContent) : DEFAULT_CONTENT);
  }, []);

  // File upload (base64)
  const handleFileUpload = async (file) => {
  setIsUploading(true); // This shows "uploading..." like a spinning wheel.
  try {
    const formData = new FormData(); // This is a bag to hold your picture.
    formData.append('file', file); // Put the picture in the bag.
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Add your secret rule book name.

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    const imageUrl = response.data.secure_url; // This is the magic web address for your picture!
    setIsUploading(false); // Stop the spinning.
    return imageUrl; // Give back the address.
  } catch (error) {
    console.error('Oops, something went wrong:', error); // Say "uh oh" if there's a mistake.
    setIsUploading(false);
    alert('Picture didn\'t go up. Try again!')
    return null; // No address if it failed.
  }
};

  // Quill image handler
  const handleQuillImage = () => {
    imageInputRef.current.click();
  };

  const onQuillImageSelect = async (e) => {
    const file = e.target.files[0];
    if (file && quillRef.current) {
      const url = await handleFileUpload(file);
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "image", url);
      e.target.value = ""; // reset input
    }
  };

  useEffect(() => {
    if (
      quillRef.current &&
      (activeTab === "stories" || activeTab === "content")
    ) {
      const quill = quillRef.current.getEditor();
      quill.getModule("toolbar").addHandler("image", handleQuillImage);
    }
  }, [activeTab]);

  // Save post
  const handleSavePost = () => {
    let updatedPosts;
    if (isEditingPost) {
      updatedPosts = posts.map((p) =>
        p.id === currentPost.id ? currentPost : p
      );
    } else {
      const newPost = {
        ...currentPost,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      };
      updatedPosts = [...posts, newPost];
    }
    setPosts(updatedPosts);
    localStorage.setItem("arova_blog_posts", JSON.stringify(updatedPosts));
    setCurrentPost({
      id: null,
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      date: "",
    });
    setIsEditingPost(false);
  };

  const handleDeletePost = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("arova_blog_posts", JSON.stringify(updated));
  };

  // Team handlers
  const handleSaveMember = () => {
    let updatedTeam;
    if (isEditingMember && currentMember.id) {
      updatedTeam = teamMembers.map((m) =>
        m.id === currentMember.id ? currentMember : m
      );
    } else {
      updatedTeam = [...teamMembers, { ...currentMember, id: Date.now() }];
    }
    setTeamMembers(updatedTeam);
    localStorage.setItem("arova_team", JSON.stringify(updatedTeam));
    setCurrentMember({ name: "", role: "", img: "", active: true });
    setIsEditingMember(false);
  };

  const handleDeleteMember = (id) => {
    const updated = teamMembers.filter((m) => m.id !== id);
    setTeamMembers(updated);
    localStorage.setItem("arova_team", JSON.stringify(updated));
  };

  const saveContent = () => {
    localStorage.setItem("arova_page_content", JSON.stringify(pageContent));
  };

  const saveSettings = () => {
    localStorage.setItem("arova_settings", JSON.stringify(siteSettings));
  };

  // Dashboard View
  const DashboardView = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Total Stories</h3>
            <FileText size={24} className="text-gray-400" />
          </div>
          <p className="text-3xl font-bold">{posts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Team Members</h3>
            <Users size={24} className="text-gray-400" />
          </div>
          <p className="text-3xl font-bold">{teamMembers.length}</p>
        </div>
      </div>
    </div>
  );

  // Stories View
  const StoriesView = () => (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Impact Stories</h1>
        <button
          onClick={() => {
            setCurrentPost({
              id: null,
              title: "",
              excerpt: "",
              content: "",
              image: "",
              category: "",
              date: "",
            });
            setIsEditingPost(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-medium"
          style={{ backgroundColor: currentThemeHex }}
        >
          <Plus size={20} />
          New Story
        </button>
      </div>

      {isEditingPost && (
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {currentPost.id ? "Edit Story" : "Add New Story"}
          </h2>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Title"
              value={currentPost.title}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, title: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ ringColor: currentThemeHex }}
            />
            <input
              type="text"
              placeholder="Excerpt (short summary)"
              value={currentPost.excerpt}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, excerpt: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl"
            />
            <input
              type="text"
              placeholder="Category"
              value={currentPost.category}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, category: e.target.value })
              }
              className="w-full p-4 border border-gray-200 rounded-xl"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Featured Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files[0]) {
                    const url = await handleFileUpload(e.target.files[0]);
                    setCurrentPost({ ...currentPost, image: url });
                  }
                }}
                className="w-full"
              />
              {currentPost.image && (
                <img
                  src={currentPost.image}
                  alt="Preview"
                  className="mt-4 h-64 object-cover rounded-xl"
                />
              )}
            </div>

            <ReactQuill
              ref={quillRef}
              value={currentPost.content}
              onChange={(value) =>
                setCurrentPost({ ...currentPost, content: value })
              }
              modules={quillModules}
              formats={quillFormats}
              placeholder="Write the full story..."
              className="bg-white"
            />
            <input
              type="file"
              ref={imageInputRef}
              onChange={onQuillImageSelect}
              accept="image/*"
              style={{ display: "none" }}
            />

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSavePost}
                disabled={isUploading}
                className="px-8 py-3 text-white font-bold rounded-xl shadow-lg"
                style={{ backgroundColor: currentThemeHex }}
              >
                {currentPost.id ? "Update Story" : "Publish Story"}
              </button>
              <button
                onClick={() => {
                  setCurrentPost({
                    id: null,
                    title: "",
                    excerpt: "",
                    content: "",
                    image: "",
                    category: "",
                    date: "",
                  });
                  setIsEditingPost(false);
                }}
                className="px-8 py-3 bg-gray-200 rounded-xl font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600">
                {post.date || new Date(post.id).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCurrentPost(post);
                  setIsEditingPost(true);
                }}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Team View
  const TeamView = () => (
    <div className="space-y-6">
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
          style={{ backgroundColor: currentThemeHex }}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveMember();
            }}
            className="space-y-4"
          >
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
                    onChange={async (e) => {
                      if (e.target.files[0]) {
                        const url = await handleFileUpload(e.target.files[0]);
                        setCurrentMember({ ...currentMember, img: url });
                      }
                    }}
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
                className="w-5 h-5 rounded"
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
                style={{ backgroundColor: currentThemeHex }}
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

  // Content View (unchanged)
  const ContentView = () => (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Content Management
      </h1>
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
        <div>
          <label className="block text-lg font-semibold mb-3">Hero Title</label>
          <ReactQuill
            value={pageContent.hero?.title || ""}
            onChange={(v) =>
              setPageContent({
                ...pageContent,
                hero: { ...pageContent.hero, title: v },
              })
            }
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-3">
            Hero Subtitle
          </label>
          <ReactQuill
            value={pageContent.hero?.subtitle || ""}
            onChange={(v) =>
              setPageContent({
                ...pageContent,
                hero: { ...pageContent.hero, subtitle: v },
              })
            }
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
        {/* Add more rich text fields here for other sections */}
        <button
          onClick={saveContent}
          className="px-8 py-4 text-white font-bold rounded-xl shadow-lg"
          style={{ backgroundColor: currentThemeHex }}
        >
          Save All Content
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: currentThemeHex }}
              ></span>
              Live Mode
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/blog"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition"
            >
              <FileText size={16} />
              View Blog
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition"
            >
              <ExternalLink size={16} />
              Exit to Site
            </Link>
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
