import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from './ConfirmModal';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  ArrowRight,
  LogOut,
  TrendingUp,
} from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  teamAPI,
  testimonialsAPI,
  statsAPI,
  coreValuesAPI,
  contactSubmissionsAPI,
  socialLinksAPI,
  pageContentAPI,
  uploadAPI,
} from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ==================== TEAM MANAGER ====================
export const TeamManager = ({ team, setTeam }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    email: "",
    phone: "",
    order: 0,
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.role.trim()) errs.role = "Role is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingMember) {
        const response = await teamAPI.update(editingMember.id, formData);
        setTeam(
          team.map((m) =>
            m.id === editingMember.id ? response.data.member : m,
          ),
        );
      } else {
        const response = await teamAPI.create(formData);
        setTeam([...team, response.data.member]);
      }
      resetForm();
      toast.success('Team member saved!');
    } catch (error) {
      console.error("Failed to save member:", error);
      toast.error("Failed to save team member");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setErrors({});
    setFormData({
      name: member.name || "",
      role: member.role || "",
      bio: member.bio || "",
      image: member.image || "",
      email: member.email || "",
      phone: member.phone || "",
      order: member.order || 0,
      isActive: member.isActive,
    });
    setShowForm(true);
  };

  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, name: '' });

  const handleDelete = (member) => {
    setConfirmModal({ open: true, id: member.id, name: member.name });
  };

  const handleDeleteConfirm = async () => {
    try {
      await teamAPI.delete(confirmModal.id);
      setTeam(team.filter((m) => m.id !== confirmModal.id));
      toast.success('Team member deleted');
    } catch (error) {
      console.error("Failed to delete member:", error);
      toast.error("Failed to delete team member");
    } finally {
      setConfirmModal({ open: false, id: null, name: '' });
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
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setErrors({});
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "",
      email: "",
      phone: "",
      order: 0,
      isActive: true,
    });
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {editingMember ? "Edit Team Member" : "Add Team Member"}
          </h3>
          <button
            onClick={resetForm}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.name ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.role ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.email ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Image
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
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
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
              {saving ? "Saving..." : "Save"}
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
        title="Delete Team Member"
        message={`Are you sure you want to delete "${confirmModal.name}"? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmModal({ open: false, id: null, name: '' })}
      />
    <div className="space-y-4">
      <button
        onClick={() => setShowForm(true)}
        className="w-full md:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2 font-semibold"
      >
        <Plus size={20} />
        Add Team Member
      </button>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Member
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {member.name}
                        </p>
                        {member.email && (
                          <p className="text-sm text-gray-600">
                            {member.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{member.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${member.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(member)}
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
    </>
  );
};

// ==================== TESTIMONIALS MANAGER ====================
export const TestimonialsManager = ({ testimonials, setTestimonials }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    image: "",
    order: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.text.trim()) errs.text = "Testimonial text is required";
    else if (formData.text.trim().length < 20) errs.text = "Testimonial must be at least 20 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingTestimonial) {
        const response = await testimonialsAPI.update(
          editingTestimonial.id,
          formData,
        );
        setTestimonials(
          testimonials.map((t) =>
            t.id === editingTestimonial.id ? response.data.testimonial : t,
          ),
        );
      } else {
        const response = await testimonialsAPI.create(formData);
        setTestimonials([...testimonials, response.data.testimonial]);
      }
      resetForm();
      toast.success('Testimonial saved!');
    } catch (error) {
      console.error("Failed to save testimonial:", error);
      toast.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (t) => {
    setEditingTestimonial(t);
    setErrors({});
    setFormData({
      name: t.name || "",
      role: t.role || "",
      text: t.text || "",
      image: t.image || "",
      order: t.order || 0,
      isActive: t.isActive,
    });
    setShowForm(true);
  };
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, name: '' });

  const handleDelete = (t) => {
    setConfirmModal({ open: true, id: t.id, name: t.name });
  };

  const handleDeleteConfirm = async () => {
    try {
      await testimonialsAPI.delete(confirmModal.id);
      setTestimonials(testimonials.filter((t) => t.id !== confirmModal.id));
      toast.success('Testimonial deleted');
    } catch (error) {
      toast.error("Failed to delete testimonial");
    } finally {
      setConfirmModal({ open: false, id: null, name: '' });
    }
  };
  const resetForm = () => {
    setShowForm(false);
    setEditingTestimonial(null);
    setErrors({});
    setFormData({
      name: "",
      role: "",
      text: "",
      image: "",
      order: 0,
      isActive: true,
    });
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
          </h3>
          <button
            onClick={resetForm}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.name ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role / Title
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="e.g. Farmer, Oyam"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Testimonial *
            </label>
            <textarea
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.text ? "border-red-400" : "border-gray-300"}`}
              rows="4"
              placeholder="Write the testimonial quote here..."
            />
            {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="https://example.com/photo.jpg"
            />
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
              {saving ? "Saving..." : "Save"}
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
        title="Delete Testimonial"
        message={`Are you sure you want to delete "${confirmModal.name}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmModal({ open: false, id: null, name: '' })}
      />
    <div className="space-y-4">
      <button
        onClick={() => setShowForm(true)}
        className="w-full md:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2 font-semibold"
      >
        <Plus size={20} />
        Add Testimonial
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${t.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
              >
                {t.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">{t.text}</p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(t)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(t)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

// ==================== STATS MANAGER ====================
export const StatsManager = ({ stats, setStats }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const startEdit = (stat) => {
    setEditingId(stat.id);
    setFormData({
      label: stat.label,
      value: stat.value,
      suffix: stat.suffix || "",
      icon: stat.icon || "",
    });
  };
  const handleSave = async (id) => {
    setSaving(true);
    try {
      const response = await statsAPI.update(id, formData);
      setStats(stats.map((s) => (s.id === id ? response.data.stat : s)));
      setEditingId(null);
      toast.success('Stat updated!');
    } catch (error) {
      toast.error("Failed to update stat");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <p className="text-sm text-gray-600 mb-6">
        Edit the statistics displayed on the homepage
      </p>
      <div className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.id} className="p-4 bg-gray-50 rounded-lg">
            {editingId === stat.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={formData.label}
                      onChange={(e) =>
                        setFormData({ ...formData, label: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Value
                    </label>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          value: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Suffix
                    </label>
                    <input
                      type="text"
                      value={formData.suffix}
                      onChange={(e) =>
                        setFormData({ ...formData, suffix: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., +, Bn, K"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g., Users"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(stat.id)}
                    disabled={saving}
                    className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2"
                  >
                    <Save size={14} />
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <TrendingUp className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{stat.label}</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {stat.value}
                      {stat.suffix}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => startEdit(stat)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== CORE VALUES MANAGER ====================
export const CoreValuesManager = ({ coreValues, setCoreValues }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingValue, setEditingValue] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    order: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    else if (formData.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingValue) {
        const response = await coreValuesAPI.update(editingValue.id, formData);
        setCoreValues(
          coreValues.map((v) =>
            v.id === editingValue.id ? response.data.coreValue : v,
          ),
        );
      } else {
        const response = await coreValuesAPI.create(formData);
        setCoreValues([...coreValues, response.data.coreValue]);
      }
      resetForm();
      toast.success('Core value saved!');
    } catch (error) {
      toast.error("Failed to save core value");
    } finally {
      setSaving(false);
    }
  };
  const handleEdit = (value) => {
    setEditingValue(value);
    setErrors({});
    setFormData({
      name: value.name || "",
      description: value.description || "",
      order: value.order || 0,
      isActive: value.isActive,
    });
    setShowForm(true);
  };
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, name: '' });

  const handleDelete = (v) => {
    setConfirmModal({ open: true, id: v.id, name: v.name });
  };

  const handleDeleteConfirm = async () => {
    try {
      await coreValuesAPI.delete(confirmModal.id);
      setCoreValues(coreValues.filter((v) => v.id !== confirmModal.id));
      toast.success('Core value deleted');
    } catch (error) {
      toast.error("Failed to delete core value");
    } finally {
      setConfirmModal({ open: false, id: null, name: '' });
    }
  };
  const resetForm = () => {
    setShowForm(false);
    setEditingValue(null);
    setErrors({});
    setFormData({ name: "", description: "", order: 0, isActive: true });
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {editingValue ? "Edit Core Value" : "Add Core Value"}
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
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.name ? "border-red-400" : "border-gray-300"}`}
              placeholder="e.g. Accountability"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              rows="3"
              placeholder="Optional — briefly describe this value"
            />
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
              {saving ? "Saving..." : "Save"}
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
        title="Delete Core Value"
        message={`Are you sure you want to delete "${confirmModal.name}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmModal({ open: false, id: null, name: '' })}
      />
    <div className="space-y-4">
      <button
        onClick={() => setShowForm(true)}
        className="w-full md:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2 font-semibold"
      >
        <Plus size={20} />
        Add Core Value
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreValues.map((v) => (
          <div
            key={v.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-gray-900">{v.name}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${v.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
              >
                {v.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            {v.description && (
              <p className="text-sm text-gray-600 mb-4">{v.description}</p>
            )}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(v)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(v)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

// ==================== CONTACT INBOX ====================
export const ContactInbox = ({ submissions, setSubmissions }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const markAsRead = async (id) => {
    try {
      await contactSubmissionsAPI.markAsRead(id);
      setSubmissions(
        submissions.map((s) => (s.id === id ? { ...s, isRead: true } : s)),
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null });

  const handleDelete = (id) => {
    setConfirmModal({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    try {
      await contactSubmissionsAPI.delete(confirmModal.id);
      setSubmissions(submissions.filter((s) => s.id !== confirmModal.id));
      setSelectedSubmission(null);
      toast.success('Submission deleted');
    } catch (error) {
      toast.error("Failed to delete submission");
    } finally {
      setConfirmModal({ open: false, id: null });
    }
  };

  if (selectedSubmission) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <button
          onClick={() => setSelectedSubmission(null)}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6 font-medium"
        >
          <ArrowRight className="rotate-180" size={18} />
          Back to Inbox
        </button>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {selectedSubmission.subject}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              From: {selectedSubmission.name} ({selectedSubmission.email})
            </p>
            <p className="text-xs text-gray-500">
              {new Date(selectedSubmission.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-900 whitespace-pre-line">
              {selectedSubmission.message}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {!selectedSubmission.isRead && (
              <button
                onClick={() => markAsRead(selectedSubmission.id)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                Mark as Read
              </button>
            )}
            <button
              onClick={() => handleDelete(selectedSubmission.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
            <ConfirmModal
              isOpen={confirmModal.open}
              title="Delete Submission"
              message="Are you sure you want to delete this message?"
              onConfirm={handleDeleteConfirm}
              onCancel={() => setConfirmModal({ open: false, id: null })}
            />
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = submissions.filter((s) => !s.isRead).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Inbox</h3>
        {unreadCount > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {unreadCount} unread message{unreadCount > 1 ? "s" : ""}
          </p>
        )}
      </div>
      <div className="divide-y divide-gray-200">
        {submissions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No messages yet</div>
        ) : (
          submissions.map((s) => (
            <div
              key={s.id}
              onClick={() => {
                setSelectedSubmission(s);
                if (!s.isRead) markAsRead(s.id);
              }}
              className={`p-6 cursor-pointer transition ${!s.isRead ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {!s.isRead && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                    <p className="font-semibold text-gray-900">{s.name}</p>
                    <span className="text-sm text-gray-600">
                      &lt;{s.email}&gt;
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {s.subject}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {s.message.substring(0, 100)}...
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(s.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ==================== SOCIAL LINKS MANAGER ====================
export const SocialLinksManager = ({ socialLinks, setSocialLinks }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const startEdit = (link) => {
    setEditingId(link.id);
    setFormData({
      platform: link.platform,
      url: link.url,
      isActive: link.isActive,
    });
  };
  const handleSave = async (id) => {
    setSaving(true);
    try {
      const response = await socialLinksAPI.update(id, formData);
      setSocialLinks(
        socialLinks.map((s) => (s.id === id ? response.data.socialLink : s)),
      );
      setEditingId(null);
      toast.success('Social link updated!');
    } catch (error) {
      toast.error("Failed to update social link");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <p className="text-sm text-gray-600 mb-6">
        Manage social media links displayed on the website
      </p>
      <div className="space-y-4">
        {socialLinks.map((link) => (
          <div key={link.id} className="p-4 bg-gray-50 rounded-lg">
            {editingId === link.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Platform
                    </label>
                    <input
                      type="text"
                      value={formData.platform}
                      onChange={(e) =>
                        setFormData({ ...formData, platform: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData({ ...formData, url: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(link.id)}
                    disabled={saving}
                    className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2"
                  >
                    <Save size={14} />
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${link.isActive ? "bg-green-500" : "bg-gray-400"}`}
                  ></div>
                  <p className="font-semibold text-gray-900">{link.platform}</p>
                  <p className="text-sm text-gray-600 truncate max-w-md">
                    {link.url}
                  </p>
                </div>
                <button
                  onClick={() => startEdit(link)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== CONTENT EDITOR ====================
export const ContentEditor = ({ content, setContent }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({ content: item.content });
  };
  const handleSave = async (id) => {
    setSaving(true);
    try {
      const response = await pageContentAPI.update(id, {
        content: formData.content,
      });
      setContent(
        content.map((c) => (c.id === id ? response.data.pageSection : c)),
      );
      setEditingId(null);
      toast.success('Content updated!');
    } catch (error) {
      toast.error("Failed to update content");
    } finally {
      setSaving(false);
    }
  };

  const pageSections = content.reduce((acc, item) => {
    if (!acc[item.page]) acc[item.page] = [];
    acc[item.page].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(pageSections).map(([page, sections]) => (
        <div
          key={page}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            {page} Page Content
          </h3>
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="p-4 bg-gray-50 rounded-lg">
                {editingId === section.id ? (
                  <div className="space-y-4">
                    <ReactQuill
                      value={formData.content?.text || ""}
                      onChange={(text) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...section.content,
                            ...formData.content,
                            text,
                          },
                        })
                      }
                      theme="snow"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave(section.id)}
                        disabled={saving}
                        className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2"
                      >
                        <Save size={14} />
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        {section.sectionKey}
                      </p>
                      <div
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html:
                            section.content?.text ||
                            JSON.stringify(section.content),
                        }}
                      />
                    </div>
                    <button
                      onClick={() => startEdit(section)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition text-blue-600 ml-4"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ==================== SETTINGS PANEL ====================
export const SettingsPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Theme & Appearance
        </h3>
        <p className="text-sm text-gray-600">
          Use the theme controls in the top bar to customize colors
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Account</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">
              {user?.name || "Admin"}
            </p>
            <p className="text-sm text-gray-600">
              {user?.email || "admin@arova.org"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Role: {user?.role || "SUPER_ADMIN"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
