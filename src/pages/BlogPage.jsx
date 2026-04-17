import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";
import RevealOnScroll from "../components/RevealOnScroll";
import { postsAPI } from "../api";

const BlogPage = () => {
  const { resolvedHex: primaryColor } = useContext(ThemeContext);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    postsAPI
      .getAll({ status: "PUBLISHED" })
      .then((res) => setBlogPosts(res.data.posts || []))
      .catch(() => setBlogPosts([]));
  }, []);

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900">Impact Stories</h1>
          </div>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {blogPosts.map((post, idx) => (
            <RevealOnScroll key={post.id} delay={idx * 100}>
              <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all h-full flex flex-col">
                <div className="h-64 overflow-hidden relative shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div
                    style={{ color: primaryColor }}
                    className="text-sm font-bold mb-2 uppercase tracking-wider"
                  >
                    {post.category || "News"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
