import React, { useState, useEffect, useCallback } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Users,
  Target,
  Heart,
  TrendingUp,
  MapPin,
  ArrowRight,
  Lock,
  Plus,
  Edit2,
  Trash2,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

// --- STATIC DATA MOVED OUTSIDE TO PREVENT RE-CREATION ---

const seoData = {
  home: {
    title:
      "Arova Producers & Cooperative Sacco - Empowering Communities in Lango Sub-region",
    description:
      "From 15 women under a tree to 19,000+ members. Arova provides agricultural value addition, low-interest loans, and market linkages across 10 districts in Uganda.",
    keywords:
      "Arova, cooperative, Uganda, Lango, agricultural cooperative, SACCO, low interest loans, poverty eradication, Lira, farmers cooperative",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=630&fit=crop",
  },
  about: {
    title: "Our Story - Arova Producers & Cooperative Sacco",
    description:
      "Learn about Arova's inspiring journey from 15 women meeting under a tree in 2008 to serving 19,441 people across the Lango and Acholi sub-regions.",
    keywords:
      "Arova history, cooperative Uganda, women empowerment, Lango development, community transformation",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=630&fit:crop",
  },
  team: {
    title: "Our Team - Arova Producers & Cooperative Sacco",
    description:
      "Meet the dedicated 12-member team driving Arova's mission to eradicate poverty through agricultural value addition and accessible finance.",
    keywords:
      "Arova team, cooperative leadership, Brenda Komagum, Uganda cooperative management",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit:crop",
  },
  blog: {
    title: "Blog & Success Stories - Arova Producers & Cooperative Sacco",
    description:
      "Read inspiring stories of transformation, agricultural innovation, and community impact from across the Lango and Acholi sub-regions.",
    keywords:
      "Arova blog, success stories, agricultural innovation, Uganda development stories, cooperative impact",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=630&fit:crop",
  },
  contact: {
    title: "Contact Us - Arova Producers & Cooperative Sacco",
    description:
      "Get in touch with Arova. Located in Lira City, serving 10+ districts across Lango and Acholi sub-regions. Registration No: 12064/RCS",
    keywords:
      "Contact Arova, Lira City, Uganda cooperative contact, Arova location, cooperative services Uganda",
    image:
      "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=630&fit:crop",
  },
  admin: {
    title: "Admin Panel - Arova",
    description: "Arova admin management panel",
    keywords: "admin",
    image: "",
  },
};

const stats = [
  { number: "19,441", label: "People Reached", icon: Users },
  { number: "10+", label: "Districts Served", icon: MapPin },
  { number: "2B UGX", label: "Total Donations", icon: TrendingUp },
  { number: "16 Years", label: "Of Impact", icon: Heart },
];

const coreValues = [
  "Accountability",
  "Transparency",
  "Equity",
  "Democracy",
  "Self-responsibility",
  "Self help",
];

const team = [
  { name: "Brenda Komagum", role: "Manager" },
  { name: "Denis Peter Odongo", role: "Finance & Administration" },
  { name: "Bob Obwor", role: "Accountant" },
  { name: "Susan Akello", role: "Operations Manager" },
  { name: "Apali Caeser", role: "Branch Manager" },
  { name: "Nyaketcho Catherine", role: "Admin Assistant" },
];

// --- COMPONENTS ---

const SEO = ({ title, description, keywords, image }) => {
  useEffect(() => {
    document.title = title;
    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    const setOGMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    setMeta("description", description);
    setMeta("keywords", keywords);
    setOGMeta("og:title", title);
    setOGMeta("og:description", description);
    setOGMeta("og:image", image);
    setOGMeta("og:type", "website");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [title, description, keywords, image]);
  return null;
};

const StructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CooperativeOrganization",
      name: "Arova Producers and Cooperative Sacco",
      description:
        "Agricultural cooperative providing value addition, low-interest loans, and market linkages to 19,000+ members across Uganda's Lango Sub-region",
      foundingDate: "2008",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Senior Quarters B Cell",
        addressLocality: "Lira City East Division",
        addressRegion: "Lira City",
        addressCountry: "Uganda",
      },
      areaServed: [
        "Lira City",
        "Lira District",
        "Alebtong",
        "Oyam",
        "Otuke",
        "Apac",
        "Dokolo",
        "Kwania",
        "Kole",
        "Acholi Sub-region",
      ],
      numberOfEmployees: 12,
      founder: {
        "@type": "Organization",
        description: "Founded by 15 women in 2008",
      },
      url: window.location.origin,
      sameAs: [],
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);
  return null;
};

