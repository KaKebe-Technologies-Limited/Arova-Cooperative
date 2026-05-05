import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../ThemeContext";
import { postsAPI } from "../api";
import { ArrowLeft, Calendar, User, Share2, Copy, Check } from "lucide-react";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import toast from "react-hot-toast";

const DetailSkeleton = () => (
  <div className="py-20 bg-white min-h-screen">
    <div className="max-w-4xl mx-auto px-6 animate-pulse space-y-6">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-6 w-32 bg-gray-200 rounded" />
      <div className="h-10 w-3/4 bg-gray-200 rounded" />
      <div className="h-10 w-1/2 bg-gray-200 rounded" />
      <div className="flex gap-4">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
      <div className="h-96 w-full bg-gray-200 rounded-2xl" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded" style={{ width: `${75 + Math.random() * 25}%` }} />
      ))}
    </div>
  </div>
);

const RelatedCard = ({ post, primaryColor, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow border border-gray-100 hover:shadow-lg transition-all flex flex-col"
  >
    <div className="h-40 overflow-hidden">
      <img
        src={post.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"}
        alt={post.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <span className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: primaryColor }}>
        {post.category}
      </span>
      <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{post.title}</h4>
    </div>
  </div>
);

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { resolvedHex: primaryColor } = useContext(ThemeContext);
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    postsAPI
      .getBySlug(slug)
      .then((res) => {
        const p = res.data.post;
        setPost(p);
        return postsAPI.getAll({ status: "PUBLISHED", limit: 4 }).then((rel) => {
          const others = (rel.data.posts || []).filter(
            (rp) => rp.slug !== slug && rp.category === p.category
          );
          setRelated(others.slice(0, 3));
        });
      })
      .catch(() => navigate("/blog"))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || "Arova Impact Story";
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    };
    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return <DetailSkeleton />;
  if (!post) return null;

  const publishDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>{post.seoTitle || post.title} | Arova Cooperative</title>
        <meta name="description" content={post.seoDescription || post.excerpt || ""} />
        <meta property="og:title" content={post.seoTitle || post.title} />
        <meta property="og:description" content={post.seoDescription || post.excerpt || ""} />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-10 transition"
          >
            <ArrowLeft size={20} /> Back to Stories
          </button>

          <span
            style={{ backgroundColor: primaryColor }}
            className="inline-block px-4 py-2 text-white rounded-lg text-sm font-bold uppercase tracking-wide mb-4"
          >
            {post.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} /> {publishDate}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} /> Arova Team
            </div>
          </div>

          {/* Social share bar */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-100">
            <Share2 size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500 mr-1">Share:</span>
            <button
              onClick={() => handleShare("facebook")}
              className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition"
            >
              <FaFacebookF size={14} />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center hover:opacity-80 transition"
            >
              <FaTwitter size={14} />
            </button>
            <button
              onClick={() => handleShare("whatsapp")}
              className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:opacity-80 transition"
            >
              <FaWhatsapp size={14} />
            </button>
            <button
              onClick={handleCopy}
              className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition"
              title="Copy link"
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            </button>
          </div>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-96 object-cover rounded-2xl mb-12"
            />
          )}

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom share bar */}
          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-600">Share this story:</span>
            <button onClick={() => handleShare("facebook")} className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition"><FaFacebookF size={14} /></button>
            <button onClick={() => handleShare("twitter")} className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center hover:opacity-80 transition"><FaTwitter size={14} /></button>
            <button onClick={() => handleShare("whatsapp")} className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:opacity-80 transition"><FaWhatsapp size={14} /></button>
            <button onClick={handleCopy} className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition" title="Copy link">
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More in {post.category}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <RelatedCard
                  key={rp.id}
                  post={rp}
                  primaryColor={primaryColor}
                  onClick={() => navigate(`/blog/${rp.slug}`)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Link to="/blog" className="text-sm font-semibold hover:underline" style={{ color: primaryColor }}>
            ← View all stories
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogPostDetail;
