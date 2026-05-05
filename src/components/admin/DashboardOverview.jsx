import { FileText, Users, Heart, Eye, MessageSquare } from "lucide-react";

export const StatusBadge = ({ status }) => {
  const styles = {
    PUBLISHED: "bg-green-100 text-green-800",
    DRAFT: "bg-yellow-100 text-yellow-800",
    ARCHIVED: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status] || styles.DRAFT}`}>
      {status}
    </span>
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
        <div className={`p-3 rounded-lg ${colors[color]}`}><Icon size={24} /></div>
      </div>
    </div>
  );
};

const DashboardOverview = ({ posts, team, testimonials, setActiveTab }) => {
  const publishedPosts = posts.filter(p => p.status === "PUBLISHED").length;
  const activeTeam = team.filter(t => t.isActive).length;
  const activeTestimonials = testimonials.filter(t => t.isActive).length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Published Posts" value={publishedPosts} icon={FileText} color="emerald" />
        <StatCard label="Active Staff" value={activeTeam} icon={Users} color="blue" />
        <StatCard label="Testimonials" value={activeTestimonials} icon={Heart} color="purple" />
        <StatCard label="Total Views" value={totalViews} icon={Eye} color="amber" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => setActiveTab("posts")} className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition text-left">
            <FileText className="text-emerald-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900">Manage Posts</p>
            <p className="text-sm text-gray-600">{posts.length} total posts</p>
          </button>
          <button onClick={() => setActiveTab("team")} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-left">
            <Users className="text-blue-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900">Manage Team</p>
            <p className="text-sm text-gray-600">{team.length} members</p>
          </button>
          <button onClick={() => setActiveTab("contact-inbox")} className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-left">
            <MessageSquare className="text-purple-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900">View Messages</p>
            <p className="text-sm text-gray-600">Contact submissions</p>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {posts.slice(0, 10).map(post => (
            <div key={post.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              {post.image && <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover" loading="lazy" />}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{post.title}</p>
                <p className="text-sm text-gray-600">{post.category} • {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{post.views || 0} views</p>
                <StatusBadge status={post.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
