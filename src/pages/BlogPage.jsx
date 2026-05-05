import React, { useContext, useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../ThemeContext";
import RevealOnScroll from "../components/RevealOnScroll";
import { postsAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { Search, Calendar } from "lucide-react";

const BlogCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full">
    <div className="h-64 bg-gray-200 animate-pulse" />
    <div className="p-6 space-y-3">
      <div className="h-3 w-20 bg-gray-200 animate-pulse rounded" />
      <div className="h-5 w-full bg-gray-200 animate-pulse rounded" />
      <div className="h-5 w-4/5 bg-gray-200 animate-pulse rounded" />
      <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
      <div className="h-3 w-3/4 bg-gray-200 animate-pulse rounded" />
    </div>
  </div>
);

const BlogPage = () => {
  const { resolvedHex: primaryColor } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    postsAPI
      .getAll({ status: "PUBLISHED" })
      .then((res) => setAllPosts(res.data.posts || []))
      .catch(() => setAllPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(allPosts.map((p) => p.category).filter(Boolean))];
    return ["All", ...unique];
  }, [allPosts]);

  const filtered = useMemo(() => {
    let result = allPosts;
    if (activeCategory !== "All") result = result.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [allPosts, activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Impact Stories | Arova Cooperative</title>
        <meta name="description" content="Read impact stories, news, and updates from Arova Cooperative — empowering communities across Northern Uganda." />
      </Helmet>

      <div className="py-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Impact Stories</h1>
              <p className="text-xl text-gray-500">News, stories, and updates from Arova.</p>
            </div>
          </RevealOnScroll>

          {/* Search + Category Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-9 w-24 rounded-full bg-gray-200 animate-pulse" />
                  ))
                : categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={
                        activeCategory === cat
                          ? { backgroundColor: primaryColor, borderColor: primaryColor }
                          : {}
                      }
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                        activeCategory === cat
                          ? "text-white"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stories..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": primaryColor }}
              />
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-500 text-xl mb-4">No stories found.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="text-sm underline text-gray-500 hover:text-gray-800"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filtered.map((post, idx) => (
                <RevealOnScroll key={post.id} delay={idx * 80}>
                  <div
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all h-full flex flex-col"
                  >
                    <div className="h-64 overflow-hidden relative shrink-0">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <span
                        style={{ backgroundColor: primaryColor }}
                        className="absolute top-4 left-4 px-3 py-1 text-white rounded-md text-xs font-bold uppercase tracking-wide"
                      >
                        {post.category || "News"}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                        <Calendar size={12} />
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:opacity-80 transition-opacity">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
