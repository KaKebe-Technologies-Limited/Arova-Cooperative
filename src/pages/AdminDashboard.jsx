import React, { useState, useEffect, useContext } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus,
  X,
  Menu,
  Eye,
  FileEdit,
  Upload,
  Save,
  Heart,
  TrendingUp,
  ListChecks,
  MessageSquare,
  Link as LinkIcon,
  ArrowUpRight,
  Edit2,
  Trash2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ThemeContext } from "../ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  postsAPI,
  teamAPI,
  testimonialsAPI,
  statsAPI,
  coreValuesAPI,
  contactSubmissionsAPI,
  socialLinksAPI,
  pageContentAPI,
  uploadAPI,
} from "../api";
import {
  TeamManager,
  TestimonialsManager,
  StatsManager,
  CoreValuesManager,
  ContactInbox,
  SocialLinksManager,
  ContentEditor,
  SettingsPanel,
} from "../components/admin/Managers";

// ==================== ADMIN DASHBOARD ====================
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  // Data states
  const [posts, setPosts] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState([]);
  const [coreValues, setCoreValues] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [pageContent, setPageContent] = useState([]);

  // Fetch all data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        postsRes,
        teamRes,
        testimonialsRes,
        statsRes,
        coreValuesRes,
        submissionsRes,
        socialRes,
        contentRes,
      ] = await Promise.all([
        postsAPI.getAll({ limit: 100 }),
        teamAPI.getAll(),
        testimonialsAPI.getAll(),
        statsAPI.getAll(),
        coreValuesAPI.getAll(),
        contactSubmissionsAPI.getAll({ limit: 50 }),
        socialLinksAPI.getAll(),
        pageContentAPI.getAll(),
      ]);

      setPosts(postsRes.data.posts || []);
      setTeam(teamRes.data.members || []);
      setTestimonials(testimonialsRes.data.testimonials || []);
      setStats(statsRes.data.stats || []);
      setCoreValues(coreValuesRes.data.coreValues || []);
      setContactSubmissions(submissionsRes.data.submissions || []);
      setSocialLinks(socialRes.data.socialLinks || []);
      setPageContent(contentRes.data.content || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 mx-auto text-emerald-600"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <img src="./logo.png" alt="Logo" className="w-10" />
            <span className="font-bold text-xl">Arova Admin</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
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
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
          <Link
            to="/"
            className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
          >
            <ArrowUpRight size={16} />
            View Site
          </Link>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <DashboardOverview
              posts={posts}
              team={team}
              testimonials={testimonials}
              stats={stats}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "posts" && (
            <PostsManager posts={posts} setPosts={setPosts} />
          )}
          {activeTab === "team" && (
            <TeamManager team={team} setTeam={setTeam} />
          )}
          {activeTab === "testimonials" && (
            <TestimonialsManager
              testimonials={testimonials}
              setTestimonials={setTestimonials}
            />
          )}
          {activeTab === "stats" && (
            <StatsManager stats={stats} setStats={setStats} />
          )}
          {activeTab === "core-values" && (
            <CoreValuesManager
              coreValues={coreValues}
              setCoreValues={setCoreValues}
            />
          )}
          {activeTab === "contact-inbox" && (
            <ContactInbox
              submissions={contactSubmissions}
              setSubmissions={setContactSubmissions}
            />
          )}
          {activeTab === "social-links" && (
            <SocialLinksManager
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />
          )}
          {activeTab === "content" && (
            <ContentEditor content={pageContent} setContent={setPageContent} />
          )}
          {activeTab === "settings" && (
            <SettingsPanel theme={theme} setTheme={setTheme} />
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== DASHBOARD OVERVIEW ====================
const DashboardOverview = ({
  posts,
  team,
  testimonials,
  stats,
  setActiveTab,
}) => {
  const publishedPosts = posts.filter((p) => p.status === "PUBLISHED").length;
  const activeTeam = team.filter((t) => t.isActive).length;
  const activeTestimonials = testimonials.filter((t) => t.isActive).length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Published Posts"
          value={publishedPosts}
          icon={FileText}
          color="emerald"
        />
        <StatCard
          label="Active Staff"
          value={activeTeam}
          icon={Users}
          color="blue"
        />
        <StatCard
          label="Testimonials"
          value={activeTestimonials}
          icon={Heart}
          color="purple"
        />
        <StatCard
          label="Total Views"
          value={totalViews}
          icon={Eye}
          color="amber"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab("posts")}
            className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition text-left"
          >
            <FileText className="text-emerald-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900">Manage Posts</p>
            <p className="text-sm text-gray-600">{posts.length} total posts</p>
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-left"
          >
            <Users className="text-blue-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900">Manage Team</p>
            <p className="text-sm text-gray-600">{team.length} members</p>
          </button>
          <button
            onClick={() => setActiveTab("contact-inbox")}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-left"
          >
            <MessageSquare className="text-purple-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900">View Messages</p>
            <p className="text-sm text-gray-600">Contact submissions</p>
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {posts.slice(0, 10).map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt=""
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {post.title}
                </p>
                <p className="text-sm text-gray-600">
                  {post.category} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {post.views || 0} views
                </p>
                <StatusBadge status={post.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    PUBLISHED: "bg-green-100 text-green-800",
    DRAFT: "bg-yellow-100 text-yellow-800",
    ARCHIVED: "bg-gray-100 text-gray-800",
  };
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status] || styles.DRAFT}`}
    >
      {status}
    </span>
  );
};

// ==================== POSTS MANAGER ====================
const PostsManager = ({ posts, setPosts }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "News",
    status: "DRAFT",
    seoTitle: "",
    seoDescription: "",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = [
    "Success Story",
    "Finance",
    "Agriculture",
    "Community",
    "News",
    "Impact",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingPost) {
        const response = await postsAPI.update(editingPost.id, formData);
        setPosts(
          posts.map((p) => (p.id === editingPost.id ? response.data.post : p)),
        );
      } else {
        const response = await postsAPI.create(formData);
        setPosts([response.data.post, ...posts]);
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      image: post.image || "",
      category: post.category || "News",
      status: post.status || "DRAFT",
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await postsAPI.delete(id);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const response = await uploadAPI.upload(file);
      setFormData({ ...formData, image: response.data.url });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "News",
      status: "DRAFT",
      seoTitle: "",
      seoDescription: "",
    });
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {editingPost ? "Edit Post" : "Create New Post"}
          </h3>
          <button
            onClick={resetForm}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <ReactQuill
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              theme="snow"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="https://example.com/image.jpg"
              />
              <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition flex items-center gap-2">
                <Upload size={18} />
                {uploading ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-bold text-gray-900 mb-4">
              SEO Settings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, seoTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder={formData.title || "Auto-generated"}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, seoDescription: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  rows="2"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Post"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowForm(true)}
        className="w-full md:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2 font-semibold"
      >
        <Plus size={20} />
        Create New Post
      </button>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Post
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Views
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {post.image && (
                        <img
                          src={post.image}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {post.title}
                        </p>
                        <p className="text-sm text-gray-600 truncate max-w-xs">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${post.status === "PUBLISHED" ? "bg-green-100 text-green-800" : post.status === "DRAFT" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {post.views || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
