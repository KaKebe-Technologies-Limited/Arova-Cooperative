import { useState, useMemo } from "react";
import { Plus, X, Upload, Save, Edit2, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import { postsAPI, uploadAPI } from "../../api";
import { StatusBadge } from "./DashboardOverview";
import ConfirmModal from "./ConfirmModal";

const categories = ["Success Story", "Finance", "Agriculture", "Community", "News", "Impact"];
const PAGE_SIZE = 10;
const emptyForm = { title: "", excerpt: "", content: "", image: "", category: "News", status: "DRAFT", seoTitle: "", seoDescription: "" };

const PostsManager = ({ posts, setPosts }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Search / filter / sort
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("date");

  // Pagination
  const [page, setPage] = useState(1);

  // Confirm modal
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, title: "" });

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.excerpt.trim()) errs.excerpt = "Excerpt is required";
    if (!formData.content.trim() || formData.content === "<p><br></p>") errs.content = "Content is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingPost) {
        const res = await postsAPI.update(editingPost.id, formData);
        setPosts(posts.map(p => p.id === editingPost.id ? res.data.post : p));
      } else {
        const res = await postsAPI.create(formData);
        setPosts([res.data.post, ...posts]);
      }
      resetForm();
      toast.success("Post saved!");
    } catch {
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title || "", excerpt: post.excerpt || "", content: post.content || "", image: post.image || "", category: post.category || "News", status: post.status || "DRAFT", seoTitle: post.seoTitle || "", seoDescription: post.seoDescription || "" });
    setErrors({});
    setShowForm(true);
  };

  const handleDeleteClick = (post) => {
    setConfirmModal({ open: true, id: post.id, title: post.title });
  };

  const handleDeleteConfirm = async () => {
    try {
      await postsAPI.delete(confirmModal.id);
      setPosts(posts.filter(p => p.id !== confirmModal.id));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setConfirmModal({ open: false, id: null, title: "" });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Only image files are allowed"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }
    setUploading(true);
    try {
      const compressed = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920 });
      const res = await uploadAPI.upload(compressed);
      setFormData(prev => ({ ...prev, image: res.data.url }));
      toast.success("Image uploaded!");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => { setShowForm(false); setEditingPost(null); setFormData(emptyForm); setErrors({}); };

  // Filtered + sorted posts
  const filtered = useMemo(() => {
    let result = [...posts];
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || (p.excerpt || "").toLowerCase().includes(search.toLowerCase()));
    if (filterStatus !== "ALL") result = result.filter(p => p.status === filterStatus);
    if (filterCategory !== "ALL") result = result.filter(p => p.category === filterCategory);
    if (sortBy === "date") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "views") result.sort((a, b) => (b.views || 0) - (a.views || 0));
    if (sortBy === "title") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [posts, search, filterStatus, filterCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (showForm) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">{editingPost ? "Edit Post" : "Create New Post"}</h3>
          <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg transition"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.title ? "border-red-400" : "border-gray-300"}`} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt *</label>
            <textarea value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.excerpt ? "border-red-400" : "border-gray-300"}`} rows="2" />
            {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
            <ReactQuill value={formData.content} onChange={content => setFormData({ ...formData, content })} theme="snow" className="bg-white" />
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image</label>
            <div className="flex items-center gap-4">
              <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="https://example.com/image.jpg" />
              <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition flex items-center gap-2">
                <Upload size={18} />{uploading ? "Compressing..." : "Upload"}
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
            {uploading && <p className="text-xs text-gray-500 mt-1">Compressing and uploading image...</p>}
            {formData.image && <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-bold text-gray-900 mb-4">SEO Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Title</label>
                <input type="text" value={formData.seoTitle} onChange={e => setFormData({ ...formData, seoTitle: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder={formData.title || "Auto-generated"} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Description</label>
                <textarea value={formData.seoDescription} onChange={e => setFormData({ ...formData, seoDescription: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" rows="2" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <button type="button" onClick={resetForm} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2">
              <Save size={18} />{saving ? "Saving..." : "Save Post"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={confirmModal.open}
        title="Delete Post"
        message={`Are you sure you want to delete "${confirmModal.title}"? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmModal({ open: false, id: null, title: "" })}
      />
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 font-semibold">
            <Plus size={20} />Create New Post
          </button>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search posts..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-48" />
            </div>
            <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
              <option value="ALL">All Status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            <select value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
              <option value="ALL">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
              <option value="date">Sort: Date</option>
              <option value="views">Sort: Views</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Post</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Views</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No posts found</td></tr>
                ) : paginated.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {post.image && <img src={post.image} alt="" className="w-12 h-12 rounded-lg object-cover" loading="lazy" />}
                        <div>
                          <p className="font-semibold text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-900">{post.category}</span></td>
                    <td className="px-6 py-4"><StatusBadge status={post.status} /></td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-900">{post.views || 0}</span></td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</span></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(post)} className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteClick(post)} className="p-2 hover:bg-gray-100 rounded-lg transition text-red-600"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} posts
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-40">
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium transition ${p === page ? "bg-emerald-600 text-white" : "hover:bg-gray-100 text-gray-700"}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-40">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostsManager;