const AdminPanel = ({
  seoData,
  blogPosts,
  editingPost,
  setEditingPost,
  handleAddPost,
  handleLogout,
  handleSavePost,
  handleDeletePost,
}) => (
  <div className="py-20 bg-gray-50 min-h-screen">
    <SEO {...seoData} />
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAddPost}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <Plus size={20} /> New Post
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {editingPost ? (
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {blogPosts.find((p) => p.id === editingPost.id)
              ? "Edit Post"
              : "Create New Post"}
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, title: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                value={editingPost.category}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, category: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="e.g., Success Story, Impact, Finance"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Excerpt (Short Description) *
              </label>
              <textarea
                value={editingPost.excerpt}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, excerpt: e.target.value })
                }
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                placeholder="Brief summary that appears on the blog page"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Content
              </label>
              <textarea
                value={editingPost.content}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, content: e.target.value })
                }
                rows="8"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                placeholder="Full article content..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={editingPost.image}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, image: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="https://example.com/image.jpg"
              />
              {editingPost.image && (
                <img
                  src={editingPost.image}
                  alt="Preview"
                  className="mt-4 w-full h-48 object-cover rounded-xl"
                />
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSavePost}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} /> Save Post
              </button>
              <button
                onClick={() => setEditingPost(null)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-3">
                {post.category || "Uncategorized"}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              <p className="text-sm text-gray-500 mb-4">{post.date}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingPost(post)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {blogPosts.length === 0 && !editingPost && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl mb-6">
            No blog posts yet. Create your first post!
          </p>
          <button
            onClick={handleAddPost}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all inline-flex items-center gap-2"
          >
            <Plus size={20} /> Create First Post
          </button>
        </div>
      )}
    </div>
  </div>
);

const AdminLoginModal = ({
  showPassword,
  setShowPassword,
  adminPassword,
  setAdminPassword,
  handleAdminLogin,
  setShowAdminLogin,
}) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Lock className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
        <p className="text-gray-600">Enter password to manage blog posts</p>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
            placeholder="Enter admin password"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Hint: arova2024</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAdminLogin}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          Login
        </button>
        <button
          onClick={() => {
            setShowAdminLogin(false);
            setAdminPassword("");
          }}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// --- PAGE COMPONENTS ---

