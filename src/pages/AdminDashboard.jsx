import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import {
  postsAPI, teamAPI, testimonialsAPI, statsAPI,
  coreValuesAPI, contactSubmissionsAPI, socialLinksAPI, pageContentAPI,
} from "../api";
import Sidebar, { tabs } from "../components/admin/Sidebar";
import TopBar from "../components/admin/TopBar";
import DashboardOverview from "../components/admin/DashboardOverview";
import PostsManager from "../components/admin/PostsManager";
import ErrorBoundary from "../components/admin/ErrorBoundary";
import {
  SkeletonDashboard, SkeletonTable, SkeletonCards, SkeletonList,
} from "../components/admin/Skeleton";
import {
  TeamManager, TestimonialsManager, StatsManager, CoreValuesManager,
  ContactInbox, SocialLinksManager, ContentEditor, SettingsPanel,
} from "../components/admin/Managers";

const TAB_SKELETON = {
  dashboard:     <SkeletonDashboard />,
  posts:         <div className="space-y-4"><div className="h-10 w-44 animate-pulse bg-gray-200 rounded" /><SkeletonTable rows={6} cols={6} /></div>,
  team:          <div className="space-y-4"><div className="h-10 w-44 animate-pulse bg-gray-200 rounded" /><SkeletonTable rows={5} cols={4} /></div>,
  testimonials:  <SkeletonCards count={3} />,
  stats:         <SkeletonList rows={4} />,
  "core-values": <SkeletonCards count={3} />,
  "contact-inbox": <SkeletonTable rows={6} cols={4} />,
  "social-links":  <SkeletonList rows={4} />,
  content:       <SkeletonList rows={4} />,
  settings:      <SkeletonList rows={2} />,
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);

  const [posts, setPosts] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState([]);
  const [coreValues, setCoreValues] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [pageContent, setPageContent] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        postsRes, teamRes, testimonialsRes, statsRes,
        coreValuesRes, submissionsRes, socialRes, contentRes,
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

  const activeLabel = tabs.find(t => t.id === activeTab)?.label;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar activeLabel={activeLabel} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            TAB_SKELETON[activeTab] || <SkeletonDashboard />
          ) : (
            <ErrorBoundary key={activeTab}>
              {activeTab === "dashboard"     && <DashboardOverview posts={posts} team={team} testimonials={testimonials} stats={stats} setActiveTab={setActiveTab} />}
              {activeTab === "posts"         && <PostsManager posts={posts} setPosts={setPosts} />}
              {activeTab === "team"          && <TeamManager team={team} setTeam={setTeam} />}
              {activeTab === "testimonials"  && <TestimonialsManager testimonials={testimonials} setTestimonials={setTestimonials} />}
              {activeTab === "stats"         && <StatsManager stats={stats} setStats={setStats} />}
              {activeTab === "core-values"   && <CoreValuesManager coreValues={coreValues} setCoreValues={setCoreValues} />}
              {activeTab === "contact-inbox" && <ContactInbox submissions={contactSubmissions} setSubmissions={setContactSubmissions} />}
              {activeTab === "social-links"  && <SocialLinksManager socialLinks={socialLinks} setSocialLinks={setSocialLinks} />}
              {activeTab === "content"       && <ContentEditor content={pageContent} setContent={setPageContent} />}
              {activeTab === "settings"      && <SettingsPanel theme={theme} setTheme={setTheme} />}
            </ErrorBoundary>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