const HomePage = ({ blogPosts, navigate }) => (
  <div>
    <SEO {...seoData.home} />
    {/* Hero Section */}
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&h=900&fit=crop')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-6 px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-sm">
          <p className="text-emerald-700 font-medium">
            Since 2008 • 19,441+ Lives Transformed
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent leading-tight">
          Empowering Communities Through Cooperation
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          From 15 women under a tree to 19,000+ members across Lango Sub-region.
          We're eradicating poverty through agricultural value addition and
          accessible finance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/about")}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Our Story <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-emerald-500"
          >
            Read Our Blog
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>

    {/* Stats Section */}
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <stat.icon className="text-white" size={32} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Vision & Mission */}
    <div className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-100">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-white" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To be a leading producer of agricultural products nationally and
              internationally.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-100">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="text-white" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Eradicating poverty among members through value addition on
              agricultural products, providing low interest loans and linking
              members to markets.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Latest Blog Posts Preview */}
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Stories
          </h2>
          <p className="text-xl text-gray-600">
            Discover the impact we're making in communities
          </p>
        </div>

        {blogPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl mb-4 shadow-lg">
                    <img
                      src={
                        post.image ||
                        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit:crop"
                      }
                      alt={post.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                  <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-3">
                    {post.category || "Story"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/blog")}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
              >
                View All Stories <ChevronRight size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No blog posts available yet.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="py-20">
    <SEO {...seoData.about} />
    <div className="max-w-5xl mx-auto px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 text-center">
        Our Journey
      </h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-10 rounded-3xl mb-12 border border-emerald-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Beginning (2008)
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            In 2008, a group of 15 women who shared a dream of transforming the
            welfare of their families came together and decided to form a small
            savings group. They pooled funds together so that they could borrow
            at a low interest rate to help them overcome their challenges.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            They held all their activities under a tree in one of the compounds
            of a member. These 15 women birthed what would become Arova
            Producers and Cooperative Sacco.
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl mb-12 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Growth & Formalization (2010)
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            By 2010, Arova received a temporal registration certificate to
            commence formal activities. The membership had grown to over 200
            members, and they secured their first office in Oyam Town Council.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-10 rounded-3xl mb-12 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">Today (2024)</h2>
          <p className="text-white text-lg leading-relaxed mb-6">
            Arova was permanently registered with the Ministry of Trade,
            Industry and Cooperatives with Reg.No 12064/RCS. We now serve a
            client base of over 19,000 clients across the entire Lango
            Sub-region.
          </p>
          <p className="text-white text-lg leading-relaxed">
            Our reach extends across Lira city, Lira district, Alebtong, Oyam,
            Otuke, Apac, Dokolo, Kwania, Kole, and the Acholi sub-region.
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Core Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-100"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeamPage = () => (
  <div className="py-20 bg-gradient-to-br from-emerald-50 to-green-50 min-h-screen">
    <SEO {...seoData.team} />
    <div className="max-w-6xl mx-auto px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
        Our Team
      </h1>
      <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        Meet the dedicated professionals driving our mission forward with 12
        staff members committed to serving our community.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-emerald-100"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
              {member.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {member.name}
            </h3>
            <p className="text-emerald-600 text-center font-medium">
              {member.role}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-xl border border-emerald-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Departments
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Users className="text-emerald-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Management</h3>
            <p className="text-gray-600">Head: Brenda Komagum</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Finance & Admin
            </h3>
            <p className="text-gray-600">Head: Denis Peter Odongo</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Target className="text-emerald-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Operations & Credit
            </h3>
            <p className="text-gray-600">Head: Susan Akello</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BlogPage = ({ blogPosts }) => (
  <div className="py-20 bg-white min-h-screen">
    <SEO {...seoData.blog} />
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
        Our Stories
      </h1>
      <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        Read about the impact we're making and the lives we're transforming
        across the Lango Sub-region.
      </p>

      {blogPosts && blogPosts.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group cursor-pointer bg-white rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="overflow-hidden rounded-2xl mb-4 shadow-lg">
                <img
                  src={
                    post.image ||
                    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit:crop"
                  }
                  alt={post.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="p-2">
                <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-3">
                  {post.category || "Story"}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-3">{post.excerpt}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-500 text-lg">
            No stories have been published yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  </div>
);

const ContactPage = () => (
  <div className="py-20 bg-gradient-to-br from-emerald-50 to-green-50 min-h-screen">
    <SEO {...seoData.contact} />
    <div className="max-w-5xl mx-auto px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
        Get In Touch
      </h1>
      <p className="text-xl text-gray-600 text-center mb-16">
        We'd love to hear from you. Reach out to learn more about our
        cooperative.
      </p>

      <div className="bg-white p-12 rounded-3xl shadow-2xl border border-emerald-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">
                    Senior Quarters B Cell
                    <br />
                    Lira City East Division
                    <br />
                    Lira City, Uganda
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Areas Served</h3>
                  <p className="text-gray-600">
                    Lira City & District, Alebtong, Oyam, Otuke, Apac, Dokolo,
                    Kwania, Kole, and Acholi Sub-region
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-3">Registration Details</h3>
              <p className="text-emerald-50">
                Ministry of Trade, Industry and Cooperatives
              </p>
              <p className="text-xl font-semibold mt-2">Reg.No: 12064/RCS</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APPLICATION CONTENT COMPONENT ---

const ArovaContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Helper to save posts
  // Note: Standard browser API is 'localStorage', but code used 'window.storage'.
  // Assuming 'window.storage' is intended environment, keeping it.
  // If this causes issues, switch to localStorage.
  const saveBlogPosts = async (posts) => {
    try {
      if (window.storage) {
        await window.storage.set("arova_blog_posts", JSON.stringify(posts));
      } else {
        // Fallback for standard browsers if window.storage isn't defined
        localStorage.setItem("arova_blog_posts", JSON.stringify(posts));
      }
    } catch (error) {
      console.error("Error saving blog posts:", error);
    }
  };

  const loadBlogPosts = useCallback(async () => {
    try {
      let result = null;
      if (window.storage) {
        const stored = await window.storage.get("arova_blog_posts");
        if (stored && stored.value) result = JSON.parse(stored.value);
      } else {
        const stored = localStorage.getItem("arova_blog_posts");
        if (stored) result = JSON.parse(stored);
      }

      if (result) {
        setBlogPosts(result);
      } else {
        const defaultPosts = [
          {
            id: 1,
            title: "From 15 Women to 19,000+ Members: The Arova Journey",
            excerpt:
              "Discover how a small savings group under a tree transformed into a leading cooperative serving the entire Lango Sub-region.",
            date: "December 2024",
            image:
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit:crop",
            category: "Success Story",
            content:
              "In 2008, 15 women with a shared dream came together under a tree...",
          },
          {
            id: 2,
            title: "Empowering Agricultural Producers Through Value Addition",
            excerpt:
              "Learn how Arova is helping farmers increase their income through innovative value addition strategies.",
            date: "November 2024",
            image:
              "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit:crop",
            category: "Impact",
            content:
              "Our value addition programs are transforming agricultural practices...",
          },
          {
            id: 3,
            title: "Low-Interest Loans: Breaking the Poverty Cycle",
            excerpt:
              "How accessible credit is transforming lives across 10 districts in the Lango and Acholi sub-regions.",
            date: "November 2024",
            image:
              "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=500&fit:crop",
            category: "Finance",
            content:
              "Our low-interest loan program provides members with access to capital...",
          },
        ];
        setBlogPosts(defaultPosts);
        await saveBlogPosts(defaultPosts);
      }
    } catch (error) {
      console.error("Error loading blog posts:", error);
      setBlogPosts([
        {
          id: 1,
          title: "From 15 Women to 19,000+ Members: The Arova Journey",
          excerpt:
            "Discover how a small savings group under a tree transformed into a leading cooperative serving the entire Lango Sub-region.",
          date: "December 2024",
          image:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit:crop",
          category: "Success Story",
          content:
            "In 2008, 15 women with a shared dream came together under a tree...",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    loadBlogPosts();
  }, [loadBlogPosts]);

  const handleAdminLogin = () => {
    if (adminPassword === "arova2024") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      navigate("/admin");
    } else {
      alert("Incorrect password! Try: arova2024");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate("/");
  };

  const handleAddPost = () => {
    setEditingPost({
      id: Date.now(),
      title: "",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      image: "",
      category: "",
      content: "",
    });
  };

  const handleSavePost = async () => {
    if (!editingPost.title || !editingPost.excerpt) {
      alert("Please fill in at least the title and excerpt!");
      return;
    }

    const existingIndex = blogPosts.findIndex((p) => p.id === editingPost.id);
    let updatedPosts;

    if (existingIndex >= 0) {
      updatedPosts = [...blogPosts];
      updatedPosts[existingIndex] = editingPost;
    } else {
      updatedPosts = [editingPost, ...blogPosts];
    }

    setBlogPosts(updatedPosts);
    await saveBlogPosts(updatedPosts);
    setEditingPost(null);
    alert("Blog post saved successfully!");
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = blogPosts.filter((p) => p.id !== id);
      setBlogPosts(updatedPosts);
      await saveBlogPosts(updatedPosts);
      alert("Post deleted!");
    }
  };

  const NavLink = ({ to, children }) => {
    const isActive =
      location.pathname === to || (to === "/" && location.pathname === "/");

    return (
      <Link
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className={`transition-all duration-300 ${
          isActive
            ? "text-emerald-500 font-semibold"
            : "text-gray-700 hover:text-emerald-600"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <StructuredData />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Arova Logo"
                className="w-12 h-12 rounded-xl shadow-lg object-contain bg-white"
              />
              <div>
                <div className="text-2xl font-bold text-gray-900">Arova</div>
                <div className="text-xs text-emerald-600 font-medium">
                  Producers & Cooperative Sacco
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/team">Team</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              {!isAdmin && (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <Lock size={16} /> Admin
                </button>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Lock size={16} /> Admin Panel
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="px-6 py-6 space-y-4">
              <div className="block py-2">
                <NavLink to="/">Home</NavLink>
              </div>
              <div className="block py-2">
                <NavLink to="/about">About</NavLink>
              </div>
              <div className="block py-2">
                <NavLink to="/team">Team</NavLink>
              </div>
              <div className="block py-2">
                <NavLink to="/blog">Blog</NavLink>
              </div>
              <div className="block py-2">
                <NavLink to="/contact">Contact</NavLink>
              </div>
              {!isAdmin && (
                <button
                  onClick={() => {
                    setShowAdminLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Admin Login
                </button>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="pt-20">
        <Routes>
          <Route
            path="/"
            element={<HomePage blogPosts={blogPosts} navigate={navigate} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage blogPosts={blogPosts} />} />
          <Route path="/contact" element={<ContactPage />} />

          {isAdmin && (
            <Route
              path="/admin"
              element={
                <AdminPanel
                  seoData={seoData.admin}
                  blogPosts={blogPosts}
                  editingPost={editingPost}
                  setEditingPost={setEditingPost}
                  handleAddPost={handleAddPost}
                  handleLogout={handleLogout}
                  handleSavePost={handleSavePost}
                  handleDeletePost={handleDeletePost}
                />
              }
            />
          )}

          <Route
            path="*"
            element={
              <div className="text-center py-40">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600">Page Not Found</p>
                <Link
                  to="/"
                  className="mt-6 inline-block text-emerald-600 font-medium hover:underline"
                >
                  Go to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </div>

      {showAdminLogin && (
        <AdminLoginModal
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          handleAdminLogin={handleAdminLogin}
          setShowAdminLogin={setShowAdminLogin}
        />
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img
                  src="/logo.png"
                  alt="Arova Logo"
                  className="w-12 h-12 rounded-xl object-contain bg-white"
                />
                <div className="text-xl font-bold">Arova</div>
              </Link>
              <p className="text-gray-400 leading-relaxed">
                Empowering communities through cooperation since 2008.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/team"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Our Team
                </Link>
                <Link
                  to="/blog"
                  className="block text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Our Impact</h3>
              <div className="space-y-2 text-gray-400">
                <p>19,441+ People Reached</p>
                <p>10+ Districts Served</p>
                <p>2 Billion UGX Donated</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Location</h3>
              <p className="text-gray-400 leading-relaxed">
                Senior Quarters B Cell
                <br />
                Lira City East Division
                <br />
                Lira City, Uganda
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              © 2024 Arova Producers & Cooperative Sacco. All rights reserved. |
              Reg.No: 12064/RCS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ArovaWebsite = () => (
  <BrowserRouter>
    <ArovaContent />
  </BrowserRouter>
);

export default ArovaWebsite;
